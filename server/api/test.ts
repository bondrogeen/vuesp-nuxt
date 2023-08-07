import { defineEventHandler } from 'h3';
import { Server } from 'socket.io';

import { VuespDevices } from '/home/brg/github/vuesp-npm/build/index';

const devices = [
	{ ip: '192.168.10.29', username: 'admin', password: 'admin' },
	{ ip: '192.168.10.19', username: 'admin', password: 'admin' },
];

const vuespDevices = new VuespDevices(devices);
const io = new Server(3002, { cors: { origin: '*' } });

vuespDevices.connection();

io.on('connection', (socket) => {
	console.log('Connection', socket.id);
});

io.on('connect', (socket) => {
	console.log('socket.id: ' + socket.id);
	socket.emit('message', `welcome ${socket.id}`);
	socket.emit('init', true);
	socket.broadcast.emit('message', `${socket.id} joined`);

	socket.on('message', function message(data: any) {
		console.log('message received: %s', data);
		socket.emit('message', { data });
	});

	socket.on('disconnecting', () => {
		console.log('disconnected', socket.id);
		socket.broadcast.emit('message', `${socket.id} left`);
	});
});

vuespDevices.on('*', (payload: any) => io.emit('*', payload));

export default defineEventHandler((event) => {
	const { method, url, headers } = event.req;
	console.log(method, url);
	return { hello: 'world' };
});

import { defineEventHandler } from 'h3';
import { Server } from 'socket.io';

import { VuespDevices } from 'vuesp-npm';

console.log(VuespDevices);

const devices = [
	{
		ip: '192.168.10.19',
		username: 'admin',
		password: 'admin',
	},
	{
		ip: '192.168.10.19',
		username: 'admin',
		password: 'admin',
	},
];

const vuespDevices = new VuespDevices(devices);

const io = new Server(3002, { cors: { origin: '*' } });

io.on('connection', (socket) => {
	console.log('Connection', socket.id);
});

io.on('connect', (socket) => {
	console.log('socket.id: ' + socket.id);

	socket.emit('message', `welcome ${socket.id}`);
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

vuespDevices.connection();
vuespDevices.on('message', (payload: any) => {
	// console.log(payload);
	io.emit('message', payload);
});

export default defineEventHandler((event) => {
	console.log('sdsdsdsd');
	const { method, url, headers } = event.req;
	console.log(method, url);
	return {
		hello: 'world',
	};
});

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { io } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { useWebSocket } from '@/stores/WebSocket';

const storeSocket = useWebSocket();
const { socket } = storeToRefs(storeSocket);

onMounted(() => {
	socket.value = io('http://localhost:3002', { reconnectionDelay: 1000, reconnection: true, transports: ['websocket'] });
	socket.value.on('*', storeSocket.onMessage);
	socket.value.on('init', storeSocket.onConnect);
});

//Socket Client

// const onClick = (e) => {
// 	console.log(e);
// 	s.emit('message', 'new message sent');
// };

// const route = useRoute();

// const mainStore = useMainStore();

// onMounted(() => {});
</script>

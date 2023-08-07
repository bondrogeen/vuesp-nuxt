import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// import { useWebSocketStore } from './WebSocketStore';
// import event from '@/assets/js/event';

export const useWebSocket = defineStore('webSocket', () => {

	const socket = ref(null);
	const isConnect = ref(false);

	const onMessage = (message) => {
		const { data, event, device, id } = message || {};
		if (id && device) {
			if (!devices?.value?.[id]) devices.value[id] = {};
			if (!devices?.value?.[id]?.info) devices.value[id].info = device;
		}
		console.log(data, event, device, id);
	};
	const onConnect = () => {
		isConnect.value = true;
	};
	return {
		socket,
		isConnect,
		onMessage,
		onConnect,
	};
});

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('outside', {
		mounted(el, binding) {
			el.clickOutsideEvent = function (event: any) {
				if (!(el === event.target || el.contains(event.target))) {
					binding.value(event, el);
				}
			};
			document.body.addEventListener('click', el.clickOutsideEvent);
		},
		unmounted(el) {
			document.body.removeEventListener('click', el.clickOutsideEvent);
		},
	});
});

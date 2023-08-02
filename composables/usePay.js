export const usePay = (onCallback) => {
	const onSuccess = () => {
		// console.log('onSuccess');
		// console.log(options);
	};
	const onFail = () => {
		// console.log('onFail');
		// console.log(reason, options);
	};
	const onComplete = (paymentResult) => {
		// console.log('onComplete');
		// console.log(paymentResult, options);
		if (onCallback) onCallback(paymentResult);
	};

	const onPay = (params) => {
		// console.log('onPay');
		const { type, options } = JSON.parse(JSON.stringify(params));
		// console.log(type, options);

		const widget = new cp.CloudPayments();
		widget.pay(type, options, { onSuccess, onFail, onComplete });
	};

	return {
		onSuccess,
		onFail,
		onComplete,
		onPay,
	};
};

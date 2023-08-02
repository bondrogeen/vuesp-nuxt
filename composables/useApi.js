const getHeader = (auth) => {
	const token = auth.strategy.token.get();
	const headers = useRequestHeaders();
	// console.log(headers);

	return {
		cookie: headers.cookie,
		...(token && { 'x-armrus-jwt': token }),
		// origin: ' https://stage.armrus-front.783630.ru',
	};
};

const refresDate = async ({ url, payload = {} }) => {
	// console.log(url);
	const auth = useAuth();
	const { data, error } = await useFetch(`/api${url}`, {
		headers: getHeader(auth),
		credentials: 'include',
		...payload,
	});
	if (error.value && error.value?.status === 401) {
		await auth.refreshTokens();
		const { data, error } = await useFetch(`/api${url}`, {
			headers: getHeader(auth),
			credentials: 'include',
			...payload,
		});
		return { data, error };
	} else {
		return { data, error };
	}
};

export const useApi = {
	get: async (url, payload = {}) => {
		const { data, error } = await refresDate({ url, payload });
		if ([404, 500, 504, 503, 502].includes(error.value?.status)) {
			throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
		}
		return { response: data.value, error: error.value };
	},
	post: async (url, body = {}) => {
		const dialogStore = useDialogStore();
		const { toggleDialog } = dialogStore;
		const { data, error } = await refresDate({ url, payload: { method: 'POST', body } });

		if (error?.value?.status === 503 || error?.value?.status === 404) {
			toggleDialog('message', { title: 'Сервис недоступен', message: 'Попробуйте позже' });
		}

		return { ...data.value, ...error.value?.data };
	},
};

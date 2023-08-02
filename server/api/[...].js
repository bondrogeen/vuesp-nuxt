import { parse, splitCookiesString as split } from 'set-cookie-parser';
import { serialize } from 'cookie';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const baseURL = config?.service?.api;

	if (!baseURL) {
		throw new Error('Missing `runtimeConfig.apiBaseUrl` configuration.');
	}

	const { method, url, headers } = event.req;
	const body = method !== 'GET' && method !== 'HEAD' ? await readBody(event) : undefined;
	const authorization = getRequestHeader(event, 'x-armrus-jwt');

	try {
		const response = await $fetch.raw(url, {
			method,
			baseURL,
			headers: {
				'content-type': 'application/json',
				cookie: headers.cookie,
				...(authorization && { 'x-armrus-jwt': authorization }),
			},
			body,
		});

		for (const header of ['set-cookie', 'cache-control']) {
			if (response.headers.has(header)) {
				const cookies = parse(split(response.headers.get(header)))
					.map((cookie) => (cookie?.name ? serialize(cookie.name, cookie.value, cookie) : null))
					.filter((i) => i);
				if (cookies?.length) {
					appendHeader(event, header, cookies);
				}
			}
		}

		return response._data;
	} catch (error) {
		setResponseStatus(event, error?.statusCode || 500);
		return { ...(error?.data || {}) };
	}
});

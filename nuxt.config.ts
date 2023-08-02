import eslintVitePlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

const api = process.env.NUXT_PROXY_OPTIONS_TARGET || '';

export default defineNuxtConfig({
	imports: { autoImport: false },
	components: [
		{
			path: '~/components/global',
			pathPrefix: false,
		},
	],
	app: {
		head: {
			titleTemplate: '%s',
			title: '',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
				{ hid: 'description', name: 'description', content: '' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{ name: 'theme-color', content: '#ffffff' },
			],
			bodyAttrs: {},
			htmlAttrs: { lang: 'ru' },
			// link: [
			// 	{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			// ],
			script: [],
		},
	},
	ssr: true,
	build: {},
	nitro: {
		compressPublicAssets: true,
	},
	plugins: [],
	modules: [['@pinia/nuxt', { autoImports: ['storeToRefs', 'defineStore'] }], 'nuxt-basic-auth', 'nuxt-delay-hydration'],
	delayHydration: {
		mode: 'mount',
	},
	basicAuth: {
		username: 'admin',
		password: 'admin',
		enabled: false,
	},
	css: ['@/assets/scss/index.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: ` @import "@/assets/scss/variables.scss";`,
				},
			},
		},
		plugins: [eslintVitePlugin({ include: ['./**/*.vue'] }), StylelintPlugin()],
		define: { 'process.env.DEBUG': false },
	},
	routeRules: {
		// '/': { swr: false, cache: { maxAge: 60, swr: false } },
		// '/img/**': { headers: { 'cache-control': 'max-age=31536000' } },
	},
	runtimeConfig: {
		service: {},
		public: {},
	},
});

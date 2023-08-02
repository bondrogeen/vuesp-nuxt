export const usePageInfo = (pageInfo, script = []) => {
	const title = computed(() => pageInfo.value?.title || 'Armrus');
	const description = computed(() => pageInfo.value?.description || '');
	const pageHeader = computed(() => pageInfo.value?.h1 || '');
	const bottomText = computed(() => pageInfo.value?.bottomText || '');
	const opengraph = computed(() => pageInfo.value?.opengraph || {});
	const canonical = computed(() => pageInfo.value?.canonical || '');

	useHead({
		link: canonical.value && [{ rel: 'canonical', href: canonical }],
		title: title.value,
		meta: [
			...(description.value ? [{ hid: 'description', name: 'description', content: description.value }] : []),
			...(opengraph.value?.title
				? [{ hid: 'og:title', property: 'og:title', content: opengraph.value.title }]
				: []),
			...(opengraph.value?.type ? [{ hid: 'og:type', property: 'og:type', content: opengraph.value.type }] : []),
			...(opengraph.value?.locale
				? [{ hid: 'og:locale', property: 'og:locale', content: opengraph.value.locale }]
				: []),
			...(opengraph.value?.description
				? [{ hid: 'og:description', property: 'og:description', content: opengraph.value.description }]
				: []),
			...(opengraph.value?.image
				? [{ hid: 'og:image', property: 'og:image', content: opengraph.value.image }]
				: []),
			...(opengraph.value?.site_name
				? [{ hid: 'og:site_name', property: 'og:site_name', content: opengraph.value.site_name }]
				: []),
		],
		script,
	});

	return {
		pageHeader,
		bottomText,
		title,
		description,
		canonical,
	};
};

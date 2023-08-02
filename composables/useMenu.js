export const useMenu = (props) => {
	const groupMenu = (list) => {
		const arr = [];

		const menu = list.map((i) => ({ ...i }));

		menu.forEach((item) => {
			if (item.is_parent || item.parent === 0) {
				item.children = menu.filter(({ parent }) => parent === item.id);
			}
			arr.push(item);
		});

		return arr.filter((item) => item.parent === 0);
	};

	const listWithChildren = computed(() => {
		return groupMenu(props.list);
	});

	const isSubMenu = (items) => {
		return Boolean(items?.length);
	};

	return {
		listWithChildren,
		isSubMenu,
	};
};

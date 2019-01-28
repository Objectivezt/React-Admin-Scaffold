import {
	createElement
} from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import {
	isUrl
} from 'utils/utils';

let routerDataCache;

const modelNotExisted = (app, model) =>
	!app._models.some(({
		namespace
	}) => {
		return namespace === model.substring(model.lastIndexOf('/') + 1);
	});

const dynamicWrapper = (app, models, component) => {
	if (component.toString().indexOf('.then(') < 0) {
		models.forEach(model => {
			if (modelNotExisted(app, model)) {
				app.model(require(`../models/${model}`).default);
			}
		});
		return props => {
			if (!routerDataCache) {
				routerDataCache = getRouterData(app);
			}
			return createElement(component().default, {
				...props,
				routerData: routerDataCache
			});
		};
	}

	return dynamic({
		app,
		models: () =>
			models
			.filter(model => modelNotExisted(app, model))
			.map(m => import(`../models/${m}.js`)),
		component: () => {
			if (!routerDataCache) {
				routerDataCache = getRouterData(app);
			}
			return component().then(raw => {
				const Component = raw.default || raw;
				return props =>
					createElement(Component, {
						...props,
						routerData: routerDataCache
					});
			});
		}
	});
};

export const getRouterData = app => {
	const routerConfig = {
		'/': {
			component: dynamicWrapper(app, [], () =>
				import('layouts/BlankLayout')
			)
		},
		'/user': {
			component: dynamicWrapper(
				app,
				['basic/globalModel', 'user/userModel'],
				() => import('layouts/UserLayout')
			)
		},
		'/tourist': {
			component: dynamicWrapper(app, [], () =>
				import('layouts/TouristLayout')
			)
		},
		'/tourist/': {
			component: dynamicWrapper(app, [], () =>
				import('containers/News/NewsCenter')
			)
		},
		'/auth': {
			component: dynamicWrapper(
				app,
				['basic/globalModel', 'user/userModel'],
				() => import('layouts/AuthLayout/index')
			),
			name: '管理中心'
		},
		'/auth/app': {
			component: dynamicWrapper(app, [], () => import('containers/Home')),
			name: '系统主页'
		},
		'/auth/systems/curd': {
			component: dynamicWrapper(app, ['systems/curdModel'], () =>
				import('containers/Systems/Curd')
			),
			name: 'CURD'
		},
		'/auth/exception/403': {
			component: dynamicWrapper(app, [], () =>
				import('containers/Exception/403')
			),
			name: '403'
		},
		'/auth/exception/404': {
			component: dynamicWrapper(app, [], () =>
				import('containers/Exception/404')
			),
			name: '404'
		},
		'/auth/exception/500': {
			component: dynamicWrapper(app, [], () =>
				import('containers/Exception/500')
			),
			name: '500'
		}
	};

	const getFlatMenuData = function (menus) {
		let keys = {};
		menus.forEach(item => {
			if (item.children) {
				keys[item.path] = { ...item
				};
				keys = { ...keys,
					...getFlatMenuData(item.children)
				};
			} else {
				keys[item.path] = { ...item
				};
			}
		});
		return keys;
	};

	const formatter = (data, parentPath = '/') =>
		data.map(item => {
			let {
				path
			} = item;
			if (!isUrl(path)) {
				path = parentPath + item.path;
			}
			const result = {
				...item,
				path
			};
			if (item.children) {
				result.children = this.formatter(
					item.children,
					`${parentPath}${item.path}/`
				);
			}
			return result;
		});

	const menuDataOldCache = [];
	const getMenuData = data => formatter(data);
	const menuData = getFlatMenuData(getMenuData(menuDataOldCache));
	const routerData = {};
	Object.keys(routerConfig).forEach(path => {
		const pathRegexp = pathToRegexp(path);
		const menuKey = Object.keys(menuData).find(key =>
			pathRegexp.test(`${key}`)
		);
		let menuItem = {};
		if (menuKey) {
			menuItem = menuData[menuKey];
		}
		let router = routerConfig[path];
		router = {
			...router,
			name: router.name || menuItem.name
		};
		routerData[path] = router;
	});
	return routerData;
};

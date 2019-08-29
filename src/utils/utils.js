import { isInArray } from 'scaffold-core/dist/utils';
export {
	getApiMethod,
	uniqId,
	formatNumDec,
	formatNum,
	numFixed,
	getter,
	divideNumber,
	formatStringByType,
	export2csv,
	fixedZero,
	getTimeDistance,
	digitUppercase,
	getRoutes,
	isUrl,
	formatterMenu,
	isInArray,
	thousandsFormatter,
	parserSemicolon,
	calcLength,
	patternSpString
} from 'scaffold-core/dist/utils';

// 异步加载js,css 文件
export function loadFile(fileUrl) {
	let url = fileUrl;
	if (fileUrl.indexOf('http') === -1) {
		url = `${window.location.origin}/public/${url}`;
	}

	return new Promise((resolve, reject) => {
		try {
			let file;
			let $node;
			if (url.indexOf('.js') > -1) {
				file = document.createElement('script');
				$node = document.getElementsByTagName('script');
				file.type = 'text/javascript';
				file.async = true;
				file.src = url;
			} else if (url.indexOf('.css') > -1) {
				file = document.createElement('link');
				$node = document.getElementsByTagName('link');
				file.rel = 'stylesheet';
				file.type = 'text/css';
				file.href = url;
			}

			$node = $node[$node.length - 1] || $node[0];

			if (!file || !$node) {
				reject(new Error('no files'));
				return;
			}

			file.onload = () => {
				resolve();
			};

			$node.parentNode.insertBefore(file, $node);
		} catch (err) {
			reject(err);
		}
	});
}

export function loadFiles(urls) {
	return Promise.all(urls.map(url => loadFile(url)));
}

export function getPlainNode(nodeList, parentPath = '') {
	const arr = [];
	nodeList.forEach(node => {
		const item = node;
		item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
		item.exact = true;
		if (item.children && !item.component) {
			arr.push(...getPlainNode(item.children, item.path));
		} else {
			if (item.children && item.component) {
				item.exact = false;
			}
			arr.push(item);
		}
	});
	return arr;
}

export function getBashRedirect() {
	const urlParams = new URL(window.location.href);
	const redirect = urlParams.searchParams.get('redirect');
	if (redirect) {
		urlParams.searchParams.delete('redirect');
		window.history.replaceState(null, 'redirect', urlParams.href);
	}
	return redirect;
}

/**
 * @description 白名单屏蔽方法
 * @param {Object} _this 当前页面对象
 * @param {String} path 当前URL
 */
export function AuthRouterPass(_this, path) {
	const { location, history, globalModel = {} } = _this.props;
	let tempMenuArr = globalModel.baseRouterUrl;
	if (path) {
		if (!isInArray(tempMenuArr, path)) {
			history.push('/auth/exception/403');
			return false;
		}
	} else {
		if (!isInArray(tempMenuArr, location.pathname)) {
			if (history.location.pathname === '/auth/exception/403') {
				return;
			}
			history.push('/auth/exception/403');
			return false;
		}
	}
}

/**
 * @description
 * @param {*} e
 * @param {*} _this
 */
export function routerGoBack(e, _this) {
	if (e) {
		e.preventDefault();
	}
	_this.props.history.goBack();
}

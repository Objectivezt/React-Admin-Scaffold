import moment from 'moment';
import { stringify } from 'qs';
import { template, get, isArray, pick, isNaN, isFinite, trim } from 'lodash';
import { Modal } from 'antd';

export function getApiMethod(api = '', options = {}) {
	if (options.method) {
		return options.method;
	}
	return get(trim(api).match(/^.* /), 0) || 'GET';
}

/**
 * 根据数据，参数获取正确的请求地址url
 * @param {String} api API地址
 * @param {Object} params 数据
 * @param {Object} options 各种参数
 */
export function getUrl(api, params = {}, options = {}) {
	if (!api) return;
	const { method = 'get', module = 'api', json = false } = options;

	let url = '';

	if (api.indexOf('http') !== 0) {
		const host = config.isMock ? '/mock' : config.domain[module];
		url = `${host}/${api}${json ? '.json' : ''}`;
	}

	if (api.indexOf('<%=') > -1) {
		url = template(api)(params);
	}

	// console.info('method->', method);

	if (String(method).toUpperCase() === 'GET') {
		url += `?${stringify(params)}`;
	}

	return url;
}

export function unqid(len = 6, radix = 60) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
		''
	);
	const uuid = [];
	let i;

	if (len) {
		for (i = 0; i < len; i++) {
			// eslint-disable-line
			uuid[i] = chars[0 | (Math.random() * radix)];
		}
	} else {
		let r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; // eslint-disable-line
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			// eslint-disable-line
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16);
				uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}

export function formatNumDec(number, length = 3, fix = 2) {
	return formatNum(numFixed(number, fix), length);
}

export function formatNum(num, length = 3, formater = ',') {
	let number = num;
	number = String(number || 0);
	const numArr = number.split('.') || ['', ''];

	const strAry = numArr[0].toString().split('');

	for (let i = strAry.length - 1; i >= 0; i -= length) {
		if (i !== strAry.length - 1 && i >= 0) {
			strAry.splice(i + 1, 0, formater);
		}
	}

	return strAry.join('') + (numArr[1] ? `.${numArr[1]}` : '');
}

export function numFixed(number, fix = 2) {
	if (isNaN(Number(number)) || !isFinite(Number(number))) {
		return 0;
	}
	return Number(number).toFixed(fix);
}

export function getter(srouce, filed) {
	let reslut = srouce;
	if (isArray(filed)) {
		reslut = pick(srouce, filed);
	} else if (typeof filed === 'string') {
		reslut = get(srouce, filed);
	}
	return reslut;
}

export function dvideNumber(source) {
	const result =
		String(source).indexOf('.') !== -1
			? source.toLocaleString()
			: source.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	return result;
}

export function formatStringByType(type, source, opts = {}) {
	let result;
	switch (type) {
		case 'Number.Int':
			result = parseInt(source, 10);
			break;
		case 'Number.Float':
			result = parseFloat(source).toFixed(opts.fixed || 2);
			break;
		case 'Number.Dvide':
			result = dvideNumber(source);
			break;
		case 'Number.Percent': // 百分比
			result = String(source).indexOf('%')
				? source
				: `${parseFloat(source) * 100}%`;
			break;
		case 'Date': // HH:mm
			result = moment(source).format(
				opts.format || 'YYYY-MM-DD HH:mm:ss'
			);
			break;
		case 'Date.Date': // YYYY-MM-DD
			result = moment(source).format('YYYY-MM-DD');
			break;
		case 'Date.Month': // YYYY-MM
			result = moment(source).format('YYYY-MM');
			break;
		case 'Date.Time': // HH:mm
			result = moment(source).format('HH:mm');
			break;
		default:
			result = source;
	}

	return String(result);
}

// 异步加载js,css 文件
export function loadFile(fileUrl) {
	let url = fileUrl;
	if (fileUrl.indexOf('http') === -1) {
		url = `${location.origin}/public/${url}`;
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

// 表格导出csv
export function export2csv(table) {
	let data = '\ufeff';
	for (let i = 0, row; (row = table.rows[i]); i++) {
		// eslint-disable-line
		for (let j = 0, col; (col = row.cells[j]); j++) {
			// eslint-disable-line
			data = `data${j ? ',' : ''} \t"${col.replace(/"/g, '""')}"`;
		}
		data = `${data}\r\n`;
	}
	return data;
}

export function fixedZero(val) {
	return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
	const now = new Date();
	const oneDay = 1000 * 60 * 60 * 24;

	if (type === 'today') {
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		return [moment(now), moment(now.getTime() + (oneDay - 1000))];
	}

	if (type === 'week') {
		let day = now.getDay();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);

		if (day === 0) {
			day = 6;
		} else {
			day -= 1;
		}

		const beginTime = now.getTime() - day * oneDay;

		return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
	}

	if (type === 'month') {
		const year = now.getFullYear();
		const month = now.getMonth();
		const nextDate = moment(now).add(1, 'months');
		const nextYear = nextDate.year();
		const nextMonth = nextDate.month();

		return [
			moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
			moment(
				moment(
					`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
				).valueOf() - 1000
			)
		];
	}

	if (type === 'year') {
		const year = now.getFullYear();

		return [
			moment(`${year}-01-01 00:00:00`),
			moment(`${year}-12-31 23:59:59`)
		];
	}
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

export function digitUppercase(n) {
	const fraction = ['角', '分'];
	const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
	let num = Math.abs(n);
	let s = '';
	fraction.forEach((item, index) => {
		s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
			/零./,
			''
		);
	});
	s = s || '整';
	num = Math.floor(num);
	for (let i = 0; i < unit[0].length && num > 0; i += 1) {
		let p = '';
		for (let j = 0; j < unit[1].length && num > 0; j += 1) {
			p = digit[num % 10] + unit[1][j] + p;
			num = Math.floor(num / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}

	return s
		.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
	if (str1 === str2) {
		console.warn('Two path are equal!'); // eslint-disable-line
	}
	const arr1 = str1.split('/');
	const arr2 = str2.split('/');
	if (arr2.every((item, index) => item === arr1[index])) {
		return 1;
	} else if (arr1.every((item, index) => item === arr2[index])) {
		return 2;
	}
	return 3;
}

function getRenderArr(routes) {
	let renderArr = [];
	renderArr.push(routes[0]);
	for (let i = 1; i < routes.length; i += 1) {
		let isAdd = false;
		// 是否包含
		isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
		// 去重
		renderArr = renderArr.filter(
			item => getRelation(item, routes[i]) !== 1
		);
		if (isAdd) {
			renderArr.push(routes[i]);
		}
	}
	return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
	let routes = Object.keys(routerData).filter(
		routePath => routePath.indexOf(path) === 0 && routePath !== path
	);
	// Replace path to '' eg. path='user' /user/name => name
	routes = routes.map(item => item.replace(path, ''));
	// Get the route to be rendered to remove the deep rendering
	const renderArr = getRenderArr(routes);
	// Conversion and stitching parameters
	const renderRoutes = renderArr.map(item => {
		const exact = !routes.some(
			route => route !== item && getRelation(route, item) === 1
		);
		return {
			exact,
			...routerData[`${path}${item}`],
			key: `${path}${item}`,
			path: `${path}${item}`
		};
	});
	return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
	return reg.test(path);
}

export function formatterMenu(data, parentPath = '/') {
	return data.map(item => {
		let { path } = item;
		if (!isUrl(path)) {
			path = parentPath + item.path;
		}
		const result = {
			...item,
			path
		};
		if (item.children) {
			result.children = formatterMenu(
				item.children,
				`${parentPath}${item.path}/`
			);
		}
		return result;
	});
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

export function showLogoutConfirm() {
	Modal.info({
		title: '未能检测到用户登录状态',
		content: '您可能需要重新登录'
	});
}

export function isInArray(array, value) {
	for (let i = 0; i < array.length; i++) {
		if (value === array[i]) {
			return true;
		}
	}
	return false;
}

export function AuthRouterPass(_this, path) {
	const { location, history, globalModel = {} } = _this.props;
	let tempMenuArr = globalModel.baseRouterUrl;
	if (path) {
		if (!isInArray(tempMenuArr, path)) {
			history.push('/auth/exception/403');
			return;
		}
	} else {
		if (!isInArray(tempMenuArr, location.pathname)) {
			if (history.location.pathname === '/auth/exception/403') {
				return;
			}
			history.push('/auth/exception/403');
			return;
		}
	}
}

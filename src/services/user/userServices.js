import request from 'utils/request';

export function queryMenus() {
	return request('/user/queryCurrentMenus');
}

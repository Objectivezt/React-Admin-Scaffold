import request from 'utils/request';

export function queryTaskList() {
	return request('/project/queryTaskList');
}

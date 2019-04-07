import request from '@utils/request';

export function queryCurdList(params) {
	return request('systems/queryCurdList', {
		method: 'POST',
		param: params
	});
}

export function queryCurdColumns() {
	return request('systems/queryCurdColumns');
}

import request from '@utils/request';

export function login(params) {
	return request('login/gologin', {
		method: 'POST',
		body: params
	});
}

export function queryPublicKey() {
	return request('login/getPublicKey');
}

export function queryCaptchaImage() {
	return request('login/changeImage');
}

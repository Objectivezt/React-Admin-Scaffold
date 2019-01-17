import request from "utils/request";

export function queryTaskList(param) {
	return request("/project/queryTaskList", {
		method: "POST",
		param: param
	});
}

export function queryTaskColumns() {
	return request("/project/queryTaskColumns");
}

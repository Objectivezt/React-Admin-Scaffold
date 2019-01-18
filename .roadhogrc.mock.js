import { delay } from 'roadhog-api-doc';
import { queryTaskColumns, queryTaskList } from './mock/project';
import { queryCurdColumns, queryCurdList } from './mock/systems';
import {
	queryCurrentMenus,
	queryCurrentUser,
	login,
	queryUserList
} from './mock/user';

const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
	'GET /user/queryCurrentMenus': queryCurrentMenus,

	'GET /user/queryCurrentUser': queryCurrentUser,

	'GET /user/queryUserList': queryUserList,

	'POST /user/login': login,

	'POST /project/queryTaskList': queryTaskList,

	'GET /project/queryTaskColumns': queryTaskColumns,

	'POST /systems/queryCurdList': queryCurdList,

	'GET /systems/queryCurdColumns': queryCurdColumns
};

export default (noProxy ? {} : delay(proxy, 1000));

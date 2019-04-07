import { delay } from 'roadhog-api-doc';
import { queryCurdColumns, queryCurdList } from './mock/systems';
import {
	queryCurrentMenus,
	queryCurrentUser,
	login,
	queryUserList
} from './mock/user';

const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
	'GET /api/user/queryCurrentMenus': queryCurrentMenus,

	'GET /api/user/queryCurrentUser': queryCurrentUser,

	'GET /api/user/queryUserList': queryUserList,

	'POST /api/user/login': login,

	'POST /api/systems/queryCurdList': queryCurdList,

	'GET /api/systems/queryCurdColumns': queryCurdColumns
};

export default (noProxy ? {} : delay(proxy, 1000));

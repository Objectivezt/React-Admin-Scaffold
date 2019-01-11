import { delay } from 'roadhog-api-doc';
import queryCurrentMenus from './mock/user/queryCurrentMenus';
import queryCurrentUser from './mock/user/queryCurrentUser';
import login from './mock/user/login';
import queryTaskList from './mock/project/queryTaskList'
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
	'GET /user/queryCurrentMenus': queryCurrentMenus,

	'GET /user/queryCurrentUser': queryCurrentUser,

	'POST /user/login': login,

	'POST /project/queryTaskList': queryTaskList,
}

export default noProxy ? {} : delay(proxy, 1000);

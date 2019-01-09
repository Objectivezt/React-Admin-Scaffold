import { delay } from 'roadhog-api-doc';
import queryCurrentMenus from './mock/user/queryCurrentMenus';
import queryCurrentUser from './mock/user/queryCurrentUser';
import login from './mock/user/login';
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
	'GET /user/queryCurrentMenus': queryCurrentMenus,

	'GET /user/queryCurrentUser': queryCurrentUser,

	'POST /user/login': login,
}

export default noProxy ? {} : delay(proxy, 1000);

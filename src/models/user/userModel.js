import { queryMenus } from 'services/user/userServices';
import { message } from 'antd';
import { tuple } from 'antd/lib/_util/type';
export default {
	namespace: 'userModel',
	state: {
		menuData: [],
		loadingLayoutMenu: true,
	},
	effects: {
		*getMenuData(_, { call, put }) {
			const res = yield call(queryMenus);
			if (res) {
				const { data, code, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'saveMenuData',
						payloadMenuData: {
							menuData: data ? data : [],
							loadingLayoutMenu: data ? false : true,
						}
					})
				} else {
					message.info(msg)
				}
			}
		}
	},
	reducers: {
		saveMenuData(state, { payloadMenuData }) {
			return {
				...state,
				menuData: payloadMenuData.menuData,
				loadingLayoutMenu: payloadMenuData.loadingLayoutMenu,
			}
		}
	}
}

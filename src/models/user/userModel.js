import { queryMenus, queryCurrentUser } from "services/user/userServices";
import { message } from "antd";
export default {
	namespace: "userModel",
	state: {
		menuData: [],
		loadingLayoutMenu: true,
		username: "",
		userId: ""
	},
	effects: {
		*getMenuData(_, { call, put }) {
			const res = yield call(queryMenus);
			if (res) {
				const { data, code, msg } = res;
				if (code === "0000") {
					yield put({
						type: "saveMenuData",
						payloadMenuData: {
							menuData: data ? data : [],
							loadingLayoutMenu: data ? false : true
						}
					});
				} else {
					message.info(msg);
				}
			}
		},
		*getCurrentUser(_, { call, put }) {
			const res = yield call(queryCurrentUser);
			if (res) {
				const { data, code, msg } = res;
				if (code === "0000") {
					yield put({
						type: "saveCurrentUser",
						payloadCurrentUser: {
							username: data.username,
							userId: data.userId
						}
					});
				} else {
					message.info(msg);
				}
			}
		}
	},
	reducers: {
		saveMenuData(state, { payloadMenuData }) {
			return {
				...state,
				menuData: payloadMenuData.menuData,
				loadingLayoutMenu: payloadMenuData.loadingLayoutMenu
			};
		}
	}
};

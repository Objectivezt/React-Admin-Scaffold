import {
	queryMenus,
	queryCurrentUser,
	queryUserList
} from '@services/user/userServices';
import { localMenuData, localMenuDataArr } from '@common/config';
import { message } from 'antd';
export default {
	namespace: 'userModel',
	state: {
		menuData: [],
		loadingLayoutMenu: true,
		username: '',
		userId: '',
		userList: []
	},
	effects: {
		*getMenuData(_, { call, put }) {
			if (localMenuData) {
				yield put({
					type: 'saveMenuData',
					payloadMenuData: {
						menuData: localMenuDataArr,
						loadingLayoutMenu: false
					}
				});
			} else {
				const res = yield call(queryMenus);
				if (res) {
					const { data, code, msg } = res;
					let tempLoadingLayoutMenu = true;
					if (data) {
						tempLoadingLayoutMenu = false;
					}
					if (code === '0000') {
						yield put({
							type: 'saveMenuData',
							payloadMenuData: {
								menuData: data || [],
								loadingLayoutMenu: tempLoadingLayoutMenu
							}
						});
					} else {
						message.info(msg);
					}
				}
			}
		},

		*getCurrentUser(_, { call, put }) {
			const res = yield call(queryCurrentUser);
			if (res) {
				const { data, code, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'saveCurrentUser',
						payloadCurrentUser: {
							username: data.username,
							userId: data.userId
						}
					});
				} else {
					message.info(msg);
				}
			}
		},
		*getUserList(_, { call, put }) {
			const res = yield call(queryUserList);
			if (res) {
				const { data, code, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'saveUserList',
						payloadUserList: {
							userList: data.list,
							userListTotal: data.total
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
		},
		saveCurrentUser(state, { payloadCurrentUser }) {
			return {
				...state,
				username: payloadCurrentUser.username,
				userId: payloadCurrentUser.userId
			};
		},
		saveUserList(state, { payloadUserList }) {
			return { ...state, userList: payloadUserList.userList };
		}
	}
};

import { queryCurdList, queryCurdColumns } from 'services/systems/curdService';
import { message } from 'antd';
export default {
	namespace: 'curdModel',
	state: {
		resList: [],
		resTotal: 0,
		columns: []
	},
	effects: {
		*getMainList({ payloadMain }, { call, put }) {
			const res = yield call(queryCurdList, payloadMain);
			if (res) {
				const { code, data, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'save',
						payloadMain: {
							resList: data.list,
							resTotal: data.total
						}
					});
				} else {
					message.error(msg);
				}
			}
		},
		*getMainColumns(_, { call, put }) {
			const res = yield call(queryCurdColumns);
			if (res) {
				const { code, data, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'save',
						payloadColumns: {
							columns: data.list
						}
					});
				} else {
					message.error(msg);
				}
			}
		}
	},
	reducers: {
		save(state, { payloadMain, payloadColumns }) {
			return { ...state, ...payloadMain, ...payloadColumns };
		}
	}
};

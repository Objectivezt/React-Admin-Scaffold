import { queryTaskList, queryTaskColumns } from "services/project/taskServices";
import { message } from "antd";
export default {
	namespace: "taskModel",
	state: {
		resList: [],
		resTotal: 0,
		columns: []
	},
	effects: {
		*getTaskList({ payloadMain }, { call, put }) {
			const res = yield call(queryTaskList, payloadMain);
			if (res) {
				const { code, data, msg } = res;
				if (code === "0000") {
					yield put({
						type: "save",
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
		*getTaskColumns(_, { call, put }) {
			const res = yield call(queryTaskColumns);
			if (res) {
				const { code, data, msg } = res;
				if (code === "0000") {
					yield put({
						type: "save",
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

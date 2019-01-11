// import { TaskList } from 'services/project/'
import { message } from 'antd';
export default {
	namespace: 'taskModel',
	state: {
		resList: [],
		resTotal: 0,
		loading: false,
	},
	effects: {
		*filter({ payloadMain }, { call, put }) {
			const res = yield call(queryTaskList, payloadMain)
			if (res) {
				const { code, data, msg } = res;
				if (code === '0000') {
					yield put({
						type: 'save',
						payloadMain: {
							resList: data.list,
							resTotal: data.total,
						}
					})
				} else {
					message.error(msg)
				}
			}
		}
	},
	reducers: {
		save(state, { payloadMain }) {
			return {
				...state,
				...payloadMain,
			}
		}
	}
}

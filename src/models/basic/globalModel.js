export default {
	namespace: 'globalModel',
	state: {

	},
	effects: {

	},
	reducers: {
		changeLayoutCollapsed(state, {
			payload
		}) {
			return {
				...state,
				collapsed: payload,
			}
		}
	}
}

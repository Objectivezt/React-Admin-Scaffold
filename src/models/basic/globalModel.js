export default {
	namespace: 'globalModel',
	state: {
		collapsed: false,
		spa: true,
	},
	effects: {

	},
	reducers: {
		changeLayoutCollapsed(state, { payload }) {
			return {
				...state,
				collapsed: payload,
			}
		},
		changeSpaLayout(state, { payloadSpa }) {
			return {
				...state,
				spa: payloadSpa,
			}
		},
	}
}

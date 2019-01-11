export default {
	namespace: 'globalModel',
	state: {
		collapsed: false,
		isMultiPage: true,
	},
	effects: {

	},
	reducers: {
		changeLayoutCollapsed(state, { payloadCollapsed }) {
			return {
				...state,
				collapsed: payloadCollapsed,
			}
		},
		changeMultiPage(state, { payloadMultiPage }) {
			return {
				...state,
				isMultiPage: payloadMultiPage,
			}
		},
	}
}

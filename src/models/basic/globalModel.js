import { baseRouterUrl } from "common/config";
export default {
	namespace: "globalModel",
	state: {
		collapsed: false,
		isMultiPage: true,
		baseRouterUrl: baseRouterUrl
	},
	effects: {},
	reducers: {
		changeLayoutCollapsed(state, { payloadCollapsed }) {
			return {
				...state,
				collapsed: payloadCollapsed
			};
		},
		changeMultiPage(state, { payloadMultiPage }) {
			return {
				...state,
				isMultiPage: payloadMultiPage
			};
		},
		pushRouterUrl(state, { payloadRouterUrl }) {
			return {
				...state,
				baseRouterUrl: payloadRouterUrl
			};
		}
	}
};

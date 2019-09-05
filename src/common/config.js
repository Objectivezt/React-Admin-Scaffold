const isLocalMenu = process.env.NODE_ENV === 'development';

const ENV_API_CONTEXT = process.env.ENV_API_CONTEXT;

// // 默认组件属性
export {
	globalDateFormat,
	globalRequire,
	globalBigListSize,
	globalDefineListSize,
	globalCardProps,
	globalPaginationProps,
	globalColProps,
	globalSelectProps,
	globalTableProps,
	globalInputNumberProps,
	globalModalProps,
	globalRangePickerProps,
	globalFormItemLayout,
	globalFormItemBox
} from 'scaffold-core/dist/antdConfig';

// 系统配置属性
export const projectName = 'Scaffold';

export const localMenuData = isLocalMenu;

export { default as localMenuDataArr } from './localMenu';

export { default as localButtonArr } from './localButton';

export const baseUrl = ENV_API_CONTEXT ? '/' + ENV_API_CONTEXT : '/';

export { default as baseRouterUrl } from './baseRouterUrl';

export const fileType = ''; // 文件处理

export const fileMaxSize = '';

export const queryLayout = {
	'screen-xs': {
		maxWidth: 575
	},
	'screen-sm': {
		minWidth: 576,
		maxWidth: 767
	},
	'screen-md': {
		minWidth: 768,
		maxWidth: 991
	},
	'screen-lg': {
		minWidth: 992,
		maxWidth: 1199
	},
	'screen-xl': {
		minWidth: 1200
	}
};

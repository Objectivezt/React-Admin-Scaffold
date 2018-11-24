// 默认组件属性
export { default as globalCardProps } from './props/Card.config';

export { default as globalPaginationProps } from './props/Pagination.config';

export { default as globalColProps } from './props/Col.config';

export { default as globalRowProps } from './props/Row.config';

export { default as globalSelectProps } from './props/Select.config';

export { default as globalTableProps } from './props/Table.config';

export { default as globalInputNumberProps } from './props/InputNumber.config';

export { default as globalModalProps } from './props/Modal.config';

export { default as globalRangePickerProps } from 'RangePicker.config';

export const globalFormItemLayout = {
    labelCol: { sm: { span: 8 } },
    warpperCol: { sm: { span: 16 } },
};

export const globalRequire = {
    colon: true,
    required: true,
};


// 系统配置属性
export const projectName = 'Scaffold';

export const baseUrl = '/';

export const globalDefineListSize = {
    pageNum: 1,
    pageSize: 10,
};

export const globalBigListSize = {
    pageNum: 1,
    pageSize: 200,
};

export const globalDateFormat = 'YYYY-MM-DD';

export const baseRouterUrl = [
    '/',
];

export const fileType = '';// 文件处理

export const fileMaxSize = '';

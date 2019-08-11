import { Fragment } from 'react';
import {
	Tooltip,
	Modal,
	message,
	Select,
	Divider,
	Col,
	Form,
	Ellipsis
} from 'antd';
import { globalColProps, globalFormItemLayout } from '@common/config';

const { Option } = Select;
const FormItem = Form.Item;

/**
 * @description 表单问号提示
 * @param {String} text
 */
export function questionTooltip(text) {
	return (
		<Fragment>
			&nbsp; &nbsp;
			<Tooltip placement="right" title={text}>
				<Icon type="question-circle-o" style={{ color: 'red' }} />
			</Tooltip>
		</Fragment>
	);
}

/**
 * @description 静态模态窗口
 * @param {String} title
 * @param {String} text
 */
export function staticModal(title, text) {
	Modal.info({
		title: title,
		content: text
	});
}

/**
 * @description 静态详情
 * @param {String} msg
 */
export function staticMessage(msg) {
	message.info(msg, 5000);
}

/**
 * @description 构造下拉列表值
 * @param {String} value
 * @param {String} name
 */
export function CreateOption(value, name) {
	return (
		<Option value={value} title={name} key={value}>
			{name}
		</Option>
	);
}

/**
 * @description 构造分割线
 * @param {String} text
 */
export function CreateDivider(text) {
	return (
		<Divider
			orientation={'left'}
			style={{
				fontSize: '16px',
				fontWeight: 700,
				marginBottom: '40px'
			}}
		>
			{text}
		</Divider>
	);
}

/**
 * @description 构造表单项目
 * @param {String} value
 * @param {String} name
 */
export function CreateFormItem(value, name) {
	return (
		<Col {...globalColProps} key={value}>
			<FormItem label={value} {...globalFormItemLayout}>
				{name}
			</FormItem>
		</Col>
	);
}

/**
 * @description 构造动态表单项目
 * @param {String} value
 * @param {String} name
 */
export function CreateDynamicFormItem(value, name) {
	return (
		<Col {...globalColProps} key={value}>
			<FormItem
				label={
					<div
						style={{
							height: '0px',
							position: 'absolute',
							right: '15px'
						}}
					>
						<Ellipsis tooltip length={8}>
							{name}
						</Ellipsis>
					</div>
				}
				{...globalFormItemLayout}
			>
				{name}
			</FormItem>
		</Col>
	);
}

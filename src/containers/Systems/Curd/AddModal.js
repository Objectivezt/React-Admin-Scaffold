import React, { Component, Fragment } from 'react';
import { Form, Col, Row, Input, DatePicker } from 'antd';
import { connect } from 'dva';
import { globalFormItemLayout, globalFormItemBox } from '@common/config';

const FormItem = Form.Item;

@Form.create()
@connect(({ userModel }) => ({
	userModel
}))
export default class AddModal extends Component {
	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Fragment>
				<Form>
					<Row>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'创建人'}
							>
								{getFieldDecorator('createBy', {
									rules: [
										{
											required: true,
											message: '请输入'
										}
									]
								})(<Input {...globalFormItemBox} />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'更新人'}
							>
								{getFieldDecorator('updateBy', {
									rules: [
										{
											required: true,
											message: '请输入'
										}
									]
								})(<Input {...globalFormItemBox} />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem {...globalFormItemLayout} label={'名称'}>
								{getFieldDecorator('name', {
									rules: [
										{
											required: true,
											message: '请输入'
										}
									]
								})(<Input {...globalFormItemBox} />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'创建时间'}
							>
								{getFieldDecorator('createTime', {
									rules: [
										{
											required: true,
											message: '请输入'
										}
									]
								})(<DatePicker {...globalFormItemBox} />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'更新时间'}
							>
								{getFieldDecorator('updateTime', {
									rules: [
										{
											required: true,
											message: '请输入'
										}
									]
								})(<DatePicker {...globalFormItemBox} />)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Fragment>
		);
	}
}

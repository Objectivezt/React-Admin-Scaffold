import React, { Component, Fragment } from 'react';
import { Form, Col, Row } from 'antd';
import { connect } from 'dva';
import { globalFormItemLayout } from '@common/config';

const FormItem = Form.Item;

@Form.create()
@connect(({ userModel }) => ({
	userModel
}))
export default class InfoModal extends Component {
	render() {
		const {
			id,
			createBy,
			updateBy,
			name,
			createTime,
			updateTime
		} = this.props.details;
		return (
			<Fragment>
				<Form>
					<Row>
						<Col>
							<FormItem {...globalFormItemLayout} label={'编号'}>
								{id}
							</FormItem>
							<FormItem
								{...globalFormItemLayout}
								label={'创建人'}
							>
								{createBy}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'更新人'}
							>
								{updateBy}
							</FormItem>
						</Col>
						<Col>
							<FormItem {...globalFormItemLayout} label={'名称'}>
								{name}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'创建时间'}
							>
								{createTime}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={'更新时间'}
							>
								{updateTime}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Fragment>
		);
	}
}

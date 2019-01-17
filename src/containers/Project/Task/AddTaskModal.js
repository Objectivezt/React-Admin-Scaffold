import React, { Component, Fragment } from "react";
import { Form, Col, Row, Select, Input, Upload, Icon } from "antd";
import { connect } from "dva";
import { globalFormItemLayout } from "common/config";
import UserListSelect from "containers/Common/UserListSelect";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Dragger } = Upload;

@Form.create()
@connect(({ userModel }) => ({
	userModel
}))
export default class AddTaskModel extends Component {
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
								label={"创建人"}
							>
								{getFieldDecorator("create", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<Input />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"任务名称"}
							>
								{getFieldDecorator("taskName", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<Input />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"任务名称"}
							>
								{getFieldDecorator("taskName", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<Input />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"起止时间"}
							>
								{getFieldDecorator("mainPerson", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<UserListSelect />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"协办人"}
							>
								{getFieldDecorator("helpPerson", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<UserListSelect />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"优先级"}
							>
								{getFieldDecorator("priority", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(
									<Select>
										<Option key="1">高</Option>
										<Option key="2">中</Option>
										<Option key="3">低</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col>
							<FormItem
								{...globalFormItemLayout}
								label={"任务描述"}
							>
								{getFieldDecorator("desc", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(<TextArea />)}
							</FormItem>
						</Col>
						<Col>
							<FormItem {...globalFormItemLayout} label={"附件"}>
								{getFieldDecorator("desc", {
									rules: [
										{
											required: true,
											message: "请输入"
										}
									]
								})(
									<Dragger>
										<p>
											<Icon type="inbox" />
										</p>
										<span>拖拽加入文件</span>
									</Dragger>
								)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Fragment>
		);
	}
}

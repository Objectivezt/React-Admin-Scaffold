import React, { Component, Fragment } from 'react';
import {
	Form,
	Button,
	Input,
	Row,
	Col,
} from 'antd';
import PageHeader from 'components/PageHeader';
import { GlobalCard, GlobalTable } from 'globalUI/index';
import {
	globalFormItemLayout,
	globalFormItemBox,
	globalColProps,
	globalDefineListSize,
} from 'common/config';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const filterObj = {
	pageNum: 1,
	pageSize: 10,
	taskId: '',
	taskName: '',
}

@Form.create()
export default class Organization extends Component {
	constructor(props) {
		super(props)
		this.state = {
			...filterObj,
		}
	}

	componentDidMount() {
		const self = this;
		// this.props.dispatch()
	}

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({ ...filterObj })
		this.basePageRequest();
	}

	basePageRequest = (value) => {
		// this.props.dispatch({
		// 	type: 'xxx/xxx',
		// 	payloadMain: value ? value : globalDefineListSize,
		// })
	}

	handleSubmit = () => {
		this.props.form.validateFields((err, fields) => {
			if (err) { return }
			let payloadData = {
				taskId: fields.taskId,
				taskName: fields.taskName,
				...globalDefineListSize,
			}
			this.setState({ ...payloadData });
			this.basePageRequest(payloadData);
		})
	}

	render() {
		const content = () => {
			const { form } = this.props;
			const { getFieldDecorator } = form;
			return (
				<Fragment>
					<GlobalCard title="信息筛选">
						<Form layout="horizontal" onSubmit={this.handleSubmit} >
							<Row>
								<Col {...globalColProps}>
									<FormItem {...globalFormItemLayout} label="任务编号">
										{
											getFieldDecorator('taskId')(<Input {...globalFormItemBox} />)
										}
									</FormItem>
								</Col>
								<Col {...globalColProps}>
									<FormItem {...globalFormItemLayout} label="任务名称">
										{
											getFieldDecorator('taskName')(<Input {...globalFormItemBox} />)
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col style={{ float: 'right' }}>
									<ButtonGroup>
										<Button type="primary" icon="search" onClick={this.handleSubmit}>搜索</Button>
										<Button type="danger" icon="reload" onClick={this.handleReset}>重置</Button>
									</ButtonGroup>
								</Col>
							</Row>
						</Form>
					</GlobalCard>
					<GlobalCard title="信息列表">
						{/* <GlobalTable
							columns={}
							loading={}
							resList={}
							resTotal={}
							rowKeys={}
						/> */}
					</GlobalCard>
				</Fragment>
			)
		}
		return (
			<Fragment>
				<PageHeader breadcrumbList={[{}]} content={content()} />
			</Fragment>
		);
	}
}

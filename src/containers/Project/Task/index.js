import React, { Component, Fragment } from 'react';
import { Button, Col, Form, Input, Row, Icon, Tree } from 'antd';
import { connect } from 'dva';
import PageHeader from 'components/PageHeader';
import { GlobalCard, GlobalTable, GlobalModal } from 'globalUI/index';
import {
	globalFormItemLayout,
	globalFormItemBox,
	globalColProps,
	globalDefineListSize
} from 'common/config';
import AddTaskModal from './AddTaskModal';
import UserListSelect from 'containers/Common/UserListSelect';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const filterObj = {
	pageNum: 1,
	pageSize: 10,
	taskId: '',
	taskName: ''
};

@Form.create()
@connect(({ taskModel, loading }) => ({
	taskModel,
	mainSearchLoading: loading.effects['taskModel/getTaskList']
}))
export default class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterObj: { ...filterObj },
			visibleAddTask: false,
			isAdvanced: false
		};
	}

	componentDidMount() {
		this.basePageRequest();
	}

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({ filterObj: { ...filterObj } });
		this.basePageRequest();
	};

	basePageRequest = value => {
		this.props.dispatch({
			type: 'taskModel/getTaskList',
			payloadMain: value ? value : globalDefineListSize
		});

		this.props.dispatch({ type: 'taskModel/getTaskColumns' });
	};

	handleSearch = () => {
		this.props.form.validateFields((err, fields) => {
			if (err) {
				return;
			}
			let payloadData = {
				taskId: fields.taskId,
				taskName: fields.taskName,
				...globalDefineListSize
			};
			this.setState({ filterObj: { ...payloadData } });
			this.basePageRequest(payloadData);
		});
	};

	handleAddTask = () => {
		this.setState({ visibleAddTask: true });
	};

	finishAddTaskModal = () => {
		this.setState({ visibleAddTask: false });
	};

	cancelTaskModal = () => {
		this.setState({ visibleAddTask: false });
	};

	showMoreFilter = isAdvanced => {
		this.setState({ isAdvanced: !isAdvanced });
	};

	render() {
		const { visibleAddTask, filterObj, isAdvanced } = this.state;
		const { form, taskModel, mainSearchLoading } = this.props;
		const { getFieldDecorator } = form;
		const { resList, resTotal, columns } = taskModel;
		const content = () => {
			return (
				<Fragment>
					<GlobalCard
						title={'信息筛选'}
						extra={
							<a onClick={() => this.showMoreFilter(isAdvanced)}>
								{isAdvanced ? (
									<Fragment>
										<Icon type={'up'} />
										{'收起高级搜索'}
									</Fragment>
								) : (
									<Fragment>
										<Icon type={'down'} />
										{'展开高级搜索'}
									</Fragment>
								)}
							</a>
						}
					>
						<Form
							layout={'horizontal'}
							onSubmit={this.handleSearch}
						>
							<Row>
								<Col {...globalColProps}>
									<FormItem
										{...globalFormItemLayout}
										label={'任务编号'}
									>
										{getFieldDecorator('taskId')(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
								<Col {...globalColProps}>
									<FormItem
										{...globalFormItemLayout}
										label={'任务名称'}
									>
										{getFieldDecorator('taskName')(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
								{isAdvanced ? (
									<Fragment>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'主办人'}
											>
												{getFieldDecorator(
													'mainPerson'
												)(<UserListSelect />)}
											</FormItem>
										</Col>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'协办人'}
											>
												{getFieldDecorator(
													'helpPerson'
												)(<UserListSelect />)}
											</FormItem>
										</Col>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'优先级'}
											>
												{getFieldDecorator('priority')(
													<Input
														{...globalFormItemBox}
													/>
												)}
											</FormItem>
										</Col>
									</Fragment>
								) : null}
							</Row>
							<Row>
								<Col style={{ float: 'right' }}>
									<ButtonGroup>
										<Button
											type={'primary'}
											icon={'search'}
											onClick={this.handleSearch}
										>
											搜索
										</Button>
										<Button
											type={'danger'}
											icon={'reload'}
											onClick={this.handleReset}
										>
											重置
										</Button>
									</ButtonGroup>
								</Col>
							</Row>
						</Form>
					</GlobalCard>
					<GlobalCard
						title={'信息列表'}
						extra={
							<ButtonGroup>
								<Button onClick={this.handleAddTask}>
									新增模版任务
								</Button>
								<Button onClick={this.handleAddTask}>
									新增自定义任务
								</Button>
							</ButtonGroup>
						}
					>
						<GlobalTable
							basePageRequest={this.basePageRequest}
							filterObj={filterObj}
							columns={columns}
							resList={resList}
							resTotal={resTotal}
							rowKeys={'id'}
							loading={mainSearchLoading}
						/>
					</GlobalCard>
				</Fragment>
			);
		};

		return (
			<Fragment>
				<PageHeader
					breadcrumbList={[{ title: '' }]}
					content={content()}
				/>
				<GlobalModal
					visible={visibleAddTask}
					title={'新增任务'}
					width={600}
					onCancel={this.finishAddTaskModal}
					onOk={this.finishAddTaskModal}
				>
					<AddTaskModal />
				</GlobalModal>
			</Fragment>
		);
	}
}

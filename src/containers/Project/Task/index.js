import React, { Component, Fragment } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { connect } from "dva";
import PageHeader from "components/PageHeader";
import { GlobalCard, GlobalTable, GlobalModal } from "globalUI/index";
import {
	globalFormItemLayout,
	globalFormItemBox,
	globalColProps,
	globalDefineListSize
} from "common/config";
import AddTaskModal from "./AddTaskModal";

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const filterObj = {
	pageNum: 1,
	pageSize: 10,
	taskId: "",
	taskName: ""
};
const columns = [
	{
		title: "编号",
		dataIndex: "id",
		key: "id"
	},
	{
		title: "状态",
		dataIndex: "status",
		key: "status"
	},
	{
		title: "主办人",
		dataIndex: "mainPerson",
		key: "mainPerson"
	},
	{
		title: "协办人",
		dataIndex: "helpPerson",
		key: "helpPerson"
	},
	{
		title: "协办人",
		dataIndex: "priority",
		key: "priority"
	},
	{
		title: "时间",
		dataIndex: "time",
		key: "time"
	}
];

@Form.create()
@connect(({ taskModel }) => ({ taskModel }))
export default class Organization extends Component {
	constructor(props) {
		super(props);
		this.state = { ...filterObj, visibleAddTask: false };
	}

	componentDidMount() {
		const self = this;
		// this.props.dispatch()

		this.basePageRequest();
	}

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({ ...filterObj });
		this.basePageRequest();
	};

	basePageRequest = value => {
		this.props.dispatch({
			type: "taskModel/getTaskList",
			payloadMain: value ? value : globalDefineListSize
		});
	};

	handleSubmit = () => {
		this.props.form.validateFields((err, fields) => {
			if (err) {
				return;
			}
			let payloadData = {
				taskId: fields.taskId,
				taskName: fields.taskName,
				...globalDefineListSize
			};
			this.setState({ ...payloadData });
			this.basePageRequest(payloadData);
		});
	};

	handleAddTask = () => {
		this.setState({
			visibleAddTask: true
		});
	};

	finishAddTaskModal = () => {
		console.log(123);

		this.setState({
			visibleAddTask: true
		});
	};

	render() {
		const { visibleAddTask } = this.state;
		const content = () => {
			const { form, taskModel } = this.props;
			const { getFieldDecorator } = form;
			const { resList, resTotal } = taskModel;
			return (
				<Fragment>
					<GlobalCard title="信息筛选">
						<Form layout="horizontal" onSubmit={this.handleSubmit}>
							<Row>
								<Col {...globalColProps}>
									<FormItem
										{...globalFormItemLayout}
										label="任务编号"
									>
										{getFieldDecorator("taskId")(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
								<Col {...globalColProps}>
									<FormItem
										{...globalFormItemLayout}
										label="任务名称"
									>
										{getFieldDecorator("taskName")(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col style={{ float: "right" }}>
									<ButtonGroup>
										<Button
											type="primary"
											icon="search"
											onClick={this.handleSubmit}
										>
											搜索
										</Button>
										<Button
											type="danger"
											icon="reload"
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
						title="信息列表"
						extra={
							<Button onClick={this.handleAddTask}>
								新增任务
							</Button>
						}
					>
						<GlobalTable
							columns={columns}
							resList={resList}
							resTotal={resTotal}
							rowKeys="id"
						/>
					</GlobalCard>
				</Fragment>
			);
		};
		console.log(this);

		return (
			<Fragment>
				<PageHeader
					breadcrumbList={[{ title: "" }]}
					content={content()}
				/>
				<GlobalModal
					visible={visibleAddTask}
					title="新增任务"
					onOk={() => this.finishAddTaskModal}
				>
					<AddTaskModal />
				</GlobalModal>
			</Fragment>
		);
	}
}

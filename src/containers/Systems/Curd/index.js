import React, { Component, Fragment } from 'react';
import {
	Button,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Icon,
	Input,
	Popover,
	Row
} from 'antd';
import { connect } from 'dva';
import PageHeader from '@components/PageHeader';
import { GlobalCard, GlobalTable, GlobalModal } from 'globalUI/index';
import UserListSelect from '@containers/General/UserListSelect';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import InfoModal from './InfoModal';
import {
	globalFormItemLayout,
	globalFormItemBox,
	globalColProps,
	globalDefineListSize
} from '@common/config';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const filterObj = {
	pageNum: 1,
	pageSize: 10,
	id: null,
	name: null,
	createBy: null,
	createTime: null,
	updateBy: null,
	updateTime: null
};

/**
 * @description CURD Demo
 *
 * @export
 * @class Curd
 * @extends {Component}
 */
@Form.create()
@connect(({ curdModel, loading }) => ({
	curdModel,
	mainSearchLoading: loading.effects['curdModel/getMainList']
}))
export default class Curd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [],
			details: {},
			filterObj: { ...filterObj },
			isAdvanced: false,
			visibleAddModal: false,
			visibleUpdateModal: false,
			visibleInfoModal: false,
			checkedList: [],
			indeterminate: true,
			checkAll: false,
			renderColumns: [],
			selectedRowKeys: [],
			selectedRows: []
		};
	}

	componentDidMount() {
		this.basePageRequest();
	}

	basePageRequest = value => {
		const { dispatch } = this.props;
		dispatch({
			type: 'curdModel/getMainList',
			payloadMain: value || globalDefineListSize
		});
		dispatch({ type: 'curdModel/getMainColumns' }).then(() => {
			this.renderColumns();
		});
	};

	handleSearch = () => {
		this.props.form.validateFields((err, fields) => {
			if (err) {
				return;
			}
			let payloadData = {
				id: fields.id,
				name: fields.name,
				createBy: fields.createBy,
				createTime: fields.createTime,
				updateBy: fields.updateBy,
				updateTime: fields.updateTime,
				...globalDefineListSize
			};
			this.setState({ filterObj: { ...payloadData } });
			this.basePageRequest(payloadData);
		});
	};

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({ filterObj: { ...filterObj } });
		this.basePageRequest();
	};

	handleOpenAddModal = () => {
		this.setState({ visibleAddModal: true });
	};

	handleSubmitModal = () => {
		this.setState({ visibleAddModal: false });
	};

	handleCancelAddModal = () => {
		this.setState({ visibleAddModal: false });
	};

	handleOpenInfoModal = record => {
		this.setState({
			visibleInfoModal: true,
			details: record
		});
	};

	handleCancelInfoModal = () => {
		this.setState({ visibleInfoModal: false });
	};

	handleOpenUpdateModal = record => {
		this.setState({
			visibleUpdateModal: true,
			details: record
		});
	};

	handleCancelUpdateModal = () => {
		this.setState({ visibleUpdateModal: false });
	};

	handleUpdateModal = () => {
		this.setState({ visibleUpdateModal: false });
	};

	handleShowMoreFilter = isAdvanced => {
		this.setState({ isAdvanced: !isAdvanced });
	};

	onChangeColumns = checkedList => {
		this.setState({ checkedList });
	};

	onCheckAllChange = e => {};

	renderColumns = () => {
		const { columns } = this.props.curdModel;
		let tempColumnsKey = [];
		columns.forEach(item => {
			tempColumnsKey.push(item.title);
		});
		this.setState({ plainOptions: tempColumnsKey });
	};

	render() {
		const {
			visibleAddModal,
			visibleInfoModal,
			visibleUpdateModal,
			filterObj,
			isAdvanced,
			details,
			indeterminate,
			checkAll,
			checkedList,
			plainOptions,
			selectedRowKeys
		} = this.state;
		const { form, curdModel, mainSearchLoading } = this.props;
		const { getFieldDecorator } = form;
		let { resList = [], resTotal = 0, columns = [] } = curdModel;
		const optionColumns = [
			{
				title: '操作',
				key: 'action',
				width: 80,
				fixed: 'right',
				align: 'center',
				render: (_, record) => (
					<Popover
						content={
							<ButtonGroup>
								<Button
									type={'primary'}
									onClick={() => {
										this.handleOpenUpdateModal(record);
									}}
								>
									修改
								</Button>
								<Button
									type={'ghost'}
									onClick={() =>
										this.handleOpenInfoModal(record)
									}
								>
									详情
								</Button>
								<Button type={'danger'}>删除</Button>
							</ButtonGroup>
						}
					>
						<Button>操作</Button>
					</Popover>
				)
			}
		];
		columns = [...columns, ...optionColumns];
		const content = () => {
			return (
				<Fragment>
					<GlobalCard
						title={'信息筛选'}
						extra={
							<a
								onClick={() =>
									this.handleShowMoreFilter(isAdvanced)
								}
							>
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
										label={'编号'}
									>
										{getFieldDecorator('id')(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
								<Col {...globalColProps}>
									<FormItem
										{...globalFormItemLayout}
										label={'名称'}
									>
										{getFieldDecorator('name')(
											<Input {...globalFormItemBox} />
										)}
									</FormItem>
								</Col>
								{isAdvanced ? (
									<Fragment>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'创建人'}
											>
												{getFieldDecorator('createBy')(
													<UserListSelect />
												)}
											</FormItem>
										</Col>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'更新人'}
											>
												{getFieldDecorator('updateBy')(
													<UserListSelect />
												)}
											</FormItem>
										</Col>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'创建时间'}
											>
												{getFieldDecorator(
													'createTime'
												)(
													<DatePicker
														{...globalFormItemBox}
													/>
												)}
											</FormItem>
										</Col>
										<Col {...globalColProps}>
											<FormItem
												{...globalFormItemLayout}
												label={'更新时间'}
											>
												{getFieldDecorator(
													'updateTime'
												)(
													<DatePicker
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
											icon={'search'}
											onClick={this.handleSearch}
										>
											{'搜索'}
										</Button>
										<Button
											type={'danger'}
											icon={'reload'}
											onClick={this.handleReset}
										>
											{'重置'}
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
								<Popover
									placement={'right'}
									content={
										<Fragment>
											<div
												style={{
													borderBottom:
														'1px solid #E9E9E9'
												}}
											>
												<Checkbox
													indeterminate={
														indeterminate
													}
													onChange={
														this.onCheckAllChange
													}
													checked={checkAll}
												>
													{'全选'}
												</Checkbox>
											</div>
											<CheckboxGroup
												options={plainOptions}
												value={checkedList}
												onChange={this.onChangeColumns}
											/>
										</Fragment>
									}
								>
									<Button icon={'ordered-list'} />
								</Popover>
								<Button
									icon={'plus'}
									onClick={this.handleOpenAddModal}
									type={'primary'}
								>
									{'新增'}
								</Button>
							</ButtonGroup>
						}
					>
						<GlobalTable
							that={this}
							basePageRequest={this.basePageRequest}
							filterObj={filterObj}
							columns={columns}
							resList={resList}
							resTotal={resTotal}
							scrollX={900}
							rowKeys={'id'}
							loading={mainSearchLoading}
							rowSelection="checkbox"
							selectKeys={selectedRowKeys}
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
					onCancel={this.handleCancelAddModal}
					onOk={this.handleSubmitModal}
					title={'新增'}
					visible={visibleAddModal}
					width={600}
				>
					<AddModal />
				</GlobalModal>
				<GlobalModal
					onCancel={this.handleCancelUpdateModal}
					onOk={this.handleUpdateModal}
					title={'修改'}
					visible={visibleUpdateModal}
					width={600}
				>
					<UpdateModal details={details} />
				</GlobalModal>
				<GlobalModal
					footer={null}
					onCancel={this.handleCancelInfoModal}
					title={'详情'}
					visible={visibleInfoModal}
					width={300}
				>
					<InfoModal details={details} />
				</GlobalModal>
			</Fragment>
		);
	}
}

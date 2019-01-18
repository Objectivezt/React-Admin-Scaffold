import React, { Component, Fragment } from 'react';
import { Button, Col, Form, Input, Row, Icon, DatePicker, Popover } from 'antd';
import { connect } from 'dva';
import PageHeader from 'components/PageHeader';
import { GlobalCard, GlobalTable, GlobalModal } from 'globalUI/index';
import UserListSelect from 'containers/Common/UserListSelect';
import AddModal from './AddModal';
import InfoModal from './InfoModal';
import {
	globalFormItemLayout,
	globalFormItemBox,
	globalColProps,
	globalDefineListSize
} from 'common/config';

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
			visibleChangeModal: false,
			visibleInfoModal: false
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
			type: 'curdModel/getMainList',
			payloadMain: value ? value : globalDefineListSize
		});
		this.props.dispatch({ type: 'curdModel/getMainColumns' });
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

	handleOpenModal = () => {
		this.setState({ visibleAddModal: true });
	};

	submitModal = () => {
		this.setState({ visibleAddModal: false });
	};

	cancelAddModal = () => {
		this.setState({ visibleAddModal: false });
	};

	openInfoModal = record => {
		this.setState({
			visibleInfoModal: true,
			details: record
		});
	};

	cancelInfoModal = () => {
		this.setState({ visibleInfoModal: false });
	};

	showMoreFilter = isAdvanced => {
		this.setState({ isAdvanced: !isAdvanced });
	};

	render() {
		const {
			visibleAddModal,
			visibleInfoModal,
			filterObj,
			isAdvanced,
			details
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
								<Button type={'primary'}>修改</Button>
								<Button
									type={'ghost'}
									onClick={() => this.openInfoModal(record)}
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
								<Button
									onClick={this.handleOpenModal}
									type={'primary'}
								>
									{'新增'}
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
							scrollX={900}
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
					breadcrumbList={[{ title: '123' }]}
					content={content()}
				/>
				<GlobalModal
					visible={visibleAddModal}
					title={'新增'}
					width={600}
					onCancel={this.cancelAddModal}
					onOk={this.submitModal}
				>
					<AddModal />
				</GlobalModal>
				<GlobalModal
					visible={visibleInfoModal}
					title={'详情'}
					width={300}
					onCancel={this.cancelInfoModal}
					footer={null}
				>
					<InfoModal details={details} />
				</GlobalModal>
			</Fragment>
		);
	}
}

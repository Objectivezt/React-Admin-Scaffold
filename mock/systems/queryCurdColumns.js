const arr = [
	{
		title: '编号',
		dataIndex: 'id',
		key: 'id',
		align: 'center'
	},
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
	},
	{
		title: '创建人',
		dataIndex: 'createBy',
		key: 'createBy',
		align: 'center'
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		key: 'createTime',
		align: 'center'
	},
	{
		title: '更新人',
		dataIndex: 'updateBy',
		key: 'updateBy',
		align: 'center'
	},
	{
		title: '更新时间',
		dataIndex: 'updateTime',
		key: 'updateTime',
		align: 'center'
	}
];

const defaultSelectColumns = [
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		align: 'center'
	},
	{
		title: '创建人',
		dataIndex: 'createBy',
		key: 'createBy',
		align: 'center'
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		key: 'createTime',
		align: 'center'
	}
];

export default {
	code: '0000',
	msg: 'ok',
	data: {
		allColumns: arr,
		defaultColumns: defaultSelectColumns,
		total: arr.length
	}
};

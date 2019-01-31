const formList = [
	{
		type: 'select',
		lable: '机型',
		initialValue: '1',
		placeholder: '请选择您的机型',
		width: '200px',
		field: 'iphone',
		list: [
			{ id: '1', name: 'IphoneX' },
			{ id: '2', name: 'Ihonexs' },
			{ id: '3', name: 'IhoneXsMax' }
		]
	},
	{
		type: 'input',
		lable: '备注',
		initialValue: 'oncare',
		placeholder: '请填写你的备注',
		width: '200px',
		field: 'text'
	},
	{
		type: 'checkbox',
		lable: 'isCare',
		initialValue: true,
		placeholder: '请填写你的备注',
		width: '200px',
		field: 'isCare'
	},
	{
		type: 'date',
		lable: '查询时间从',
		initialValue: '2018-09-09 02:02:02',
		placeholder: '请填写你的时间',
		width: '200px',
		field: 'isStart'
	}
];

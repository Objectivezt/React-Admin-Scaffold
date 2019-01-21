const auth = [
	{
		path: 'auth/app',
		icon: 'home',
		name: '系统主页',
		children: []
	},
	{
		path: 'auth/systems',
		icon: 'sliders',
		name: '使用指南',
		children: [
			{
				path: 'curd',
				icon: 'sliders',
				name: 'CURD',
				children: []
			}
		]
	}
];

export default {
	code: '0000',
	msg: 'ok',
	data: auth
};

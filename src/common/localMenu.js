export default [
	{
		path: 'auth/app',
		icon: 'home',
		name: '系统主页',
		children: []
	},
	{
		path: 'auth/systems',
		icon: 'sliders',
		name: '增删查改',
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

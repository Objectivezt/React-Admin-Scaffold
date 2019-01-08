import { delay } from 'roadhog-api-doc';
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
	'GET /user/queryCurrentMenus': {
		code: '0000',
		msg: 'ok',
		data: [
			{
				path: 'auth/app',
				icon: 'home',
				name: '系统主页',
				children: [],
			},
			{
				path: 'auth/project',
				icon: 'project',
				name: '项目管理',
				children: [
					{
						path: 'activity',
						icon: 'team',
						name: '活动管理',
						children: [],
					},
					{
						path: 'task',
						icon: 'solution',
						name: '任务管理',
						children: [],
					}
				]
			},
			{
				path: 'auth/assessment',
				icon: 'rise',
				name: '考核管理',
				children: [],
			},
			{
				path: 'auth/financial',
				icon: 'pay-circle',
				name: '财务管理',
				children: [
					{
						path: 'report',
						icon: 'rise',
						name: '申请与报销',
						children: [],
					},
					{
						path: 'fee',
						icon: 'profile',
						name: '党费管理',
						children: [],
					},
					{
						path: 'review',
						icon: 'audit',
						name: '审计管理',
						children: [],
					},
					{
						path: 'manual',
						icon: 'tool',
						name: '手工处理',
						children: [],
					},
				],
			}
		]
	},

	'GET /user/queryCurrentUser': {
		$desc: "",
		$param: {},
		$body: {
			code: '0000',
			msg: 'ok',
			data: {
				username: 'admin',
				userId: 'admin123',
			}
		}
	},
	'POST /user/login': (req, res) => {
		const { password, username } = req.body;
		if (password === '123' && username === 'admin') {
			res.send({
				code: '0000',
				msg: 'ok',
				data: {
					status: 'ok',
					currentAuthority: 'admin',
					username: username,
				}
			})
		}
	}
}

export default noProxy ? {} : delay(proxy, 1000);

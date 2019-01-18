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
	},
	{
		path: 'auth/basic',
		icon: 'setting',
		name: '基础管理',
		children: [
			{
				path: 'organization',
				icon: 'team',
				name: '组织管理',
				children: []
			},
			{
				path: 'chain',
				icon: 'box-plot',
				name: '审批链配置',
				children: []
			},
			{
				path: 'menu',
				icon: 'menu-unfold',
				name: '菜单信息',
				children: []
			},
			{
				path: 'character',
				icon: 'idcard',
				name: '角色配置',
				children: []
			},
			{
				path: 'process',
				icon: 'cluster',
				name: '流程配置',
				children: []
			},
			{
				path: 'task',
				icon: 'schedule',
				name: '任务模版配置',
				children: []
			},
			{
				path: 'mail',
				icon: 'mail',
				name: '邮件模版配置',
				children: []
			},
			{
				path: 'project',
				icon: 'project',
				name: '项目基础配置',
				children: []
			}
		]
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
				children: []
			},
			{
				path: 'task',
				icon: 'solution',
				name: '任务管理',
				children: []
			}
		]
	},
	{
		path: 'auth/assessment',
		icon: 'rise',
		name: '考核管理',
		children: [
			{
				path: 'group',
				icon: '',
				name: '党组织考核',
				children: []
			},
			{
				path: 'person',
				icon: '',
				name: '党员考核',
				children: []
			}
		]
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
				children: []
			},
			{
				path: 'fee',
				icon: 'profile',
				name: '党费管理',
				children: []
			},
			{
				path: 'review',
				icon: 'audit',
				name: '审计管理',
				children: []
			},
			{
				path: 'manual',
				icon: 'tool',
				name: '手工处理',
				children: []
			}
		]
	},
	{
		path: 'auth/news',
		icon: 'file-word',
		name: '新闻管理',
		children: [
			{
				path: 'dynamic',
				icon: 'global',
				name: '新闻动态',
				children: []
			},
			{
				path: 'carousel',
				icon: 'picture',
				name: '轮播图配置',
				children: []
			},
			{
				path: 'customize',
				icon: 'tool',
				name: '自定义',
				children: []
			}
		]
	},
	{
		path: 'auth/study',
		icon: 'book',
		name: '学习管理',
		children: [
			{
				path: 'assets',
				icon: 'file',
				name: '资料配置',
				children: []
			}
		]
	},
	{
		path: 'users/activity',
		icon: 'smile',
		name: '活动中心',
		children: [
			{
				path: 'all',
				icon: 'team',
				name: '所有活动',
				children: []
			},
			{
				path: 'personal',
				icon: 'usergroup-add',
				name: '我的活动',
				children: []
			}
		]
	},
	{
		path: 'users/study',
		icon: 'database',
		name: '学习中心',
		children: [
			{
				path: 'file',
				icon: 'file',
				name: '资料中心',
				children: []
			}
		]
	},
	{
		path: 'users/archives',
		icon: 'hdd',
		name: '档案中心',
		children: [
			{
				path: 'personal',
				icon: 'folder',
				name: '个人归档',
				children: []
			}
		]
	},
	{
		path: 'users/news',
		icon: 'read',
		name: '新闻中心',
		children: []
	}
];

export default {
	code: '0000',
	msg: 'ok',
	data: auth
};

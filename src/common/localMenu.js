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
        name: 'CURD',
        children: []
      }
    ]
  },
  // {
  //   path: 'auth/dataInput',
  //   name: '数据录入',
  //   icon: 'sliders',
  //   children: [
  //     {
  //       path: 'transfer',
  //       name: '穿梭框'
  //     }
  //   ]
  // },
  {
    path: 'auth/component',
    name: '精选组件',
    icon: 'sliders',
    children: [
      {
        path: 'd3',
        name: 'd3图表'
      },
      {
        path: 'amap',
        name: '高德地图库'
      },
      // {
      //   path: 'editor',
      //   name: '编辑器'
      // }
      {
        path: 'split-pane',
        name: '分割面板'
      },
      {
        path: 'markdown',
        name: 'MarkDown'
      },
      {
        path: 'high-light-word',
        name: '文字高亮'
      },
      {
        path: 'spark-lines',
        name: '趋势图'
      },
      {
        path: 'g6',
        name: 'g6'
      },
      {
        path: 'json-view',
        name: 'json-view'
      }
    ]
  }
];

// 左侧边栏菜单配置
module.exports = [
  {
    name: '标签',
    id: '2',
    icon: 'el-icon-price-tag',
    sub: [
      {
        name: '标签列表',
        icon: 'el-icon-s-order',
        path: '/labelList'
      },
      {
        name: '标签分布',
        icon: 'el-icon-s-management',
        path: '/labelType'
      }
    ]
  },
  {
    name: '日志',
    id: '3',
    icon: 'el-icon-notebook-2',
    sub: [
      {
        name: '日志列表',
        icon: 'el-icon-s-order',
        path: '/logList'
      }
    ]
  }
]

// 左侧边栏菜单配置
module.exports = [
  {
    name: '标签',
    id: '2',
    icon: 'iconfont icon-label',
    permission: ['O', 'A'],
    sub: [
      {
        name: '标签列表',
        id: '/labelList',
        path: '/labelList',
        permission: ['O', 'A']
      },
      {
        name: '标签分布',
        path: '/labelType',
        permission: ['O', 'A']
      }
    ]
  },
  {
    name: '客群',
    id: '3',
    icon: 'iconfont icon-group',
    permission: ['O', 'A'],
    sub: [
      {
        name: '客群列表',
        path: '/groupList',
        permission: ['O', 'A']
      }
    ]
  },
  {
    name: '日志',
    id: '4',
    icon: 'iconfont icon-log',
    permission: ['A'],
    sub: [
      {
        name: '日志列表',
        path: '/logList',
        permission: ['A']
      }
    ]
  },
  {
    name: '通知',
    id: '5',
    icon: 'iconfont icon-notice',
    permission: ['O', 'A'],
    sub: [
      {
        name: '通知列表',
        path: '/noticeList',
        permission: ['O', 'A']
      }
    ]
  }
]

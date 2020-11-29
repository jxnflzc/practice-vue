import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Home from '@/components/practice/Home'
import LabelList from '@/components/practice/label/LabelList'
import LogList from '@/components/practice/log/LogList'
import LabelType from '@/components/practice/label/LabelType'
import UserInfo from '@/components/practice/UserInfo'
import GroupList from '@/components/practice/group/GroupList'
import NoticeList from '@/components/practice/notice/NoticeList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'labelList',
          name: 'LabelList',
          component: LabelList
        },
        {
          path: 'userInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: 'labelType',
          name: 'LabelType',
          component: LabelType
        },
        {
          path: 'logList',
          name: 'LogList',
          component: LogList
        },
        {
          path: 'groupList',
          name: 'GroupList',
          component: GroupList
        },
        {
          path: 'noticeList',
          name: 'NoticeList',
          component: NoticeList
        }
      ]
    }
  ]
})

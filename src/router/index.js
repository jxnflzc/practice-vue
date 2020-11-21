import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/practice/Home'
import LabelList from '@/components/practice/label/LabelList'
import LabelType from '@/components/practice/label/LabelType'
import UserInfo from '@/components/practice/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/labelList',
      name: 'LabelList',
      component: LabelList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/labelType',
      name: 'LabelType',
      component: LabelType,
      meta: {
        keepAlive: true
      }
    }
  ]
})

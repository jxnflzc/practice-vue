<template>
  <div>
    <img src="@/assets/logo.png" />
    <el-menu
      default-active="/home"
      router
      class="el-menu-vertical-demo">
      <el-dropdown class="align-center" >
        <span class="el-dropdown-link align-center">
          <el-avatar>{{ userId }}</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="info" :disabled="userLogin">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-text="item.name"></span>
        </template>
        <el-menu-item-group v-for="sub in item.sub" :key="sub.path">
          <el-menu-item :class="sub.icon" :index="sub.path" v-text="sub.name"></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import menu from '@/config/menu'
import { logout } from '@/api'
import {Message} from 'element-ui'

export default {
  name: 'Left',
  data () {
    return {
      menu: menu,
      userId: sessionStorage['userId'] ? sessionStorage['userId'] : '',
      userLogin: !sessionStorage['userId']
    }
  },
  methods: {
    logout () {
      logout()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userId')
            Message.success('登出成功')
            this.$router.push({name: 'Login'})
          } else {
            Message.error('登出失败')
          }
        })
    },
    info () {
      this.$router.push({name: 'UserInfo'})
    }
  },
  mounted () {
    window.Vue = this
  }
}
</script>

<style scoped>
  .align-center {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
</style>

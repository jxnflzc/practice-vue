<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="user.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="user.password"/>
      </el-form-item>
      <el-form-item >
        <el-button style="float: left"  type="primary" v-on:click="login(user)">登录</el-button>
        <router-link style="float: right" :to="{path:'/register'}">注册账号</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, auth } from '@/api'
import { validUserId, validUserPassword } from '@/method/valid'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, validator: validUserId, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: validUserPassword, trigger: 'blur'}
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    login (user) {
      this.$refs.user.validate((valid) => {
        if (valid) {
          login(user)
            .then(response => {
              let code = response.data.code
              if (code === '200') {
                sessionStorage['token'] = response.data.data
                sessionStorage['userId'] = this.user.username
                auth()
                  .then(response => {
                    sessionStorage['permission'] = response.data.data
                    Message.success('登录成功')
                    this.$router.push({name: 'Home'})
                  })
              } else {
                Message.error('登录失败')
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>

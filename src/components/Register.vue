<template>
  <div>
    <el-form ref="user" :model="user" :rules="rules" class="login-box">
      <h3 class="login-title">注册账号</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="user.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="user.password"/>
      </el-form-item>
      <el-form-item label="重复密码" prop="againPassword">
        <el-input type="password" placeholder="请再次输入密码" v-model="user.againPassword"/>
      </el-form-item>
      <el-form-item >
        <el-button style="float: left"  type="primary" v-on:click="register(user)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api'
import { validUserId, validUserPassword } from '@/method/valid'
import { Message } from 'element-ui'

export default {
  name: 'Register',
  data () {
    const validAgainPassword = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (!/^[a-zA-Z0-9]{4,16}$/.test(value)) {
        callback(new Error('密码必须为4-16位字母或数字'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码必须相同'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        againPassword: ''
      },
      rules: {
        username: [
          {required: true, validator: validUserId, trigger: 'blur'}
        ],
        password: [
          {required: true, validator: validUserPassword, trigger: 'blur'}
        ],
        againPassword: [
          {required: true, validator: validAgainPassword, trigger: 'blur'}
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    register (user) {
      this.$refs.user.validate((valid) => {
        if (valid) {
          register(user)
            .then(response => {
              let code = response.data.code
              if (code === '200') {
                Message.success('注册成功')
                this.$router.push({name: 'Login'})
              } else {
                Message.error(response.data.message)
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

<template>
  <div>
    <el-form :model="user" class="form-box">
      <h3 class="form-title">用户信息</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" disabled placeholder="请输入账号" v-model="user.userId"/>
      </el-form-item>
      <el-form-item label="姓名" prop="password">
        <el-input type="text" placeholder="请输入姓名" v-model="user.userName"/>
      </el-form-item>
      <el-form-item label="性别" prop="password">
        <el-select v-model="user.userGender" placeholder="请选择">
          <el-option
            v-for="item in gender"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="updateUserInfo(user)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { info, updateUserInfo } from '@/api'
import { Message } from 'element-ui'

export default {
  name: 'UserInfo',
  data () {
    return {
      user: {
        userId: '',
        userName: '',
        userGender: ''
      },
      gender: [
        {
          value: '男'
        },
        {
          value: '女'
        },
        {
          value: '未知'
        }
      ]
    }
  },
  methods: {
    queryUserInfo () {
      info()
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            this.user = response.data.data
          } else {
            Message.error('查询失败')
          }
        })
    },
    updateUserInfo (user) {
      updateUserInfo(user)
        .then(response => {
          let code = response.data.code
          if (code === '200') {
            Message.success(response.data.data)
          } else {
            Message.error(response.data.message)
          }
        })
    }
  },
  mounted () {
    this.queryUserInfo()
  }
}
</script>

<style scoped>
.el-input {
  width: 450px;
}
.form-box {
  width: 500px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.form-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.el-button {
  float: right;
  text-align: center;
}
</style>

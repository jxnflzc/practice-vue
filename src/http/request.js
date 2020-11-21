import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
let service = axios.create({
  baseURL: '/practice',
  timeout: 80000 // request timeout
})

// request interceptor
service.interceptors.request.use(

  config => {
    // Do something before request is sent
    let token = sessionStorage['token'] ? sessionStorage['token'] : ''
    config.headers.Authorization = token
    return config
  },
  error => {
    // Do something with request error
    // console.log("出错啦",error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code === '888') {
      setTimeout(function () {
        //  控制路由跳转或者直接改变href到登录页
        window.location.href = '/#/login'
      }, 1000)
      Message.error(response.data.message)
      return Promise.reject(response)
    } else {
      return response
    }
  },

  error => {
    console.log('error:' + error) // for debug
    Message.error(error)
    return Promise.reject(error)
  }
)

export default service

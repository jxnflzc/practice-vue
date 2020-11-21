import axios from 'axios'

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
  response => response,

  error => {
    console.log('error:' + error) // for debug
    return Promise.reject(error)
  }
)

export default service

import request from '@/http/request'
// 获取你要的数据
export function login (data) {
  return request({
    url: '/user/login', // 自己的接口地址
    method: 'post', // 请求方法
    data: {
      userId: data.username,
      userPassword: data.password
    }// 需要携带的参数
  })
}

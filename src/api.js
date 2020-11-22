import request from '@/http/request'

// 登录
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

// 登出
export function logout () {
  return request({
    url: '/user/logout', // 自己的接口地址
    method: 'get', // 请求方法
    data: {}// 需要携带的参数
  })
}

// 用户信息
export function info () {
  return request({
    url: '/user/info', // 自己的接口地址
    method: 'get', // 请求方法
    data: {}// 需要携带的参数
  })
}

// 标签列表
export function queryLabelList (data) {
  return request({
    url: '/label/queryLabelList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      page: data.page,
      size: data.size,
      keywords: data.keywords,
      labelType: data.labelType
    }// 需要携带的参数
  })
}

// 查询基础标签分类
export function queryLabelTypeList () {
  return request({
    url: '/label/queryLabelTypeList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {}// 需要携带的参数
  })
}

// 查询基础标签分类
export function saveLabel (data) {
  return request({
    url: '/label/saveLabel', // 自己的接口地址
    method: 'post', // 请求方法
    data: {
      labelId: data.labelId,
      labelName: data.labelName,
      labelType: {
        code: data.labelTypeValue
      },
      labelHot: data.labelHot,
      labelValue: data.labelValue
    }// 需要携带的参数
  })
}

// 查询基础标签
export function queryLabel (data) {
  return request({
    url: '/label/queryLabel', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      labelId: data
    }// 需要携带的参数
  })
}

// 删除基础标签
export function deleteLabel (data) {
  return request({
    url: '/label/deleteLabel', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      labelId: data
    }// 需要携带的参数
  })
}

// 查询标签分类数
export function queryLabelTypeCount (data) {
  return request({
    url: '/label/queryLabelTypeCount', // 自己的接口地址
    method: 'get', // 请求方法
    params: {}// 需要携带的参数
  })
}

// 查询日志列表
export function queryLogList (data) {
  return request({
    url: '/log/queryLogList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      page: data.page,
      size: data.size,
      keywords: data.keywords,
      logType: data.logType
    }// 需要携带的参数
  })
}

// 查询日志列表
export function queryLogTypeList (data) {
  return request({
    url: '/log/queryLogTypeList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {}// 需要携带的参数
  })
}

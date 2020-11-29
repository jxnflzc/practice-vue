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

// 权限
export function auth () {
  return request({
    url: '/user/auth', // 自己的接口地址
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

// 标签列表
export function queryAllLabels (data) {
  return request({
    url: '/label/queryAllLabels', // 自己的接口地址
    method: 'get', // 请求方法
    params: {}// 需要携带的参数
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

// 查询客群列表
export function queryGroupList (data) {
  return request({
    url: '/group/queryGroupList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      page: data.page,
      size: data.size,
      keywords: data.keywords
    }// 需要携带的参数
  })
}

// 查询客群列表
export function queryGroup (data) {
  return request({
    url: '/group/queryGroup', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      groupId: data
    }// 需要携带的参数
  })
}

// 保存客群
export function saveGroup (data) {
  return request({
    url: '/group/saveGroup', // 自己的接口地址
    method: 'post', // 请求方法
    data: {
      groupId: data.groupId,
      groupName: data.groupName,
      groupDesc: data.groupDesc,
      tags: JSON.stringify(data.tags)
    }// 需要携带的参数
  })
}

// 删除客群
export function deleteGroup (data) {
  return request({
    url: '/group/deleteGroup', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      groupId: data
    }// 需要携带的参数
  })
}

// 查询通知列表
export function queryNoticeList (data) {
  return request({
    url: '/notice/queryNoticeList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      page: data.page,
      size: data.size,
      keywords: data.keywords,
      noticeLevel: data.noticeLevel
    }// 需要携带的参数
  })
}

// 查询通知列表
export function queryNotice (data) {
  return request({
    url: '/notice/queryNotice', // 自己的接口地址
    method: 'get', // 请求方法
    params: {
      noticeId: data
    }// 需要携带的参数
  })
}

// 查询通知级别
export function queryNoticeLevelList (data) {
  return request({
    url: '/notice/queryNoticeLevelList', // 自己的接口地址
    method: 'get', // 请求方法
    params: {}// 需要携带的参数
  })
}

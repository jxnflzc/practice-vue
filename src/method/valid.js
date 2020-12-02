export const validUserId = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  }
  if (!/^[a-zA-Z0-9]{4,32}$/.test(value)) {
    callback(new Error('账号必须为4-32位字母或数字'))
  } else {
    callback()
  }
}

export const validUserPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (!/^[a-zA-Z0-9]{4,16}$/.test(value)) {
    callback(new Error('密码必须为4-16位字母或数字'))
  } else {
    callback()
  }
}

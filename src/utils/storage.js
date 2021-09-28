import Cookie from 'js-cookie'

// 存Token
export function setToken (token) {
  Cookie.set('VUE_TOUTIAO_TOKEN', token, { expires: 7 })
}

// 取Token
export function getToken () {
  return Cookie.get('VUE_TOUTIAO_TOKEN')
}

// 删Token
export function removeToken () {
  Cookie.remove('VUE_TOUTIAO_TOKEN')
}

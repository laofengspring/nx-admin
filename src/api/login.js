import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/administrators/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/administrators/logout',
    method: 'get'
  })
}

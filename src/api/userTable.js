import request from '@/utils/request'

export function getUserListPage(params) {
  return request({
    url: '/user/listpage',
    method: 'get',
    params: params
  })
}
export function removeUser(params) {
  return request({
    url: '/user/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveUser(params) {
  return request({
    url: '/user/batchremove',
    method: 'get',
    params: params
  })
}
export function editUser(params) {
  return request({
    url: '/user/edit',
    method: 'get',
    params: params
  })
}
export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'get',
    params: params
  })
}
export function getAllRoles(params) {
  return request({
    url: '/user/getallroles',
    method: 'get'
  })
}
export function getAllSpots(params) {
  return request({
    url: '/user/getallspots',
    method: 'get'
  })
}
export function getAllActive(params) {
  return request({
    url: '/user/getallactive',
    method: 'get'
  })
}
export function getAllWeapons(params) {
  return request({
    url: '/user/getallweapons',
    method: 'get'
  })
}

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
export function upload(params, data) {
  return request({
    url: '/files/upload',
    method: 'post',
    params: params,
    data: data
  })
}

export function getAllRoles(params) {
  return request({
    url: '/roles/getallroles',
    method: 'get'
  })
}
export function editRole(params, data) {
  return request({
    url: '/roles/edit',
    method: 'put',
    params: params,
    data: data
  })
}
export function createRole(data) {
  return request({
    url: '/roles/create',
    method: 'post',
    data: data
  })
}
export function deleteRole(params) {
  return request({
    url: '/roles/delete',
    method: 'delete',
    params: params
  })
}
export function deleteManyRole(params) {
  return request({
    url: '/roles',
    method: 'delete',
    params: params
  })
}

export function getAllSpots(params) {
  return request({
    url: '/spots/getallspots',
    method: 'get'
  })
}
export function editSpot(params, data) {
  return request({
    url: '/spots/edit',
    method: 'put',
    params: params,
    data: data
  })
}
export function createSpots(data) {
  return request({
    url: '/spots/create',
    method: 'post',
    data: data
  })
}
export function deleteSpot(params) {
  return request({
    url: '/spots/delete',
    method: 'delete',
    params: params
  })
}
export function deleteManySpot(params) {
  return request({
    url: '/spots',
    method: 'delete',
    params: params
  })
}

export function getAllWeapons(params) {
  return request({
    url: '/weapons/getallweapons',
    method: 'get'
  })
}
export function editWeapon(params, data) {
  return request({
    url: '/weapons/edit',
    method: 'put',
    params: params,
    data: data
  })
}
export function createWeapon(data) {
  return request({
    url: '/weapons/create',
    method: 'post',
    data: data
  })
}
export function deleteWeapon(params) {
  return request({
    url: '/weapons/delete',
    method: 'delete',
    params: params
  })
}
export function deleteManyWeapon(params) {
  return request({
    url: '/weapons',
    method: 'delete',
    params: params
  })
}

export function getAllActive(params) {
  return request({
    url: '/activity/getallactive',
    method: 'get'
  })
}
export function editActive(params, data) {
  return request({
    url: '/activity/edit',
    method: 'put',
    params: params,
    data: data
  })
}
export function createActive(data) {
  return request({
    url: '/activity/create',
    method: 'post',
    data: data
  })
}
export function deleteActive(params) {
  return request({
    url: '/activity/delete',
    method: 'delete',
    params: params
  })
}
export function deleteManyActive(params) {
  return request({
    url: '/activity',
    method: 'delete',
    params: params
  })
}

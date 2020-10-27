//员工模块
import axios from '@/utils/request.js'

//分页查找
export function queryFindAll(params) {
  let obj = { ...params };
  obj.page--;
  for (let key in obj) {
    if (obj[key] === 0) { continue }
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return axios.post('/waiter/query', obj)
}
//保存或更新
export function saveOrUpdate(params) {
  return axios.post('/waiter/saveOrUpdate', params)
}

//通过id删除
export function deleteById(params) {
  return axios.get('/waiter/deleteById', { params })
}

//批量删除
export function batchDelete(params) {
  return axios.post('/waiter/batchDelete', params)
}

//通过id查找员工信息
export function findWaiterById(params) {
  return axios.get('/waiter/findWaiterById', { params })
}

//通过id查看员工受益信息
export function detailShou(params) {
  let obj = { ...params };
  obj.page--;
  for (let key in obj) {
    if (obj[key] === 0) { continue }
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return axios.post('/waiter/queryShou', obj)
}
//员工身份证审核
export function auditing(params) {
  return axios.get('/waiter/auditing', params)
}
//拒绝员工身份证审核
export function refusauditing(params) {
  return axios.post('/waiter/refusauditing', params)
}

//通过员工Id查找收益信息
export function detailsShouById(params) {
  return axios.get('/waiter/detailsShou', { params })
}
//审核
export function waiterexamine(params) {
  return axios.post('/waiter/waiterexamine', params)
}
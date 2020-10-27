//栏目模块
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
  return axios.post('/category/query', obj)
}
//保存更新
export function saveOrUpdate(params) {
  return axios.post('/category/saveOrUpdate', params);
}
//通过id删除
export function deleteById(params) {
  return axios.get('/category/deleteById', { params })
}

//批量删除
export function batchDelete(params) {
  return axios.post('/category/batchDelete', params)
}
//查找栏目
export function findcategoryId() {
  return axios.get('/category/findAll')
}
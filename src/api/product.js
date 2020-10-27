//产品，模块
//引入axios
import axios from '@/utils/request.js'

export function findAll(params) {
  let obj = { ...params };
  obj.page--;
  //删除空数据，
  for (let key in obj) {
    //避免删除属性为0的数据,当page或pageSize为0 时，防止被删除掉
    if (obj[key] === 0) { continue };
    //如果属性为空的话删除，比如statu为空字符串，则删除掉
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return axios.post('/product/query', obj);
}
//保存更新
export function saveOrUpdate(params) {
  return axios.post('/product/saveOrUpdate', params)
}
//查找所有产品
export function findcategoryId() {
  return axios.get('/product/findAll')
}
//通过id删除
export function deleteById(params) {
  return axios.get('/product/deleteById', { params })
}
//批量删除
export function batchDelete(params) {
  return axios.post('/product/batchDelete', params)
}
//评论模块
import axios from '@/utils/request.js'

//分页查询
export function queryFindAll(params) {
  let obj = { ...params };
  obj.page--;
  for (let key in obj) {
    if (obj[key] === 0) { continue };
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return axios.post('/comment/query', obj)
}
//id删除
export function deleteById(params) {
  return axios.get('/comment/deleteById', { params })
}
//通过审核
export function commentExamine(params) {
  return axios.get('/comment/commentExamine', { params })
}
//拒绝审核
export function commentRefuseExamine(params) {
  return axios.get('/comment/commentRefuseExamine', { params })
}
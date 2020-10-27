//订单模块
import axios from '@/utils/request.js';

//通过ID订单信息
export function queryFindById(params) {
  return axios.get('/order/query', { params })
}
//订单详情信息
export function findById(params) {
  return axios.get('/order/findById', { params })
}
//查找所有订单
export function findAll() {
  return axios.get('/order/findAll')
}
//分页查询
export function queryPage(params) {
  let obj = { ...params };
  obj.page--;
  for (let key in obj) {
    if (obj[key] == 0) { continue };
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return axios.post('/order/queryPage', obj)
}
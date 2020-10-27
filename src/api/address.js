//address模块
//引入axios
import axios from '@/utils/request.js';

//通过顾客id查找地址
export function findByCustomerId(params) {
  return axios.get('/address/findByCustomerId', { params })
}
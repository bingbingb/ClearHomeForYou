// 在api中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/utils/request.js'
/***
 * 查找所有的顾客信息
 * @param Object params
 *  @returns Promise对象
*/
export function findAll(params) {
  /** if (!params.status) {
     delete params.status
   } */
  //遍历对象 for-in obejct.keys()遍历数据 objext.values() object.entries()
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
  return axios.post('/customer/query', obj)
}
//保存更新
export function saveOrUpdate(params) {
  return axios.post('/customer/saveOrUpdate', params)
}
//通过id删除顾客
export function deleteById(params) {
  return axios.get('/customer/deleteById', { params })
}
//批量删除顾客
export function batchDelete(params) {
  return axios.post('/customer/batchDelete', params)
}
//通过ID查找顾客信息
export function findCustomerById(params) {
  return axios.get('/customer/findCustomerById', { params })
}

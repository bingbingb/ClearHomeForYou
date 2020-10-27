// 配置axios
import axios from 'axios'
// 引入qs
import qs from 'qs'
// 引入配置文件
import conf from './config.js'
const { baseURL } = conf;
// 创建实例
let instance = axios.create({
  baseURL
});
// 请求拦截器
instance.interceptors.request.use(config => {
  if (config.method == 'post' && config.url != '/user/login' && config.url != '/waiter/waiterexamine') { // user/login要求的数据为json数据,其他接口的post是表单格式数据
    config.data = qs.stringify(config.data);
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// 响应拦截器 
instance.interceptors.response.use(response => {
  return {
    ...response,
    data: response.data.data,
    status: response.data.status,
    statusText: response.data.message
  };
}, error => {
  return Promise.reject(error);
});
export default instance


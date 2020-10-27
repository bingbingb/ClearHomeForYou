//维护项目的配置文件，公共的将来可能发生更改的数据
// 后台服务器地址
const baseURL = 'http://47.98.240.195:5588';
// 提示时长
const time = 5000;
// token字符串  sessionStorage中存储的key值记录一下
const token = 'token';

export default {
  baseURL,
  time,
  token
}

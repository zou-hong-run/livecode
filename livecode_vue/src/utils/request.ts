import axios from 'axios';
import {ServeURL} from './config'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: ServeURL,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    return Promise.resolve(res.data)
})

export default service

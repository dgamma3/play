import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前要做的处理
  return config;
}, function (error) {
  // 对请求错误情况的处理
  // return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // return Promise.reject(error);
});

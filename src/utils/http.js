import axios from "axios";
import store from "../store";
import {Loading, Message} from "element-ui";
import NProgress from "nprogress"; // 进度条插件
import router from "../router";
import {setLogin} from "router";

// 全局表单提交方式
// 创建axios实例
const service = axios.create({
  baseURL: "/api", // api的base_url
  withCredentials: true,
  // timeout: 5000 // 请求超时时间
  // paramsSerializer: function (params) {
  //   return qs.stringify(params, { arrayFormat: 'brackets' })
  // },
  // transformRequest: [function (data) {  //  参数转换
  //   return qs.stringify(data);
  // }]
});

let loadingInstance;
let isLoading = false;
const defaultLoading = { fullscreen: true };

service.interceptors.request.use((config) => {
  openLoading(config)
  return config;
}, error => {
  NProgress.done();
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    closeLoading()
    let data = response.data;
    if (data.status) {

    } else {
      if (data.message) {
        Message({
          type: data.level || "warning",
          message: data.message
        })
      }
      if (data.code === 'SESSION_EXPIRED') {
        setLogin(false);
        router.push({ name: 'login', params: router.currentRoute });
      }
    }
    return data;
  }, error => {
    closeLoading()
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      const response = error.response;
      const data = response.data;
      if (data && data.message) {
        Message({
          type: data.level || warning,
          message: data.message
        })
      }
      if (response.status === 401) { // 返回401
        // store.dispatch('setLogin', false);
        store.dispatch('logout', { url: router.currentRoute.fullPath })
      }
      return Promise.reject(response);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

function openLoading(config) {  // 打开loading
  if (!isLoading) {
    isLoading = true;
    NProgress.start();
    if (config.loading === true) {
      loadingInstance = Loading.service(config.loadOption || defaultLoading);
    }
  }
}

function closeLoading() { // 关闭 loading
  if (isLoading) {
    isLoading = false;
    NProgress.done();
    if (loadingInstance) {
      loadingInstance.close();
    }
  }
}

export default service;

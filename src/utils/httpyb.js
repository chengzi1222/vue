import axios from "axios";
import store from "../store";
import {Loading} from "element-ui";
import NProgress from "nprogress"; // 进度条插件

// 全局表单提交方式
// 创建axios实例
const serviceTwo = axios.create({
  // baseURL: "http://saasapp.ybveg.com/", // api的base_url 
  // baseURL: "http://172.16.2.229:8081", //zhaofei 
  baseURL: "http://172.16.2.59:8081", //xiayu 
      // baseURL: "http://172.16.2.224:8081", //ouzhengdong 
  // baseURL: "http://172.16.2.24:8081", //zhangfawei 
  // timeout: 5000 // 请求超时时间
  // paramsSerializer: function (params) {
  //   return qs.stringify(params, { arrayFormat: 'brackets' })
  // },
  // transformRequest: [function (data) {  //  参数转换
  //   return qs.stringify(data);
  // }]
});

let loadingInstance;
const defaultLoading = { fullscreen: true };

// request拦截器
let doRefresh = false;
serviceTwo.interceptors.request.use((config) => {
  openLoading(config)
  return config;
}, error => {
  doRefresh = false;
  NProgress.done();
  console.log('error',error); // for debug
  Promise.reject(error);
})

// respone拦截器
serviceTwo.interceptors.response.use(
  response => {
    doRefresh = false;
    closeLoading()
    let data = response.data;
    return data;
  }, error => {
    doRefresh = false;
    closeLoading()
  });

function openLoading(config) {  // 打开loading
  NProgress.start();
  if (config.loading !== false) {
    loadingInstance = Loading.service(config.loadOption || defaultLoading);
  }
}

function closeLoading() { // 关闭 loading
  NProgress.done();
  if (loadingInstance) {
    loadingInstance.close();
  }
}

export default serviceTwo;

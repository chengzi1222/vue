import Vue from "vue";
import Router from "vue-router";
import routerMap from "./router";
import NProgress from "nprogress"; // 进度条插件
import * as storage from "utils/sessionStorage";
import store from "../store";

import whiteList from "./whitelist"; // 登白名单

Vue.use(Router);

const router = new Router({
  mode: 'history', //后端支持可开
  routes: routerMap,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
const LOGIN_KEY = 'is-login';

let isLogin = storage.getCookie(LOGIN_KEY) === 'true';

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  const data = storage.getData(to.path);
  if (data) {
    console.log("has router params set params and delete for localStorage ");
    let params = JSON.parse(data);
    storage.removeData(to.path);
    next({ path: to.path, name: to.name, params: params, query: to.query })
  }
  if (isLogin === true) { // 判断是否登录
    if (to.name === 'login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.getters.menus.length === 0 && to.name !== 'index.welcome') {
        store.dispatch('getMenus', storage.getData('system'))
      }
      if (!store.getters.user.id)
        store.dispatch('getInfo').then(() => {
          next();
        })
      else {
        next();
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next();
  } else {
    store.dispatch('logout', to)
    NProgress.done();
    // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  }
});

router.afterEach((route) => {
  NProgress.done(); // 结束Progress
  window.scrollTo(0, 0);//跳转另一页面是回到顶部
});

export function setLogin(flag) {
  isLogin = flag;
  storage.setCookie(LOGIN_KEY, flag);
}

export default router;

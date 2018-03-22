import * as base from "api/login";
import { getMenus } from 'api/welcome'
import { setData, getData, removeData } from 'utils/sessionStorage';
import router from "router";
import { setLogin } from 'router';
import store from "..";

const common = {
  state: {
    name: '源本',  //用户机构名字
    user: {},     // 用户信息
    auths: [],     // 用户权限
    menus: [],
    system: getData('system'),
    sidebar: '',
    paths: {},
    sideMenus: [],// 侧边菜单
    headerMenuId: 0,     // 头部导航菜单ID
    isCollapse: false,
    mapCenter: {}, // 地图中心
    filePath: '',
  },
  mutations: {
    SET_AUTHS: (state, auths) => {
      const str = JSON.stringify(auths)
      state.auths = JSON.parse(str)
    },
    SET_USER: (state, user) => state.user = user,
    SET_MENUS: (state, { menus, paths, system }) => {
      state.menus = menus || [];
      state.paths = paths || {};
      state.system = system || '';
    },
    SET_SIDEBAR_PATH: (state, path) => state.sidebar = path,
    SET_MAP_CENTER: (state, mapCenter) => state.mapCenter = mapCenter,
    SET_SIDEMENUS: (state, sideMenus) => state.sideMenus = sideMenus,
    SET_HEADER_MENU_ID: (state, headerMenuId) => state.headerMenuId = headerMenuId,
    SET_COLLAPSE: (state) => state.isCollapse = !state.isCollapse,
    SET_FILEPATH: (state, path) => state.filePath = path,
    SET_CLIENT_HEIGHT: (state, height) => state.clientHeight = height,
  },
  actions: {
    /**
     * 用户登录 ,登录成功 返回数据令牌 和 刷新令牌
     */
    login: ({ commit }, loginDto) => {
      return new Promise((resolve, reject) => {
        base.login(loginDto).then(results => {
          if (results.status) {
            setLogin(true);
            // 设置数据令牌到Cookie
            const data = results.data;
            resolve(results);
          } else {
            reject(results);
          }
        })
      });
    },
    /**
     * 前端登出
     */
    logout: ({ commit }, params) => {
      removeData('system');
      commit('SET_USER', {});
      commit('SET_MENUS',{})
      commit('SET_MAP_CENTER', {})
      base.logout().then((data) => {
        setLogin(false);
        router.push({ name: 'login', params })
      })
    },
    /**
     * 拉取当前登录用户信息,含有 用户基本信息, 菜单
     */
    getInfo: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        const auths = await base.getAuths();
        commit('SET_AUTHS', auths.data);
        const baseInfo = await base.getBase();
        commit('SET_MAP_CENTER', baseInfo.data.mapCenter)
        commit('SET_FILEPATH', baseInfo.data.filePath)
        window._base = baseInfo.data;

        base.getInfo().then(results => {
          if (results.status) {
            commit('SET_USER', results.data)
            resolve(results);
          } else {
            reject(results);
          }
        });
      })
    },
    getMenus: ({ commit }, label) => {
      const system = label;
      base.getMenus(system).then(results => {
        if (results.status) {
          let menus = [].concat(results.data);
          let i = 0, len = menus.length;
          const menuPath = {}
          while (i < len) {
            const menu = menus[i];
            if (menu.route) {
              const root = menu.path.split('.')[0]
              menuPath[menu.route] = root
            } else if (menu.children) {
              menus = menus.concat(menu.children);
              len = menus.length;
            }
            i++;
          }
          commit('SET_MENUS', { menus: results.data, paths: menuPath, system: label });
        }
      });
    },
    collapse: ({ commit }) => {
      commit("SET_COLLAPSE");
    },
  }
}

export default common;

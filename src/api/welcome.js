//欢迎页 api

import http from "../utils/http";
import httpyb from "../utils/httpyb";
import qs from "qs";


/**
 * 查菜单数据
 */
export function getMenus(label) {
    return http({
      method: 'get',
      url: '/env/base/menus/'+label,
    })
}

/**
 * 查菜单数据
 */
export function getLabelAuth() {
  return http({
    method: 'post',
    url: 'env/base/labels',
  })
}
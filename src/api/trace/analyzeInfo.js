import http from "utils/httpMarket";

/**
 *  获取溯源详情查询
 */
export function getInitSource(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/getInitSource',
    params
  });
}

/**
 *  获取所属区域
 */
export function getloadNextAreaInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/loadNextAreaInfo',
    params
  });
}

/**
 *  获取查询低溯源率区县
 */
export function getloadLowAreaInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/loadLowAreaInfo',
    params
  });
}


/**
 *  获取查询低溯源率市场
 */
export function getloadLowStreetInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/loadLowStreetInfo',
    params
  });
}

/**
 *  获取查询低溯源率主体
 */
export function getloadLowMarketInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/loadLowMarketInfo',
    params
  });
}

/**
 *  获取模糊搜索市场名称
 */
export function getloadMarketInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/finalAnalyse/loadMarketInfo',
    params
  });
}








/**
 *  获取溯源详情查询
 */
export function getLoadRetailInitSource(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/retailFinalAnalyse/loadRetailInitSource',
    params
  });
}

/**
 *  获取查询低溯源率区县
 */
export function getLoadLowSourceArea(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/retailFinalAnalyse/loadLowSourceArea',
    params
  });
}


/**
 *  获取查询低溯源率市场
 */
export function getLoadLowSourceMarket(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/retailFinalAnalyse/loadLowSourceMarket',
    params
  });
}

/**
 *  获取查询低溯源率主体
 */
export function getLoadLowSourceBiz(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/retailFinalAnalyse/loadLowSourceBiz',
    params
  });
}

/**
 *  获取农贸市场
 */
export function getLoadRetailMarketInfo(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/retailFinalAnalyse/loadRetailMarketInfo',
    params
  });
}
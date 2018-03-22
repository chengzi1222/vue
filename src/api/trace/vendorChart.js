import http from "utils/httpMarket";

/**
 *  获取商户信息
 */
export function getBiz(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/biz',
    params
  });
}

/**
 *  获取商户信息使用率
 */
export function getBizRate(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/biz/rate',
    params
  });
}

/**
 *  获取商户信息使用率
 */
export function getBizRateHistory(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/biz/rate/history',
    params
  });
}

/**
 *  获取商户溯源详细情况
 */
export function getBizDetail(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/biz/detail',
    params
  });
}



/**
 *  获取商户信息
 */
export function getRetailerBiz(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/retailer/biz',
    params
  });
}

/**
 *  获取商户信息使用率
 */
export function getRetailerBizRate(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/retailer/biz/rate',
    params
  });
}

/**
 *  获取商户信息使用率
 */
export function getRetailerBizRateHistory(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/retailer/biz/rate/history',
    params
  });
}

/**
 *  获取商户溯源详细情况
 */
export function getRetailerBizDetail(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/retailer/biz/detail',
    params
  });
}
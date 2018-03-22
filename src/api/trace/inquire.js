import http from "utils/httpMarket";

/**
 *  市级区县溯源纳入情况
 */
export function total(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/total?areaId='+params.areaId
  });
}
/**
 *  溯源纳入情况图表
 */
export function areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/total/areas?areaId='+params.areaId
  });
}
/**
 * 平台使用率
 */
export function use(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/use?areaId='+params.areaId+'&date='+params.date
  });
}

/**
 * 平台使用区域划分
 */
export function useareas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/use/areas?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 历史使用情况
 */
export function history(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/use/history?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 实时数据
 */
export function newdata(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/newdata?areaId='+params.areaId
  });
}
/**
 * 纳入总数+区
 */
export function dc(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc?areaId='+params.areaId
  });
}
/**
 * 纳入图表+区
 */
export function dc_areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/areas?areaId='+params.areaId
  });
}
/**
 * 低溯源预警top5+区
 */
export function dc_rate_low(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/rate/low?areaId='+params.areaId
  });
}
/**
 * 平台使用率+区
 */
export function dc_rate(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/rate?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 平台使用图表区域划分+区
 */
export function dc_rate_areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/rate/areas?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 历史使用情况+区
 */
export function dc_his(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/history?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 纳入总数+街
 */
export function ts(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts?areaId='+params.areaId
  });
}
/**
 * 纳入图表+街
 */
export function ts_areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts/areas?areaId='+params.areaId
  });
}
/**
 * 低溯源预警top5+街
 */
export function ts_rate_low(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts/rate/low?areaId='+params.areaId
  });
}
/**
 * 平台使用率+街
 */
export function ts_rate(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts/rate?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 平台使用图表区域划分+街
 */
export function ts_rate_areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts/rate/areas?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 历史使用情况+街
 */
export function ts_his(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/ts/history?areaId='+params.areaId+'&date='+params.date
  });
}

/**
 * 纳入总数+市场
 */
export function marketNumber(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/market?nodeId='+params.nodeId+'&nodeName='+params.nodeName
  });
}
/**
 * 预警+市场
 */
export function market_low(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/market/low?nodeId='+params.nodeId+'&nodeName='+params.nodeName
  });
}
/**
 * 平台使用率+市场
 */
export function market_rate(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/market/rate?nodeId='+params.nodeId+'&nodeName='+params.nodeName+'&date='+params.date
  });
}
/**
 * 平台使用图表区域划分+市场
 */
export function market_areas(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/market/areas?nodeId='+params.nodeId+'&nodeName='+params.nodeName+'&date='+params.date
  });
}
/**
 * 历史使用情况+市场
 */
export function market_his(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/market/history?nodeId='+params.nodeId+'&nodeName='+params.nodeName+'&date='+params.date
  });
}
/**
 * 区县排名
 */
export function rankNum(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/rank?areaId='+params.areaId+'&date='+params.date
  });
}
/**
 * 区县排名列表
 */
export function rankList(params) {
  return http({
    method: 'get',
    url: '/fstip/v1/stat/wholesaler/dc/rank/areas?areaId='+params.areaId+'&date='+params.date
  });
}







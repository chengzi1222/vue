import http from "utils/httpyb";

/**
 *  获取各类型账单
 */
export function postMain(params) {
  return http({
    method: 'post',
    url: 'govapi/bill/all',
    data: params
  });
}

/**
 *  获取学校分页
 */
export function postPage(d) {
  return http({
    method: 'post',
    url: 'govapi/bill/schoolpage',
    data: d
  });
}

/**
 *  某个采购商账单数据
 */
export function postDetail(d) {
  return http({
    method: 'post',
    url: 'govapi/bill/echart',
    data: d
  });
}

/**
 *  订单明细分页数据
 */
export function odpage(d) {
  return http({
    method: 'post',
    url: 'govapi/bill/odpage',
    data: d
  });
}


/**
 *  各类型消费前十数据
 */
export function pdtlist(d) {
  return http({
    method: 'post',
    url: 'govapi/bill/pdtlist',
    data: d
  });
}

/**
 *  订单明细折线图数据
 */
export function line(d) {
  return http({
    method: 'post',
    url: 'govapi/bill/linechart',
    data: d
  });
}

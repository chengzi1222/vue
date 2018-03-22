import http from "utils/httpyb";

/**
 *  获取商户信息
 */
export function getDlrinfo(d) {
  return http({
    method: 'post',
    url: 'govapi/trace/street/dlrinfo',
    params:d
  });
}

/**
 *  获取配送商主体信息
 */
export function getDlrhis(d) {
  return http({
    method: 'post',
    url: 'govapi/trace/street/dlrhis',
    params:d
  });
}


/**
 *  获取配送商主体信息
 */
export function getDlrsy(d) {
  return http({
    method: 'post',
    url: 'govapi/trace/street/dlrsy',
    params:d
  });
}


/**
 *  获取配送商主体信息
 */
export function getDlrr(d) {
  return http({
    method: 'post',
    url: '/govapi/trace/street/dlrr',
    params:d
  });
}
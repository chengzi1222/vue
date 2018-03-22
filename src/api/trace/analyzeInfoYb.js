import http from "utils/httpyb";

/**
 *  获取溯源详情查询
 */
export function getSuypage(params) {
  return http({
    method: 'post',
    url: 'govapi/query/suypage',
    data:params
  });
}

/**
 *  获取所属区域
 */
export function getArea(params) {
  return http({
    method: 'post',
    url: 'govapi/query/area',
    data:params
  });
}

/**
 *  获取查询低溯源率区县
 */
export function getAreapage(params) {
  return http({
    method: 'post',
    url: 'govapi/query/areapage',
    data:params
  });
}


/**
 *  获取查询低溯源率主体
 */
export function getSubjectpage(params) {
  return http({
    method: 'post',
    url: 'govapi/query/subjectpage',
    data:params
  });
}

/**
 *  获取检测不合格
 */
export function getDetecpage(params) {
  return http({
    method: 'post',
    url: 'govapi/query/detecpage',
    data:params
  });
}

import http from "utils/http";
import qs from "qs";

/**
 *  获取日常巡查计划列表
 * @param tableId
 */

export function gainPlanList() {
  return http({
    method: 'get',
    url: 'patrol/daily/getInfo'
  });
}


export function transferPlanList(pramas) {
  return http({
    method: 'post',
    url: 'patrol/daily/add',
    data:pramas
  });
}

export function getConfigs(patrolPlanDailyId) {
  return http({
    method: 'get',
    url: 'patrol/daily/getConfigs',
    params: {
      patrolPlanDailyId: patrolPlanDailyId
    }
  });
}

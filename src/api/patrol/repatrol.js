import http from "utils/http";
import qs from "qs";

/**
 * 复查整改列表条件分页
 */

export function page(searchMap) {
  return http({
    method: 'post',
    url: 'patrol/repatrol/page',
    data: searchMap
  })
}
/**
 * 获取当前登录用户的区域编码
 */
export function getAreaCode() {
  return http({
    method: 'get',
    url: 'patrol/repatrol/areaCode'
  })
}
/**
 * 获得处理结果列表
 */
export function getResultList() {
  return http({
    method: 'get',
    url: 'patrol/repatrol/resultList'
  })
}
/**
 * 获得处理方式列表
 */
export function getTreatList() {
  return http({
    method: 'get',
    url: 'patrol/repatrol/treatList'
  })
}

/*
 *  获取巡查要点表列表
 * @param params
 */
export function getRepatrolRecord(repatrolRecordId) {
  return http({
    method: 'post',
    url: 'patrol/repatrol/getRepatrolRecord',
    data: qs.stringify({"repatrolRecordId": repatrolRecordId})
  });
}

/**
 *  获取巡查要点表列表
 * @param params
 */
export function listRepatrolRecordContext(patrolRecordId, qual) {
  return http({
    method: 'post',
    url: 'patrol/repatrol/listRepatrolRecordContext',
    data: qs.stringify({"patrolRecordId": patrolRecordId, "qual": qual})
  });
}

/**
 *  获取巡查要点表列表
 * @param params
 */
export function getBasicInfo(entityId, type, planType) {
  return http({
    method: 'get',
    url: 'patrol/record/basicInfo?entityId=' + entityId + "&type=" + type + "&planType=" + planType
  });
}

/**
 *  获取巡查要点表列表
 * @param params
 */
export function update(params) {
  return http({
    method: 'post',
    url: 'patrol/repatrol/update',
    data: params
  });
}



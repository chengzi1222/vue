import http from "utils/http";
import qs from "qs";

/**
 *  获取字典分类列表
 * @param params
 */
export function pageManage(params) {
  return http({
    method: 'post',
    url: 'carema/manage/page',
    data: params
  });
}

/**
 *  获取字典分类列表
 * @param params
 */
export function pageShow(params) {
  return http({
    method: 'post',
    url: 'carema/show/page',
    data: params
  });
}

export function countManage() {
  return http({
    method: 'post',
    url: 'carema/manage/count'
  });
}

export function getEntity(entityId) {
  return http({
    method: 'post',
    url: 'carema/getEntity',
    data: qs.stringify({"entityId": entityId})
  });
}

export function updateCamera(camera) {
  return http({
    method: 'post',
    url: 'carema/update',
    data: camera
  });
}

export function updateCameraEntity(cameraEntity) {
  return http({
    method: 'post',
    url: 'carema/entity/update',
    data: cameraEntity
  });
}

export function getCameraListByEntityId(entityId, type) {
  return http({
    method: 'post',
    url: 'carema/listByEntityId',
    data: qs.stringify({"entityId": entityId, "type": type})
  });
}

export function delCamera(camera) {
  return http({
    method: 'post',
    url: 'carema/delete',
    data: camera
  });
}

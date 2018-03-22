import http from "utils/http";
import qs from "qs";

export function getCfda(cfda) {
  return http({
    // loading: true,
    // loadOption:{
    //   text:"加载中..."
    // },
    method: 'post',
    url: 'cfda/get',
    data: qs.stringify({cfda:cfda})
  });
}

/*export function getWorkCfda(workId) {
  return http({
    method: 'post',
    url: 'cfda/work/getWorkInfo',
    data: qs.stringify({workId:workId})
  });
}*/

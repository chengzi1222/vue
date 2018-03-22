<template>
  <baidu-map class="bm-view" :ak="baiduMapAk" :center="centerComputed" :zoom="zoomComputed" :min-zoom="zoomComputed-2" :map-click="false" :max-zoom="map.maxZoom" :scroll-wheel-zoom="map.scrollWheelZoom" @load="load" @zoomend="zoomend" @ready="handler">
    <entity-info-overlay :position="entityInfo.position" :active="entityInfo.active" :info="entityInfo.data" @mouseover.native="active = true" @mouseleave.native="active = false">
    </entity-info-overlay>

    <charts-box></charts-box>
    <search-box @show="searchShow"></search-box>

    <!-- <area-overlay :area-name="overlay.areaName" :num="overlay.num" :center="overlay.center"></area-overlay> -->
    <area-overlay v-for="item in overlays" :key="item.areaCode" :area-name="item.areaName" :num="item.num" :lng="item.lng" :lat="item.lat"></area-overlay>

    <entity-point v-for="item in points" :key="item.id" :active-id="activeId" @actived="entityActived" :point="item"></entity-point>

    <bm-view style="width: 100%; height:100%; flex: 1"></bm-view>
  </baidu-map>
</template>

<script>
import { BaiduMap, BmView } from "vue-baidu-map";
import { Message } from 'element-ui';
import config from "../../utils/config";
import EntityInfoOverlay from './map/EntityInfoOverlay';
import EntityPoint from './map/EntityPoint';
import AreaOverlay from './map/AareOverlay';
import * as mapApi from "../../api/sub/map";
import ChartsBox from "./map/ChartsBox";
import SearchBox from './map/SearchBox';

export default {
  data() {
    return {
      baiduMapAk: config.baiduMapAk,
      BMap: null,       // 百度地图
      instance: null,   // 地图实例
      overlays: [],  //
      points: [],
      entityInfo: {
        active: false,
        position: {},
        data: {},
      },
      activeId: "",
      activePoint: null,
      map: {
        zoom: 0,
        maxZoom: 19,
        minZoom: 8, //最小放大解绑
        center: "中国"
      },
      currentLevel: 0  //级别 参照AreaLevel 的 codeLevel
    };
  },
  mounted() {
    if (!document.createElement('canvas').getContext) {
      Message({ type: 'warning', message: '使用chrome、safari、IE9+以上浏览器才能正常访问此页面' });
    }
  },
  methods: {
    createOverlay(data, count) {
      const $this = this;
      const map = this.instance;
      const overlays = [];
      data.forEach(element => {
        if (element.lat && element.lng) {
          element.num = count[element.areaCode];
          overlays.push(element);
        }
      });
      this.overlays = overlays;
    },
    searchShow(point) {
      this.activeId = point.id;
      this.initCenter(point, 14);
    },
    entityActived(id) {
      this.activeId = id;
    },
    // 按区域code 搜索
    locationSearch(dataCode) {
      const level = this.calcLevel(this.instance.getZoom());
      this.currentLevel = level;
      if (this.currentLevel > 4) {
        mapApi.mapPoint(dataCode, {}).then(data => {
          this.overlays = []
          if (data.status) {
            this.points = data.data;
          }
        });
      } else {
        mapApi.mapCircle(level, dataCode).then(data => {
          this.points = [];
          if (data.status) {
            this.createOverlay(data.data.location, data.data.count);
          }
        });
      }
    },
    initCenter(point, zoom) {
      const BMap = this.BMap;
      const map = this.instance;
      const p = new BMap.Point(point.lng, point.lat);
      map.centerAndZoom(p, zoom);
    },
    load({ type, target, pixel, point, zoom }) {
      this.locationSearch(null, {});
    },
    zoomend(type, target) {
      if (this.map.zoom > 0) {
        this.locationSearch(null, {});
      }
      this.map.zoom = this.instance.getZoom();
    },
    calcLevel(zoom) {
      let codeLevel = 0;
      if (zoom > 13) {
        codeLevel = 5;
      } else if (zoom > 11 && zoom <= 13) {
        codeLevel = 4;
      } else if (zoom <= 11) {
        //11 只显示区
        codeLevel = 3;
      }
      return codeLevel;
    },
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.instance = map;
      map.enableScrollWheelZoom();
    }
  },
  computed: {
    centerComputed() {
      this.currentLevel = this.$store.getters.mapCenter.level;
      return this.$store.getters.mapCenter.center;
    },
    zoomComputed() {
      return this.$store.getters.mapCenter.zoom;
    }
  },
  components: {
    BaiduMap, BmView, ChartsBox, SearchBox, EntityInfoOverlay,
    AreaOverlay, EntityPoint
  }
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

<style>
.bm-overlay {
  position: absolute;
}
</style>


<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import { setData } from './utils/sessionStorage';
import { mapGetters } from 'vuex'
import config from './utils/config';

export default {
  created() {
    const $this = this;
    window.onbeforeunload = () => {
      let data = JSON.stringify($this.$route.params)
      if (data != "{}") {
        setData($this.$route.path, data)
      }
    }
  },
  mounted() {
    // 获取服务器时间
    // const $this = this;
    // this.$store.dispatch('serverTime')
    // setInterval(() => {  //每5分钟获取一次
    //   this.$store.dispatch('serverTime')
    // }, config.getServerTime);\
    const $this = this;
    window.onresize = ()=>{
      let clientHeight = 0;
      let clientWidth = 0;
      if (document.getElementsByClassName("app-main").length > 0){
        clientHeight = document.getElementsByClassName("app-main")[0].clientHeight;
        clientWidth = document.getElementsByClassName("app-main")[0].clientWidth;
      }
      $this.$store.dispatch("setClientHeight", clientHeight);
      $this.$store.dispatch("setClientWidth", clientWidth);
    }
  },
  methods: {
    // refreshPage(event) {

    // }
  },
  name: 'app',
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    height: 100%;
}

body {
  margin: 0px;
}

/* 滚动条样式  */
.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(48, 121, 244, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(48, 121, 244, 0.5);
}
</style>

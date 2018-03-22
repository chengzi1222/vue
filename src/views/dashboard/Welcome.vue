<template>
  <div class="content">
    <h2>您好，欢迎使用智慧食安</h2>
    <h3>请选择你要进入的系统:</h3>
    <div class="select-box">
      <div @click="handleClick(item,index)" class="select-item" v-for="(item,index) in labels" :class="{'disabled':item.isDisabled,'active':item.value===currentSys}" :key="item.value">
        <i class="icon iconfont" :class="item.icon"></i>
        <span>{{item.label}}</span>
      </div>
    </div>
    <img class="imgo" src="../../assets/img/welcomeBg.png" alt="" />
    <img class="imgt" src="../../assets/img/texture_x2.png" alt="" />
  </div>
</template>

<script>
import { getEnums } from 'api/common.js';
import * as base from 'api/login.js';
import * as storage from "utils/sessionStorage";
import bus from 'utils/eventBus';

export default {
  async mounted() {
    // 如果登录为超级管理
    // if(this.$store.state.common.user.userType === 'SYSADMIN'){
    //  	this.$router.push('/dashboard');
    // }
    let { data } = await base.getLabelAuth();

    getEnums(['com.ybveg.govx.enums.LabelEnum'], false).then(res => {
      const d = res.data;
      // 清空labels
      this.labels.splice(0, this.labels.length)

      for (let item of d) {
        let obj = {
          label: item.name,
          value: item.key,
          icon: this.config[item.key].icon,
          isDisabled: !data.includes(item.key)
        }

        this.labels.push(obj)
      }
    })

    //如果有选中的设置改选中项为激活状态
    const label = storage.getData("system");
    if (label) {
      this.currentSys = label;
    }
  },
  data() {
    return {
      config: {
        FOOD: { icon: "icon-food" },
        MEDICINE: { icon: "icon-drug" },
        MEDICAL_EQUIPMENT: { icon: "icon-medical" },
        COSMETIC: { icon: "icon-cosmetic" },
        SPECIAL_EQUIPMENT: { icon: "icon-devices" },
        BIG_DATA: { icon: "icon-transaction" },
        SYSTEM: { icon: "icon-system" },
      },
      currentSys: '',//当前系统
      labels: []
    }
  },
  methods: {
    handleClick(item, index) {
      //如果当前为禁用，点击不做任何操作
      if (item.isDisabled) {
        return
      }
      this.currentSys = item.value;
      storage.setData("system", item.value);
      this.$store.dispatch('getMenus', item.value);
      //点击加载菜单
      // this.$store.dispatch("initHeaderMenu", { route: this.$route, label: item.value });
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style lang="scss" scoped>
$disabled_color: #d1d3d6;
$normal_color: #767778;
$active_color: #0db5ef;

.content {
  text-align: center;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: -1;
  .select-box {
    font-size: 20px;
    width: 520px;
    margin: 0 auto;
    margin-top: 50px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .select-item {
      margin-bottom: 20px;
      cursor: pointer;
      width: 160px;
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
      background: transparent;
      border: 1px solid $normal_color;
      color: $normal_color;
      &:hover {
        border: 1px solid $active_color;
        // color: $active_color;
        .icon {
          color: $active_color;
        }
      }
      .icon {
        margin: 0 18px;
        color: $normal_color;
        font-size: 20px;
      }
    }
    .disabled {
      cursor: not-allowed;
      border: 1px solid $disabled_color !important;
      color: $disabled_color !important;
      .icon {
        color: $disabled_color !important;
      }
    }
    .active {
      border: 1px solid $active_color;
      color: $normal_color;
      .icon {
        color: $active_color;
      }
    }
  }
  h2 {
    font-size: 48px;
    color: #393939;
    font-weight: normal;
    margin-top: 110px;
  }
  h3 {
    font-size: 24px;
    color: #a2aab6;
    font-weight: normal;
    margin-top: 20px;
  }
  img {
    position: absolute;
  }
  .imgo {
    width: 1200px;
    height: 450px;
    bottom: 0px;
    left: 50%;
    margin-left: -600px;
    z-index: -1;
  }
  .imgt {
    width: 100%;
    height: 626px;
    bottom: 0;
    left: 0;
    z-index: -2;
  }
}
</style>



<template>
  <div class="search-box">
    <div class="head">
      <div class="input-box">
        <el-input placeholder="请输入主体名称" v-model="value.search" @keyup.enter.native="search">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
      </div>

      <div class="select-box">
        <el-select v-model="value.area" v-if="area.length" clearable placeholder="请选择辖区">
          <el-option v-for="item in area" :key="item.areaCode" :label="item.deptName" :value="item.areaCode">
          </el-option>
        </el-select>
        <el-select v-model="value.type" placeholder="请选择主体类型" clearable>
          <el-option v-for="item in types" :key="item.key" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- <div class="foot">
      <i class="el-icon-arrow-up"></i>
    </div> -->
    <div class="body">
      <p class="result">筛选结果共{{ page.total }}家备案主体</p>
      <div class="scroll" v-bar>
        <div>
          <div class="item" v-for="item in page.list" :key="item.id">
            <p class="title" v-on:click="show(item)">{{ item.entityName }}</p>
            <p>{{ item.spaceAddr }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="foot">
      <i class="el-icon-arrow-up" />
    </div> -->
  </div>
</template>

<script>
import * as mapApi from "api/sub/map";
import { getEnums } from 'api/common';
import { Message } from 'element-ui';

export default {
  name: 'search-box',
  data() {
    return {
      area: [],
      types: [],
      value: {
        area: "",
        type: "",
        search: "",
      },
      page: {
        total: 0
      }
    }
  },
  mounted() {
    mapApi.findDept().then((data) => {
      this.area = data.data || [];
    });
    getEnums(['com.ybveg.govx.enums.cfda.CfdaTypeEnum', 'com.ybveg.govx.enums.SubTypeEnum']).then((data) => {
      this.types = data.data || [];
    });
    this.search();
  },
  methods: {
    search() {
      mapApi.pageSearch(this.value, 0, 10).then((data) => {
        this.page = data.data
      })
    },
    show(item) {
      if (item.lat && item.lng) {
        this.$emit('show', {
          id: item.id,
          lat: item.lat,
          lng: item.lng,
        }, true);
      } else {
        Message({ type: 'warning', message: `${item.entityName},无法在地图上显示,此主体地理位置信息不全!` });
      }
    },
  },
  watch: {
    'value.area': function () {
      this.search()
    },
    'value.type': function () {
      this.search()
    }
  }
}
</script>


<style lang="scss" scoped>
.search-box {
  position: absolute;
  left: 20px;
  top: calc(40% + 40px);
  width: 25%;
  min-width: 340px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
  display: flex;
  flex-direction: column;
  .head {
    .el-input__inner {
      background-color: #3d3e44;
      border-color: transparent;
    }
    .select-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
  }
  .body {
    flex: 1;
    padding-left: 10px;
    color: #a2aab6;
    font-size: 12px;
    .result {
      padding: 10px;
    }
    .scroll {
      height: 180px;
      .item {
        padding: 5px;
        font-size: 14px;
        .title {
          cursor: pointer;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
}

.foot {
  text-align: center;
  color: #fff;
  background: #6d6f73;
}
</style>
<style>
.search-box .input-box .el-input__icon {
  background: #0db5ef;
  color: #ffffff;
}
.search-box .el-input__inner {
  background-color: #3d3e44;
  border-color: transparent;
  color: #a2aab6;
}
</style>

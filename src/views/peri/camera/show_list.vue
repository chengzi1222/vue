<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>阳光厨房</span>
    </div>
    <div class="ipt-btn-box" style="justify-content: end;">
      <el-input placeholder="请输入主体名称" class="w250 seekIpt" v-model="condition.search" @keyup.enter.native="handleIconClick">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
      </el-input>

      <select-area-grid class="selectHeight" placeholder="分管网格" @change="deptChange"></select-area-grid>

    </div>
    <ul class="ulbox">
      <li v-for="item in tableData" :key="item.no" class="maR20">
        <div class="imgbox" @click="goDetail(item);" style="cursor: pointer">
          <div style="width:100%;position:relative;">
            <!--<iframe style='width:100%;height:200px;' frameborder='0' scrolling='no'-->
                    <!--v-bind:src="'http://shuidi.huajiao.com/pc/player_autosize.html?sn=' + item.no +'&autostart=true'">-->
            <!--</iframe>-->
            <img :src="item.imgAddr" style="width:100%;height:200px;"/>
            <div class="shade">
              <p>所属：{{item.deptName}}</p>
              <img :src="require('assets/img/play_icon.png')" class="movePoin">
            </div>
            <div class="line"></div>
          </div>
        </div>
        <h2>{{item.entityName}}</h2>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <div class="pagination-box">
      <el-pagination background @size-change="pageSizeChange" @current-change="pagecCurrentChange"
                     :current-page="page.pageNum" :page-sizes="[5, 10, 15]" :page-size="page.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>

      <!--<el-pagination background :page-sizes="[12, 16, 20]" :page-size="1000" layout="sizes, prev, pager, next" :total="50"></el-pagination>-->
    </div>
  </div>
</template>

<script>
  import {pageShow} from "api/peri/camera";
  import {getdeptGrid} from "api/common";
  import SelectAreaGrid from 'components/common/SelectAreaGrid';

  export default {
    async mounted() {
      this.tabSearch();
    },
    methods: {
      goDetail(row) {
        this.$router.push({name: 'camera.detail', query: {id: row.entityId}});
      },
      deptChange(deptId) {
        this.condition.dept = !deptId ? "" : deptId[deptId.length - 1];
        this.tabSearch();
      },
      handleIconClick() { //搜索框按钮点击搜索
        this.a = !this.a;
        this.tabSearch();
      },
      async searchPage() {
        let params = this.condition;
        var formData = {
          params: params,
          num: this.page.pageNum,
          size: this.page.pageSize,
        };
        pageShow(formData).then((result) => {
          result.data.pageNum = result.data.pageNum == 0 ? 1 : result.data.pageNum;
          this.page = result.data;
          this.tableData = result.data.list;
        });

      },
      pagecCurrentChange(num) {
        this.page.pageNum = num;
        this.searchPage();
      },
      pageSizeChange(size) {
        this.page.pageSize = size;
        this.searchPage();
      },
      tabSearch() {
        this.page.pageNum = 1;
        this.searchPage();
      },
    },
    components: {SelectAreaGrid},
    data() {
      return {
        value: '',
        tableData: [],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        condition: {
          //网格
          dept: "",
          search: "",
          sort: "DESC",
        },
      }
    }
  }
</script>

<style scoped>
  .ipt-btn-box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .pagination-box {
    text-align: right;
    margin-top: 20px;
  }

  .ulbox {
    overflow: hidden;
  }

  .ulbox li {
    float: left;
    width: 250px;
    margin-top: 20px;
  }

  .ulbox li img {
    width: 100%;
  }

  .ulbox li:nth-child(5n + 0) {
    margin-right: 0;
  }

  .ulbox li h2 {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #393939;
    margin-top: 5px;
  }

  .ulbox li p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #a2aab6;
  }

  .ulbox li .imgbox {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }

  .ulbox li .imgbox .line {
    position: absolute;
    background: #000;
    bottom: 0;
    left: 0;
    height: 35px;
    width: 100%;
  }

  .shade {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 6px;
    border-radius: 8px;
    right: 0;
    background: rgba(9, 9, 9, 0);
    transition: all 0.5s;
    opacity: 0;
  }

  .imgbox:hover .shade {
    background: rgba(9, 9, 9, 0.35);
    opacity: 1;
  }

  .imgbox .shade p {
    color: #fff;
    position: absolute;
    bottom: 0px;
    left: 15px;
    z-index: 999;
  }

  .imgbox .shade img {
    width: 44px;
    height: 44px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -22px;
    margin-left: -22px;
  }

  .el-pagination .el-pagination__sizes {
    display: none;
  }
</style>

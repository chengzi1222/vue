<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>工单审核流程</span>
    </div>
    <ul class="tab-box">
      <li v-for="(item,index) in lists" @click="liClick($event, item.state)" :key="item.state" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <div @click="liClick($event, item.state)" :data-index='index'>{{item.tabName}}
          <span>
            <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
          </span>
        </div>
      </li>
      <li class="tab-bott"></li>
    </ul>

    <div class="ipt-btn-box" style="justify-content: end;">
      <el-input placeholder="许可证号、名称、工单号"   class="w250 seekIpt" v-model="condition.search" @keyup.enter.native="handleIconClick">
           <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
      </el-input>

      <el-select clearable class="selectHeight" v-model="condition.natureType" placeholder="证照类型" @change="tabSearch">
        <el-option v-for="item in natureTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="selectHeight" v-model="condition.subType" placeholder="经营类型" @change="tabSearch">
        <el-option v-for="item in subTypeList" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-select>

      <el-cascader class="selectHeight" :clearable="true" placeholder="分管网格" :options="deptsOptions.options" :props="deptsOptions.props" :change-on-select="true"
                   :show-all-levels="false"  @change="deptChange">
      </el-cascader>

      <el-select clearable class="selectHeight" v-model="condition.workType" placeholder="业务类型" @change="tabSearch">
        <el-option v-for="item in workTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>
    </div>
    <div class="tabOffTop50">
      <el-table :data="tableData" @sort-change="sortChange" class="table-div" v-show="workState != 'ALREADY_REJECT'">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workNo" min-width="100" label="工单号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityName" min-width="90" label="主体名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="licence" min-width="90" label="许可证号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="natureTypeLabel" min-width="120" label="证照类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="subTypeLabel" min-width="100" label="经营类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" min-width="140" label="分管网格"></el-table-column>
        <el-table-column show-overflow-tooltip prop="updateTime" min-width="110" label="更新时间" sortable='custom'></el-table-column>
        <el-table-column show-overflow-tooltip prop="workTypeLabel" min-width="70" label="业务类型"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" v-if="scope.row.state == 'PEND_REVIEW'" @click="reviewClick(scope.row,true)"
               v-auth="'biz.pb|func.review,biz.cb|func.review,biz.rb|func.review'" class="operate-a">审核</a>
            <a href="javascript:;" v-if="scope.row.state != 'PEND_REVIEW'" @click="reviewClick(scope.row,false)" class="operate-a">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" @sort-change="sortChange" class="table-div" v-show="workState == 'ALREADY_REJECT'">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workNo" min-width="100" label="工单号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityName" min-width="90" label="主体名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="licence" min-width="90" label="许可证号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="natureTypeLabel" min-width="120" label="证照类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="subTypeLabel" min-width="100" label="经营类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" min-width="140" label="分管网格"></el-table-column>
        <el-table-column show-overflow-tooltip prop="updateTime" min-width="110" label="驳回时间" sortable='custom'></el-table-column>
        <el-table-column show-overflow-tooltip prop="workTypeLabel" min-width="70" label="业务类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="backReason" min-width="70" label="驳回原因"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" v-if="scope.row.state != 'PEND_REVIEW'" @click="reviewClick(scope.row,false)" class="operate-a">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination background @size-change="pageSizeChange"
                       @current-change="pagecCurrentChange"
                       :current-page="page.pageNum"
                       :page-sizes="[10, 20, 30, 40,50]"
                       :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { pageWork, countWork, listWorkType} from "api/sub/work";
import { listNatureType } from "api/sub/sub";
import {listDictUserItemByDictCode} from 'api/common';
import {reviewTabOpen} from "views/sub/info/infoFieldChange";
import {
  getdeptGrid
} from "api/common";;

function getEntityTypeStr(entityType) {
  let entityTypeStr = '';
  if(entityType === 'product') {
    entityTypeStr = '生产主体';
  } else if(entityType === 'circulation') {
    entityTypeStr = '流通主体';
  } else if(entityType === 'management') {
    entityTypeStr = '经营主体';
  }
  return entityTypeStr;
}

export default {
  async beforeRouteUpdate(to, from, next) {
    this.entityType = to.params.entityType;
    this.entityTypeStr = getEntityTypeStr(this.entityType);
    this.tabSearch();

    await countWork(this.entityType).then((r) => {
      let data = r.data;
      this.lists =
        [{ tabName: '待审核', state: 'PEND_REVIEW', num: data.PEND_REVIEW },
        { tabName: '已归档', state: 'ALREADY_FILE', num: data.ALREADY_FILE },
        { tabName: '已驳回', state: 'ALREADY_REJECT', num: data.ALREADY_REJECT}]
      ;
    });
    Object.assign(this.$data.condition, this.$options.data().condition)   //切换tab 重置condition

    if(this.entityType === 'product') {
      listDictUserItemByDictCode('PB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if(this.entityType === 'circulation') {
      listDictUserItemByDictCode('CB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if(this.entityType === 'restaurant') {
      listDictUserItemByDictCode('RB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    }

    next();
  },

  async mounted() {
    this.entityType = this.$route.params.entityType;

    await countWork(this.entityType).then((r) => {
      let data = r.data;
      this.lists =
        [{ tabName: '待审核', state: 'PEND_REVIEW', num: data.PEND_REVIEW },
        { tabName: '已归档', state: 'ALREADY_FILE', num: data.ALREADY_FILE },
        { tabName: '已驳回', state: 'ALREADY_REJECT', num: data.ALREADY_REJECT }]
    });
    this.tabSearch();

    listNatureType().then((result) => {
      this.natureTypeList = result.data;
    });

    if(this.entityType === 'product') {
      listDictUserItemByDictCode('PB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if(this.entityType === 'circulation') {
      listDictUserItemByDictCode('CB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if(this.entityType === 'restaurant') {
      listDictUserItemByDictCode('RB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    }

    getdeptGrid().then((result) => {
      this.deptsOptions.options = result.data;
    });
    listWorkType().then((result) => {
      this.workTypeList = result.data;
    });

  },
  methods: {
    liClick(e, state) {   //点击导航切换样式
      var me = this;
      me.defaultIndex = e.target.dataset.index;
      this.workState = state;
      Object.assign(this.$data.condition, this.$options.data().condition)   //切换tab 重置condition
      this.condition.workState = state;
      this.tabSearch();
    },

    sortChange(column){
      if(column.order == 'ascending'){
        this.condition.sort = 'ASC';
      }
      if(column.order == 'descending'){
        this.condition.sort = 'DESC'
      }
      this.tabSearch();
    },
    reviewClick(row,review){
      this.$router.push({name: "review",params:{
        id: row.id,
        entityId:row.entityId,
        natureType: row.natureTypeLabel,
        entityName: row.entityName,
        workType: row.workTypeLabel,
        type:row.type,
        review:review,
        resultRouter:'/sub/work/' + this.entityType + '/list'
      }});
    },
    deptChange(deptId){
      this.condition.dept = !deptId ? "" : deptId[deptId.length-1];
      this.tabSearch();
    },
    handleIconClick() { //搜索框按钮点击搜索
      this.a = !this.a;
      this.tabSearch();
    },
    async searchPage() {
      let params = this.condition;
      var formData = {
        entityType: this.entityType,
        params: params,
        num: this.page.pageNum,
        size: this.page.pageSize,
      };
      pageWork(formData).then((result) => {
        result.data.pageNum = result.data.pageNum == 0 ? 1 : result.data.pageNum ;
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
    tabSearch(){
      this.page.pageNum = 1;
      this.searchPage();
    },

  },
  components: {},
  data() {
    return {
      a: false,
      defaultIndex: 0,
      lists: [],

      workState: '',

      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      deptsOptions: {
        props: {
          label: 'deptName',
          value: 'areaCode'
        },
        options: []
      },
      natureTypeList: [],
      subTypeList: [],
      workTypeList: [],

      condition: {
        workState: 'PEND_REVIEW',
        dept: "", //网格
        natureType : "", //主体类型
        subType : "",  //经营类型
        workType: "",  //主体状态
        search: "",   //搜索
        sort : "DESC"
      },
      dictTypeData: {}
    }
  }
}
</script>

<style scoped>
  .tab-box {
    width: 100%;
    display: flex;
    position: relative;
  }

  .li-bott span {
    color: #393939;
  }

  .tab-box .tab-bott {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #EBF1F5;
  }

  .ipt-btn-box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .pagination-box {
    text-align: right;
    margin-top: 20px;
  }

  .tab-box li {
    width: 110px;
    height: 50px;
    line-height: 50px;
    margin-right: 30px;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #9A9A9A;
    text-align: center;
  }

  .tab-box a {
    color: #9A9A9A;
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .tab-box a span {
    float: right;
  }

  .tab-box .li-bott {
    border-bottom: 2px solid #0DB5EF;
    z-index: 666;
    position: relative;
  }

  .li-bott a {
    color: #393939;
  }


  .tab-box {
    width: 100%;
    display: flex;
    position: relative;
  }

  .tab-box li {
    width: 110px;
    height: 50px;
    line-height: 50px;
    margin-right: 30px;

    font-size: 15px;
    color: #9A9A9A;
    text-align: center;
  }

  .li-bott span {
    color: #393939;
  }

  .tab-box .tab-bott {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #EBF1F5;
  }

  .ipt-btn-box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .pagination-box {
    text-align: right;
    margin-top: 20px;
  }

  .table-div {
    width: 100%;
    text-align: center;
  }

  .operate-a {
    color: #1787AD;
  }

  table tr td:last-child .cell a {
    border-right: 1px solid #ccc;
    padding-right: 5px;
  }
  table tr td:last-child .cell a:last-child {
    border-right: none;
    padding-right: 0px;
  }

</style>

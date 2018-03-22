<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>{{entityTypeStr}}档案</span>
    </div>
    <div class="ipt-btn-box" style="justify-content: end;">
      <el-input placeholder="备案号、名称、经营者、联系方式" class="w250 seekIpt" v-model="condition.search" @keyup.enter.native="handleIconClick">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
      </el-input>

      <el-select clearable class="selectHeight" v-model="condition.natureType" placeholder="请选择证照类型" @change="searchTab">
        <el-option v-for="item in natureTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select v-if="entityType == 'product'" clearable class="selectHeight" v-model="condition.subType" placeholder="请选择许可证类型" @change="searchTab">
        <el-option v-for="item in subTypeList" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-select>

      <select-area-grid class="selectHeight" placeholder="分管网格" @change="deptChange"></select-area-grid>

      <el-select clearable class="selectHeight" v-model="condition.manageState" placeholder="请选择营业状态" @change="searchTab">
        <el-option v-for="item in manageStateList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="selectHeight" v-model="condition.entityState" placeholder="请选择主体状态" @change="searchTab">
        <el-option v-for="item in entityStateList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="selectHeight" v-model="condition.state" placeholder="请选择操作状态" @change="searchTab">
        <el-option v-for="item in stateList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>

    </div>
    <div class="tabOffTop120">
      <el-table :cell-class-name="handleStyle" :data="tableData" @sort-change="sortChange" class="table-div"  :class="shadowShow?'shadowNo':''" :key="maxheight" :max-height="maxheight">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityName" min-width="90" label="主体名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="licence" min-width="120" label="许可备案号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="natureTypeLabel" min-width="100" label="证照性质"></el-table-column>
        <el-table-column v-if="entityType == 'product'" show-overflow-tooltip prop="subTypeLabel" min-width="100" label="许可证类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="corpName" min-width="120" label="负责人"></el-table-column>
        <el-table-column show-overflow-tooltip prop="mobile" min-width="140" label="联系方式"></el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" min-width="140" label="分管网格"></el-table-column>
        <el-table-column show-overflow-tooltip prop="optTime" min-width="110" label="更新时间" sortable='custom'></el-table-column>
        <el-table-column show-overflow-tooltip prop="manageStateLabel" min-width="100" label="营业状态"></el-table-column>
        <el-table-column  show-overflow-tooltip  min-width="100" label="主体状态">
          <template slot-scope="scope">
            <div style="position: relative;overflow: visible;">
              <span v-if="scope.row.entityLabel != 'NONE'" style="color:red;position: absolute;right:-2px;top:-8px;border:1px solid red;font-size: 10px;font-weight: bolder">{{scope.row.entityLabelStr}}</span>
              <span>{{scope.row.licStateLabel}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stateLabel" min-width="100" label="操作状态"></el-table-column>
        <el-table-column label="操作" min-width="250"  fixed="right">
          <template slot-scope="scope">
            <a href="javascript:;" @click="view(scope.row)" class="operate-a">详情</a>
            <a href="javascript:;" v-auth="'biz.pb|func.change,biz.cb|func.change,biz.rb|func.change'" v-if="scope.row.workState != 'CHANGING'" @click="change(scope.row)" class="operate-a">变动</a>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination-box">
        <el-pagination background @size-change="pageSizeChange" @current-change="pagecCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 40,50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { listDictUserItemByDictCode, getdeptGrid ,getEnums} from 'api/common';
import { pageSub, listNatureType, listStateType } from "api/sub/sub";
import SelectAreaGrid from 'components/common/SelectAreaGrid';
import {calcTableHeight,boxShadow} from 'utils/utils';

function getEntityTypeStr(entityType) {
  let entityTypeStr = '';
  if (entityType === 'product') {
    entityTypeStr = '生产主体';
  } else if (entityType === 'circulation') {
    entityTypeStr = '流通主体';
  } else if (entityType === 'restaurant') {
    entityTypeStr = '餐饮主体';
  }
  return entityTypeStr;
}

export default {
  beforeRouteUpdate(to, from, next) {
    this.entityType = to.params.entityType;
    this.entityTypeStr = getEntityTypeStr(this.entityType);
    this.searchTab()

    if (this.entityType === 'product') {
      listDictUserItemByDictCode('PB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if (this.entityType === 'circulation') {
      listDictUserItemByDictCode('CB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if (this.entityType === 'restaurant') {
      listDictUserItemByDictCode('RB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    }

    next();
  },
  mounted() {
    this.entityType = this.$route.params.entityType;
    this.entityTypeStr = getEntityTypeStr(this.entityType);

    this.searchTab();

    listNatureType().then((result) => {
      this.natureTypeList = result.data;
    });

    if (this.entityType === 'product') {
      listDictUserItemByDictCode('PB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if (this.entityType === 'circulation') {
      listDictUserItemByDictCode('CB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    } else if (this.entityType === 'restaurant') {
      listDictUserItemByDictCode('RB_SUB').then((result) => {
        this.subTypeList = result.data;
      });
    }

    //获取经营状态
    getEnums(['com.ybveg.govx.enums.ManageStateEnum'],false).then((r) => {
      this.manageStateList = r.data
    });

    //获取主体状态
    getEnums(['com.ybveg.govx.enums.LicenceStateEnum'],false).then((r) => {
      r.data.push({name: '即将过期', key:'none'});
      r.data.forEach(item=>{
        this.entityStateList.push(item)
      })
    });

    listStateType().then((result) => {
      this.stateList = result.data;
      this.stateList = this.stateList.filter(function (i) { return i.key != 'FIRST' });
    });

    this.maxheight = calcTableHeight(this.tableHeight,190);
    setTimeout(()=>{
        this.shadowShow = boxShadow(document.getElementsByClassName("el-table")[0].clientWidth,document.getElementsByClassName("el-table__body")[0].clientWidth);
    },0)
  },
  methods: {
    handleStyle(item){
        if(item.column.label === "主体状态"){
          return 'licStateLabel'
        }
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.condition.sort = 'ASC';
      }
      if (column.order == 'descending') {
        this.condition.sort = 'DESC'
      }
      this.searchTab();
    },
    view(row) {
      this.$router.push({
        name: 'subInfoIndex', params: {
          entityId: row.id,
          resultRouter: '/sub/' + this.entityType,
        }
      });
    },
    deptChange(deptId) {
      this.condition.dept = !deptId ? "" : deptId[deptId.length - 1];
      this.searchTab();
    },
    handleIconClick() {	//搜索框按钮点击搜索
      this.a = !this.a;
      this.searchTab();
    },
    async searchPage() {
      let params = this.condition;
      var formData = {
        params: params,
        entityType: this.entityType,
        num: this.page.pageNum,
        size: this.page.pageSize
      };
      pageSub(formData).then((result) => {
        result.data.pageNum = result.data.pageNum == 0 ? 1 : result.data.pageNum;
        this.page = result.data;
        this.tableData = result.data.list;
      });

    },
    searchTab() {
      this.page.pageNum = 1;
      this.searchPage();
    },
    pagecCurrentChange(num) {
      this.page.pageNum = num;
      this.searchPage();
    },
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.searchPage();
    },
    change(row) {
      this.$router.push({
        name: 'change', params: {
          entityId: row.id,
          type: row.entityTypeLabel,
          entityName: row.entityName,
          natureTypeLabel: row.natureTypeLabel,
          natureType: row.natureType,
          resultRouter: '/sub/' + row.entityType.toLowerCase(),
        }
      });
    }
  },
  components: { SelectAreaGrid },
  computed: {
    tableHeight (){
        return this.$store.state.layout.tableHeight;
    },
    tableWidth (){
        return this.$store.state.layout.tableWidth;
    }
  },
  watch:{
    tableHeight(){
        this.maxheight = calcTableHeight(this.tableHeight,190);
    },
    tableWidth(){
        setTimeout(()=>{
           this.shadowShow = boxShadow(document.getElementsByClassName("el-table")[0].clientWidth,document.getElementsByClassName("el-table__body")[0].clientWidth);
        },0)
    }
  },
  data() {
    return {
      entityType: "",
      entityTypeStr: "",
      maxheight:0,
      shadowShow:false,
      a: false,
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      natureTypeList: [],
      subTypeList: [],
      stateList: [],
      manageStateList: [],//营业状态
      entityStateList: [],//主体状态
      condition: {
        //网格
        dept: "",
        //证照类型
        natureType: "",
        //经营类型
        subType: "",
        //操作状态
        state: "",
        //营业状态
        manageState: "",
        //主体类型
        entityState: "",
        //搜索
        search: "",
        sort: "DESC",
      },
      dictTypeData: {}
    }
  }
}
</script>

<style>
.licStateLabel .cell{
  overflow: visible;
}
</style>

<style scoped>
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
  color: #9a9a9a;
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
  background: #ebf1f5;
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
  color: #1787ad;
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

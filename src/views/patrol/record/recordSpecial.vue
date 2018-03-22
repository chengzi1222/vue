<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>专项巡查记录</span>
    </div>
    <div class="ipt-btn-box" >
      <el-input style="vertical-align:top;" placeholder="主体名称、巡查人员" class="w200 mr20 seekIpt" v-model="search.select"
                @keyup.enter.native="handleIconClick">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
      </el-input>
      <el-date-picker class="sleq w150" type="date" v-model="search.startDate" placeholder="起始时间"></el-date-picker>至<el-date-picker @change="handleIconClick" v-model="search.endDate" class="slez w150" type="date" placeholder="截止时间"></el-date-picker>
      <!-- <el-cascader class="selectHeight w150" :clearable="true" placeholder="分管网格"
                     :options="deptsOptions.options" :props="deptsOptions.props"
                     :change-on-select="true"
                     :show-all-levels="false" @change="deptChange">
      </el-cascader> -->
      <select-area-grid  class="selectHeight w150"  placeholder="分管网格"  @change="deptChange"></select-area-grid>
      <el-select clearable class="selectHeight w250" v-model="search.specialPlanIds" multiple collapse-tags
                 placeholder="巡查计划（全部）"
                 @change="handleIconClick">
        <el-option v-for="item in specialPlanList" :key="item.id" :label="item.planName" :value="item.id">
        </el-option>
      </el-select>
      <i :class="down?'el-icon-caret-top':'el-icon-caret-bottom'" class="down" @click="downSeleBox"></i>
      <el-button class="selectHeight floatR" type="primary" v-auth="'patrol.record|func.add'"
                 @click="add"><i style="margin-right: 5px;font-weight: 700;color: #fff;" class="el-icon-plus"></i>添加记录
      </el-button>
    </div>
    <div  class="ipt-btn-box" style="padding-left: 200px;" v-if="down">
        <enum-select  v-model="search.entityType" multiple placeholder="主体类型" @change="handleIconClick"  enum="com.ybveg.govx.enums.EntityEnum"></enum-select>
        <enum-select  v-model="search.result" multiple placeholder="巡查结果" @change="handleIconClick"  enum="com.ybveg.govx.enums.patrol.RecordResultEnum"></enum-select>
        <enum-select  v-model="search.treat" multiple placeholder="处理方式" @change="handleIconClick"  enum="com.ybveg.govx.enums.patrol.TreatEnum"></enum-select>
    </div>
    <div :class="down?'tabOffTop170':'tabOffTop120'">
      <el-table :data="tableData" class="table-div"  @sort-change="handleSortChange" :key="maxheight" :max-height="maxheight" :class="shadowShow?'shadowNo':''">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="deptName" label="辖区机构"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityName" width="140" label="主体名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="planName" width="160" label="巡查计划"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityTypeLabel" label="主体类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="superviseName" width="160" label="监管人员"></el-table-column>
        <el-table-column show-overflow-tooltip prop="messName" width="100" label="信息员"></el-table-column>
        <el-table-column show-overflow-tooltip prop="result" width="100" label="巡查结果"></el-table-column>
        <el-table-column show-overflow-tooltip resizable width="100" label="问题项/巡查项">
          <template slot-scope="data">
            <span>{{data.row.quesTotal}}/{{data.row.allTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="treat" label="处理方式"></el-table-column>
        <el-table-column show-overflow-tooltip prop="patrolTime" sortable="custom" min-width="130" label="巡查日期"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:;" @click="view(scope.row.id)" class="operate-a">详情</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination background @size-change="pageSizeChange"
                       @current-change="pageCurrentChange"
                       :current-page="page.num"
                       :page-sizes="[5,8,10,15,20,25,30]"
                       :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {findSpecialPage,findListByAreaCode} from "api/patrol/record/record";
  import EnumSelect from 'components/common/EnumSelect.vue';
  import SelectAreaGrid from 'components/common/SelectAreaGrid.vue';
  import {calcTableHeight,boxShadow} from 'utils/utils';

  export default {
    components:{
      EnumSelect,SelectAreaGrid
    },
    async mounted() {
      this.getSpecialPlanList();
      //分管网格
      this.getPage();
      this.maxheight = calcTableHeight(this.tableHeight,240);
      setTimeout(()=>{
          this.shadowShow = boxShadow(document.getElementsByClassName("el-table")[0].clientWidth,document.getElementsByClassName("el-table__body")[0].clientWidth);
      },0)
    },
    methods: {
      downSeleBox(){
        this.down = !this.down
        if (this.down) {
          this.maxheight = calcTableHeight(this.tableHeight,240);
        } else{
          this.maxheight = calcTableHeight(this.tableHeight,190);
        }
      },
      add() {
        this.$router.push('/biz/patrol/record/special/add');
      },
      //页面查询
      async getPage() {
        let params = this.search;
        var formData = {
          params: this.search,
          num: this.page.num,
          pageSize: this.page.pageSize,
        }
        findSpecialPage(formData).then(r => {
          this.page.num == 0 ? 1 : r.data.pageNum;
          this.page.pagesize = r.data.pagesize;
          this.tableData = r.data.list;
          this.page.total = r.data.total;
        })
      },
      handleIconClick() {
        this.getPage();
      },
      //分页条
      pageCurrentChange(num) {
        this.page.num = num;
        this.getPage();
      },
      pageSizeChange(size) {
        this.page.pageSize = size;
        this.getPage();
      },
      // 排序
      handleSortChange({order}) {
        this.search.sortType = order == 'descending' ? 'DESC' : 'ASC';
        this.getPage();
      },
      deptChange(deptId){
        this.search.areaCode = !deptId ? "" : deptId[deptId.length-1];
        this.getSpecialPlanList();
        this.getPage();
      },
      //当前年的第一天
      getFirstDayOfYear (date) {
        var currentYear=date.getFullYear();
        return new Date(currentYear,0,1);
      },
      view(recordId){
        this.$router.push({
          name: 'patrol.record.detail',
          query:{
            recordId:recordId,
            patrolType:"SPECIAL"
          }
        })
      },
      getSpecialPlanList(){
        findListByAreaCode(this.search.areaCode).then((r) => {
          this.specialPlanList = r.data;
        });
      }
    },
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
          this.maxheight = calcTableHeight(this.tableHeight,240);
      },
      tableWidth(){
          setTimeout(()=>{
             this.shadowShow = boxShadow(document.getElementsByClassName("el-table")[0].clientWidth,document.getElementsByClassName("el-table__body")[0].clientWidth);
          },0)
      }
    },
    data() {
      return {
        down:true,
        maxheight:0,
        shadowShow:false,
        page: {
          pageSize: 10,
          num: 1,
          total: 0
        },
        search: {
          select: "",   //搜索
          entityType: [], //主体类型
          result: [], //主体类型
          treat: [], //主体类型
          sortType: "DESC",
          areaCode: "",//网格
          startDate:"",
          endDate:"",
          specialPlanIds:[]
        },
        deptsOptions: {
          props: {
            label: 'deptName',
            value: 'areaCode'
          },
          options: []
        },
        mess: {
          choose: 0,
        },
        //下拉表
        subTypeList: [],
        resultList: [],
        treatList: [],
        specialPlanList:[],
        //列表数据
        tableData: [],
        areaLevel: "",
        patrolTimes:[]
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
  .down{
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #C2CAD2;
      color:  #A2AAB6;
      text-align: center;
      line-height: 32px;
      font-size: 18px;
      margin-left: 20px;
  }
  .ipt-btn-box {
    margin: 20px 0;
    display: flex;
    line-height: 34px;
  }
  .ipt-btn-box button{
      position: absolute;
      right: 40px;
  }
  .sleq{
    margin: 0 10px 0 20px;
  }
  .slez{
     margin-left:10px;
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

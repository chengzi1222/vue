<template>
    <div class="bigbox">
    	<div class="page-tilt">
    	    <b></b><span>限期整改</span>
    	</div>
        <ul class="tab-box">
            <li class="tabLi" v-for="(item,index) in patternLis" :data-index="index"
                :class="index==mess.choose?'li-bott':''" @click="choose(index,item.type)">
                <div :data-index='index'><span :class="index==mess.choose?'li-span':''">{{item.name}}</span></div>
            </li>
            <li class="tab-bott"></li>
        </ul>
        <div>
            <el-input placeholder="主体名称" class="w200 mr20 seekIpt" v-model="searchMap.keysWord" @keyup.enter.native ="seekEnter($event)">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getPageData"></i>
            </el-input>
            <el-select @change="entityChange" collapse-tags multiple v-model="searchMap.entityType" class="w200 mr20" placeholder="主体类型(全部)">
                <el-option
                  v-for="item in entityTypeSelectdata"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key">
                </el-option>
            </el-select>
            <select-area-grid v-model="selectAreaGridData" class="w150" style="margin-right: 20px;" placeholder="辖区机构(全部)" @change="selectAreaGrid"></select-area-grid>
            <el-select @change="resultChange" collapse-tags multiple v-model="searchMap.result" class="w200 mr20" placeholder="复查结果(全部)" v-if="mess.type == 'ok'">
                <el-option
                  v-for="item in resultSelectdata"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key">
                </el-option>
            </el-select>
            <el-select @change="treatChange" collapse-tags multiple v-model="searchMap.treat" class="w200 mr20" placeholder="处理方式(全部)" v-if="mess.type == 'ok'">
                <el-option
                  v-for="item in treatSelectdata"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key">
                </el-option>
            </el-select>
            <i :class="down?'el-icon-caret-top':'el-icon-caret-bottom'" class="down" @click="downSeleBox" v-if="mess.type == 'ok'"></i>
            <div class="downsele" v-if="down && mess.type == 'ok'">
                <el-date-picker value-format="yyyy-MM-dd" @change="startTimeChange" v-model="searchMap.startTime" class="sle w140" type="date" placeholder="起始日期"></el-date-picker>至<el-date-picker value-format="yyyy-MM-dd" @change="endTimeChange" v-model="searchMap.endTime" class="sle w140" type="date" placeholder="截止日期"></el-date-picker>
            </div>
            <div style="display: inline-block;" v-if="mess.type == 'not'">
                <el-date-picker value-format="yyyy-MM-dd" @change="startTimeChange" v-model="searchMap.startTime" class="sle w140" type="date" placeholder="起始日期"></el-date-picker>至<el-date-picker value-format="yyyy-MM-dd" @change="endTimeChange" v-model="searchMap.endTime" class="sle w140" type="date" placeholder="截止日期"></el-date-picker>
            </div>
        </div>
        <div :class="down?'tabOffTop145':'tabOffTop170'">
          <el-table @sort-change="sortChange" :data="dataPage" class="table-div" :class="dataPage && mess.type == 'not'?'opct0':''">
              <el-table-column show-overflow-tooltip type="index" min-width='50' label="序号">
                  <!-- <template slot-scope="scope">
                      {{(pageObj.pageSize * (pageObj.pageNumber - 1) + scope.$index + 1)}}
                  </template> -->
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="entityName" label="主体名称"></el-table-column>
              <el-table-column show-overflow-tooltip prop="deptName" label="辖区机构"></el-table-column>
              <el-table-column show-overflow-tooltip prop="corpName" label="经营者/负责人"></el-table-column>
              <el-table-column show-overflow-tooltip prop="result" label="复查结果"></el-table-column>
              <el-table-column show-overflow-tooltip prop="remark" label="复查备注">
                <template slot-scope="scope">
                  <span v-if="scope.row.remark === '' || scope.row.remark === undefined">无备注</span>
                  <span v-else>{{scope.row.remark}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="treat" label="处理方式"></el-table-column>
              <!-- <el-table-column show-overflow-tooltip prop="sourceTime" label="巡查日期"></el-table-column> -->
              <el-table-column show-overflow-tooltip prop="repatrolTime" sortable="custom" label="复查日期"></el-table-column>
              <el-table-column show-overflow-tooltip label="操作">
                  <template slot-scope="scope">
                      <a href="javascript:;" @click="goDetail(scope.row.id)" style="font-size: 12px;color: #1787AD;">复查详情</a>
                  </template>
              </el-table-column>
          </el-table>
          <el-table @sort-change="sortChange" :data="dataPage" class="table-div" :class="dataPage && mess.type != 'not'?'opct0':''">
              <el-table-column show-overflow-tooltip min-width='50' type="index" label="序号">
                  <!-- <template slot-scope="scope">
                      {{(pageObj.pageSize * (pageObj.pageNumber - 1) + scope.$index + 1)}}
                  </template> -->
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="entityName" label="主体名称"></el-table-column>
              <el-table-column show-overflow-tooltip prop="deptName" label="辖区机构"></el-table-column>
              <el-table-column show-overflow-tooltip prop="corpName" label="经营者/负责人"></el-table-column>
              <el-table-column show-overflow-tooltip prop="mobile" label="联系方式"></el-table-column>
              <el-table-column show-overflow-tooltip prop="sourceType" label="关联来源"></el-table-column>
              <el-table-column show-overflow-tooltip prop="sourceResult" label="巡查结果"></el-table-column>
              <el-table-column show-overflow-tooltip prop="sourceRemark" label="处理备注">
                <template slot-scope="scope">
                  <span v-if="scope.row.sourceRemark === '' || scope.row.sourceRemark === undefined">无备注</span>
                  <span v-else>{{scope.row.sourceRemark}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="sourceTime" label="巡查时间"></el-table-column>
              <el-table-column show-overflow-tooltip prop="sourceRectifyTime"  sortable="custom" label="整改截止日期">
                <template slot-scope="scope">
                    <span :class="{red : isDate(scope.row.sourceRectifyTime) }">{{scope.row.sourceRectifyTime}}</span>
                    <!-- Date.parse(scope.row.rectifyTime) < Date.parse(new Date()) -->
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip label="操作">
                  <template slot-scope="scope">
                      <a href="javascript:;" @click="toSource(scope.row.sourceId, scope.row.sourceType)" style="font-size: 12px;color: #1787AD;">巡查详情</a>
                      <a v-if="areaCode.length===10" @click="goAdd(scope.row.id);" v-auth="'peri.repatrol|func.add'" href="javascript:;" style="font-size: 12px;color: #1787AD;">复查</a>
                  </template>
              </el-table-column>
          </el-table>
          <div class="pagination-box">
              <el-pagination background :current-page="page.pageNum"
                             :page-sizes="[10, 20, 30, 40,50]"
                             :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                             :total="page.total"
                             @size-change="pageSizeChange"
                             @current-change="pagecCurrentChange">
              </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
  import { page, getAreaCode, getTreatList, getResultList } from "api/patrol/repatrol.js";
  import { getSubTypeList } from "api/patrol/special/planSpecial.js";
  // import { getdeptGrid } from "api/statistics/statistics.js";
  import SelectAreaGrid from "components/common/SelectAreaGrid.vue"
  export default {
    methods: {
      // 切换导航样式
      choose (index, type) {
        this.mess.choose = index
        this.mess.type = type
        console.log(index + ":" + type)
        if(index === 0 && type === 'not') {
          this.searchMap.state = 'TODO'
        }else if(index === 1 && type === 'ok') {
          this.searchMap.state = 'END'
        }
        this.searchMap.keysWord = ''
        this.searchMap.entityType = []
        this.searchMap.areaCode = this.areaCode // 因为<select-area-grid>标签暂时没有提供清空功能,所以在表格跳转的时候沿用上一次的区域编码
        this.searchMap.result = []
        this.searchMap.treat = []
        this.searchMap.startTime = ''
        this.searchMap.endTime = ''
        this.searchMap.pageSize = this.page.pageSize
        this.searchMap.pageNum = this.page.pageNum
        this.searchMap.sort = undefined
        // this.selectAreaGridData = []
        this.selectAreaGridData.splice(0, this.selectAreaGridData.length);
        // this.areaArray.length = 0
        // this.areaArray.push(this.areaCode)
        this.dataPage = [] // 清空当前的数据,防止在加载数据过程总沿用上次的数据
        this.getPageData();
      },
      // 页数改变
      pagecCurrentChange (num) {
        this.page.pageNum = num
        this.searchMap.pageNum = num
        this.getPageData();
      },
      // 每页数量改变
      pageSizeChange (size) {
        this.page.pageSize = size
        this.searchMap.pageSize = size
        this.getPageData();
      },
      downSeleBox () {
        this.down = !this.down
      },
      getPageData () {
        console.log(this.searchMap)
        page(this.searchMap).then((response) => {
          // 数据装载
          this.dataPage = response.data.list
          this.page.total = response.data.total
        })
      },
      entityChange () {
        this.getPageData()
      }/* ,
      areaChange () {
        console.log( 'TESTMODEL:' + this.areaArray)
        this.searchMap.areaCode = this.areaArray[this.areaArray.length - 1]
        this.getPageData()
      } */,
      resultChange () {
        this.getPageData()
      },
      treatChange () {
        this.getPageData()
      },
      startTimeChange () {
        this.getPageData()
      },
      endTimeChange () {
        this.getPageData()
      },
      sortChange () {
        // descending下降 ascending上升
        console.log(arguments[0].order + ':' +arguments[0].prop)
        this.searchMap.sort = arguments[0].order
        this.getPageData()
      },
      selectAreaGrid (value) {
        console.log(value)
        if (value[value.length - 1]) {
          this.searchMap.areaCode = value[value.length - 1]
        } else {
          this.searchMap.areaCode = this.areaCode
        }
        this.getPageData()
      },
      isDate (date) {
        var currDate = new Date();
        var strDate = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate()
        // console.log(new Date(Date.parse(date) - 8*60*60*1000) + ":" + new Date(Date.parse(strDate)))
        if(Date.parse(new Date(Date.parse(date) - 8*60*60*1000)) < Date.parse(new Date(Date.parse(strDate)))) {
          return true
        }else{
          return false
        }
      },
      //跳转复查页面
      goAdd(repatrolRecordId) {
        this.$router.push({name: 'patrol.repatrol.ad', params: {'curd': 'add', 'repatrolRecordId': repatrolRecordId}})
      },
      goDetail(repatrolRecordId) {
        this.$router.push({name: 'patrol.repatrol.ad', params: {'curd': 'detail', 'repatrolRecordId': repatrolRecordId}})
      },
      // 调整巡查详情页面
      toSource (id, type) {
        console.log(id + ":" + type)
        if (type === '日常巡查') {
          this.$router.push({ name: 'patrol.record.detail', query:{recordId:id,patrolType:"DAILY"}})
        } else if (type === '整改复查') {
          this.$router.push({name: 'patrol.repatrol.ad', params: {'curd': 'detail', 'repatrolRecordId': id}})
        } else {
          this.$router.push({ name: 'patrol.record.detail', query:{recordId:id,patrolType:"SPECIAL"}})
        }
      }
    },
    mounted () {
      // 获取处理方式下拉列表
      getTreatList().then(r => {
        console.log(r.data)
        this.treatSelectdata = r.data
      })
      // 获取复查结果下拉列表
      getResultList().then(r => {
        console.log(r.data)
        this.resultSelectdata = r.data
      })
      // 获取主体类型下拉列表
      getSubTypeList().then(r => {
        this.entityTypeSelectdata = r.data
        console.log(this.entityTypeSelectdata)
      })
      getAreaCode().then(r => {
        this.searchMap.areaCode = r.data.areaCode
        this.areaCode = r.data.areaCode
        /* this.areaArray.push(this.areaCode)
        // 辖区机构(全部)
        getdeptGrid().then(r => {
          r.data.forEach(element => {
            if(this.areaCode === element.areaCode) {
              // 修改当前登录的区域的名称显示
              element.deptName = element.deptName + "(全部)"
            }
          })
          this.areaSelectdata.options = r.data
          console.log(this.areaSelectdata)
        }) */
        console.log(this.areaCode)
        this.getPageData()
      })
    },
    data () {
      return {
        patternLis: [{
          name: '待复查',
          type: 'not'
        }, {
          name: '已复查',
          type: 'ok'
        }],
        mess: {
          choose: 0,
          type: 'not'
        },
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        dataPage: [],
        pageObj: null,
        // 当前登录区域编码
        areaCode: '',
        // 主体类型下拉框
        entityTypeSelectdata: [],
        // 辖区区域(全部)
        /* areaArray: [],
        areaSelectdata: {
          props: {
            label: 'deptName',
            value: 'areaCode'
          },
          options: []
        }, */
        // 复查结果
        resultSelectdata: [],
        // 处理方式
        treatSelectdata: [],
        // 下拉框绑定属性
        selectmodel: null,
        // 下拉框内容
        selectdata: [{
          value: '选项1',
          label: '黄金糕'
        }],
        // 收齐搜索框按钮
        down: true,
        date: null,
        // 查询条件
        searchMap: {
          state: 'TODO', // 默认设置待复查
          keysWord: '', // 关键字
          entityType: [], // 主体类型
          areaCode: '', // 区域id
          result: [], // 处理结果
        	treat: [], // 处理方式
          startTime: undefined, // 开始时间
          endTime: undefined, // 结束时间
          pageSize: 10,
          pageNum: 1,
          sort: undefined // 排序规则
        },
        // // 待复查数据
        // TODODataPage: [],
        // // 已复查数据
        // ENDDataPage: [],
        // 只要一个dataPage
        dataPage: [],
        // 辖区机构(全部)
        selectAreaGridData: []
      }
    },
    components: { SelectAreaGrid }
  }
</script>

<style scoped>
  .tab-box {
      width: 100%;
      display: flex;
      position: relative;
      margin-bottom: 20px;
  }
  .tab-box .tabLi {
      width: 128px;
      height: 50px;
      line-height: 50px;
      margin-right: 30px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #9A9A9A;
      text-align: center;
  }
  .tab-box .li-bott {
      border-bottom: 2px solid #0DB5EF;
      z-index: 666;
      position: relative;
  }
  .tab-box .li-span{
      color: #393939;
  }
  .tab-box span:first-child{
      margin-right: 10px;
  }
  .table-div{
      margin: 20px 0;
      text-align: center;
  }
  .pagination-box {
      text-align: right;
      margin-top: 20px;
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
  }
  .mr20{
      margin-right: 20px;
  }
  .downsele{
      padding-left: 220px;
      margin-top: 20px;
  }
  .sle{
      margin: 0 12px;
  }
  .opct0{
      /*opacity: 0;
      height: 0px !important;
      margin: 0;
      border: 0 !important;*/
      display: none;
  }
  .red{
    color:red !important;
  }
</style>

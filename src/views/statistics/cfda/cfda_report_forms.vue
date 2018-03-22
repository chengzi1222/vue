<template>
  <div class="user-box">
    <!--<div class="page-tilt">
      <b></b>
      <span>统计分析 - 三小</span>
    </div>

    <ul class="tab-box">
      <li v-for="item,index in lists" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
        <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>-->

    <section class="select floatL" style="margin-bottom:20px;">
      <el-select style="vertical-align: top;" class="w125" v-model="riskRankValue" placeholder="请选择状态"
                 @change="selectChange">
        <el-option
          v-for="item in riskRankSelect"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
      <el-select style="vertical-align: top;" class="w125" v-model="quanLevelValue" placeholder="请选择状态"
                 @change="selectChange">
        <el-option
          v-for="item in quanLevelSelect"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
      <!--<el-select style="vertical-align: top;" class="w125" v-model="spaceDstValue" placeholder="请选择状态"
                 @change="selectChange">
        <el-option
          v-for="item in spaceDstSelect"
          :key="item.id"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>-->
    </section>
     <el-button @click="exportFile" class="floatR" type="primary" style="margin-top:20px;">导出</el-button>
    <el-table  :data="report" class="table-div">
      <el-table-column type="index" align="center" label="排名" width="50">

      </el-table-column>
      <el-table-column show-overflow-tooltip prop="deptName" min-width="90" label="单位名称"></el-table-column>

      <!--<el-table-column show-overflow-tooltip min-width="90" label="三小">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.cfdaRestaurant + scope.row.sale + scope.row.workshop + scope.row.vendors}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column show-overflow-tooltip prop="product" min-width="90" label="生产主体"></el-table-column>-->
      <!--<el-table-column show-overflow-tooltip prop="circulation" min-width="90" label="流通主体"></el-table-column>-->
      <!--<el-table-column show-overflow-tooltip prop="restaurant" min-width="90" label="餐饮主体"></el-table-column>-->

      <!--<el-table-column show-overflow-tooltip prop="yzyz" min-width="90" label="有证有照"></el-table-column>-->
      <!--<el-table-column show-overflow-tooltip prop="yzwz" min-width="90" label="有照无证"></el-table-column>-->
      <!--<el-table-column show-overflow-tooltip prop="wzwz" min-width="90" label="无证无照"></el-table-column>-->

      <el-table-column show-overflow-tooltip align="center" prop="cfdaRestaurant" min-width="90" label="小经营店（餐饮）"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="sale" min-width="90" label="小经营店（销售）"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="workshop" min-width="90" label="小作坊"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="vendors" min-width="90" label="小摊贩"></el-table-column>

      <el-table-column show-overflow-tooltip align="center" min-width="90" label="总计">
        <template slot-scope="scope">
          {{scope.row.cfdaRestaurant + scope.row.sale
        + scope.row.workshop + scope.row.vendors}}
      </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
  import {reportForms,getDicts,exportFile,exportTitleGenerate} from 'api/statistics/statistics';
  import {listDictUserItemByDictCode, downloadFile } from 'api/common';
  export default {
    async mounted(){


      let dicts = await getDicts();
      this.riskRankSelect = dicts.data.risk;
      this.quanLevelSelect = dicts.data.quantify;
      this.spaceDstSelect = dicts.data.otherPlace;
      this.selectChange()
    },
    methods:{
      async selectChange(){
        let report = await reportForms("CFDA",'',this.riskRankValue,this.spaceDstValue,this.quanLevelValue);
        this.report = report.data;
      },
      exportFile(){
        let title = '三小统计报表';
        let remake = '备注:';
        remake = remake + exportTitleGenerate("风险等级",this.riskRankSelect,this.riskRankValue) + ',';
        remake = remake + exportTitleGenerate("量化等级",this.quanLevelSelect,this.quanLevelValue);
//        remake = remake + exportTitleGenerate("场所分布",this.spaceDstSelect,this.spaceDstValue);
        exportFile(title,remake,"cfda","CFDA",'',this.riskRankValue,this.spaceDstValue,this.quanLevelValue).then((result) =>{
          downloadFile(result.data,'三小统计报表');
        });
      },
      liClick(e) {
        //点击导航切换样式
        var me = this;
        if (me.defaultIndex == e.target.dataset.index) {
          return;
        }
        me.defaultIndex = e.target.dataset.index;
        this.$router.push({path: this.lists[me.defaultIndex].router});
      }
    },
    data(){
      return {
       /* lists: [
//          { tabName: "主体概况" ,router:'/cfda/statistics'},
          { tabName: "统计报表" ,router:'/cfda/statistics'}],
//          { tabName: "统计报表" ,router:'/cfda/statistics/report'}],
        defaultIndex: 0, //控制tab导航样式*/
        riskRankValue:'',
        quanLevelValue:'',
        spaceDstValue:'',
        riskRankSelect:[],
        quanLevelSelect:[],
        spaceDstSelect:[],
        report:[],
      }
    }
  }
</script>

<style>
  section.select .el-select {
    margin-top: 20px;
    margin-right: 20px;
    width: 150px;
  }

  .tab-box {
    padding-left: 20px;
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
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #9a9a9a;
    text-align: center;
  }

  .tab-box .li-bott {
    border-bottom: 2px solid #0db5ef;
    z-index: 666;
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
    background: #ebf1f5;
  }

</style>

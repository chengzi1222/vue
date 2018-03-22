<template>
    <div class="user-box">
        <div class="page-tilt">
            <b></b>
            <span>巡查概况统计</span>
        </div>
        <div class="content">
            <div class="timeBox">
                <span>专项巡查概况</span>
                <el-date-picker @change="getSpecial" value-format="yyyy-MM-dd" class="sleq padRightNo" type="date" v-model="specialBeginTime" placeholder="起始时间"></el-date-picker>
                至
                <el-date-picker @change="getSpecial" value-format="yyyy-MM-dd" v-model="specialOverTime" class="slez padRightNo" type="date" placeholder="截止时间"></el-date-picker>
            </div>
            <div class="specialData aloneDiv">
                <div @click="go('specialList','已完成')">
                    <h3>{{specialData.finishedNum?specialData.finishedNum:0}}<span class="unit">(条)</span></h3>
                    <p>已完成的计划</p>
                </div>
                <div @click="go('specialList','执行中')">
                    <h3>{{specialData.executingNum?specialData.executingNum:0}}<span class="unit">(条)</span></h3>
                    <p>执行中的计划</p>
                </div>
                <div style="cursor: default;">
                    <h3>{{specialData.deadlineNum?specialData.deadlineNum:0}}<span class="unit">(条)</span></h3>
                    <p>即将截止的专项计划</p>
                </div>
                <div @click="go('专项巡查记录列表')">
                    <h3>{{specialData.totalPatrol?specialData.totalPatrol:0}}<span class="unit">(次)</span></h3>
                    <p>累计巡查</p>
                </div>
            </div>
            <div class="timeBox">
                <span>日常巡查概况</span>
                <el-date-picker @change="getDaily" value-format="yyyy-MM-dd" class="sleq padRightNo" type="date" v-model="dailyBeginTime" placeholder="起始时间"></el-date-picker>
                至
                <el-date-picker @change="getDaily" value-format="yyyy-MM-dd" class="slez padRightNo" type="date" v-model="dailyOverTime" placeholder="截止时间"></el-date-picker>
            </div>
            <div class="dailyData">
                <div class="dataBox">
                    <p>综合数据</p>
                    <div class="topDataBox aloneDiv">
                        <div @click="go('日常巡查记录列表')">
                            <h3>{{dailyData.totalPatrol?dailyData.totalPatrol:0}}<span class="unit">(次)</span></h3>
                            <p>累计巡查</p>
                        </div>
                        <div style="cursor: default;">
                            <h3><span>{{dailyData.entityCoverage?dailyData.entityCoverage:0}}</span>%</h3>
                            <p>主体覆盖率</p>
                        </div>
                        <div style="cursor: default;">
                            <h3><span>{{inconformity}}</span>%</h3>
                            <p>巡查结果不符合率</p>
                        </div>
                    </div>
                    <div class="bottomDataBox aloneDiv">
                        <div style="cursor: default;">
                            <h3>{{dailyData.overdueNotPatrol?dailyData.overdueNotPatrol:0}}</h3>
                            <p>当前逾期未巡查</p>
                        </div>
                        <div style="cursor: default;">
                            <h3>{{dailyData.toBeOverdue?dailyData.toBeOverdue:0}}</h3>
                            <p>当前即将逾期</p>
                        </div>
                    </div>
                </div>
                <div class="echartBox">
                    <ul class="tab-box">
                        <li v-for="(item,index) in PlanStateList" :class="index==mess.chooseOne?'li-bott':''" @click="choose(index,item.key)">
                            <div :data-index='index'>{{item.name}}</div>
                        </li>
                        <li class="tab-bott"></li>
                    </ul>
                    <div id="echartDaily" class="echart" :class="mess.chooseOne == 0?'echartIndex':''"></div>
                    <div id="echartDailyT" class="echart" :class="mess.chooseOne == 1?'echartIndex':''"></div>
                </div>
            </div>
            <div class="muchDataBox">
                <ul class="tab-box">
                    <li v-for="(item,index) in muchDatas" :class="index==mess.chooseTwo?'li-bott':''" @click="chooseTwo(index,item.key)">
                        <div :data-index='index'>{{item.name}}</div>
                    </li>
                    <li class="tab-bott"></li>
                </ul>
                <div style="padding: 20px;position: relative;min-height: 320px;">
                    <!-- 统计报表 -->
                    <div v-if="this.mess.chooseTwo == 0">
                        <div style="margin-bottom: 20px;">
                            <el-date-picker value-format="yyyy-MM-dd" @change="getReportDaily" class="sleq padRightNo" style="margin-left: 0;" type="date" v-model="reportStartDate" placeholder="起始时间"></el-date-picker>
                            至
                            <el-date-picker value-format="yyyy-MM-dd" @change="getReportDaily" v-model="reportEndDate" class="slez padRightNo" type="date" placeholder="截止时间"></el-date-picker>
                            <el-select class="w150" style="margin-left: 20px;" v-model="rank" @change="getReportDaily" placeholder="排序方式">
                                <el-option
                                  v-for="item in rankLis"
                                  :key="item.key"
                                  :label="item.type"
                                  :value="item.key">
                                </el-option>
                            </el-select>
                            <el-button class="w65 floatR" @click="exportExcel" type="primary">导出</el-button>
                        </div>
                        <el-table :data="report" class="table-div">
                            <el-table-column min-width="50" label="排名">
                                <template slot-scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip prop="deptName" min-width="100" label="单位名称"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="totalPatrol" min-width="100" label="累计巡查"></el-table-column>
                            <el-table-column show-overflow-tooltip min-width="130" label="符合/基本符合/不符合">
                                <template slot-scope="scope">
                                    {{scope.row.patrolResultList[0].number}}/{{scope.row.patrolResultList[1].number}}/{{scope.row.patrolResultList[2].number}}
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip prop="legalPerson" min-width="200" label="正常/现场整改/限期整改/调查处理/责令停业">
                                <template slot-scope="scope">
                                    {{scope.row.processingTypeList[0].number}}/{{scope.row.processingTypeList[1].number}}/{{scope.row.processingTypeList[2].number}}/{{scope.row.processingTypeList[3].number}}/{{scope.row.processingTypeList[4].number}}
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip min-width="80" label="主体覆盖率">
                                <template slot-scope="scope">
                                    {{scope.row.entityCoverage}}&nbsp;%
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip prop="overdueNotPatrolNum" min-width="80" label="逾期未巡查"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="toBeOverdueNum" min-width="80" label="即将逾期"></el-table-column>
                        </el-table>
                    </div>

                    <!-- 巡查动态 -->
                    <div class="clearfix"  v-if="this.mess.chooseTwo == 1">
                        <el-table
                            :data="dynamic"
                            style="width: 100%;margin-top:20px;font-size:12px;">
                            <el-table-column
                                align="center"
                                label="序号"
                                type="index"
                                width="50">
                            </el-table-column>
                             <el-table-column
                                align="center"
                                label="巡查对象"
                                prop="entityName"
                             >
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="巡查结果"
                                width="100">
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row.resultStr == '符合'" size="mini" type="success">{{scope.row.resultStr}}</el-tag>
                                    <el-tag v-if="scope.row.resultStr == '不符合'" size="mini" type="danger">{{scope.row.resultStr}}</el-tag>
                                    <el-tag v-if="scope.row.resultStr == '基本符合'" size="mini" type="warning">{{scope.row.resultStr}}</el-tag>
                                </template>
                            </el-table-column>
                             <el-table-column
                                align="center"
                                label="所属食药所"
                                prop="deptName"
                                width="300"
                             > </el-table-column>
                            <el-table-column
                                align="center"
                                prop="supervisor"
                                label="监管员">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="patrolTime"
                                label="时间">
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="eBoxClass"  :class="this.mess.chooseTwo == 2?'zIndex99':''">
                        <div class="echa" id="totalPatrol"></div>
                    </div>

                    <div class="eBoxClass"  :class="this.mess.chooseTwo == 3?'zIndex99':''">
                        <div>
                            <span style="margin: 0 20px 0 10px;">量化等级</span>
                            <el-select class="w150 mr10" @change="getEntityCoverageChart" v-model="quanLevel" placeholder="请选择">
                                <el-option
                                  v-for="item in quanLevelLis"
                                  :key='item.code'
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                            </el-select>
                            <span style="margin: 0 20px 0 10px;">风险等级</span>
                            <el-select class="w150 mr10" @change="getEntityCoverageChart" v-model="riskLevel" placeholder="请选择">
                                <el-option
                                  v-for="item in riskLevelLis"
                                  :key='item.code'
                                  :label="item.name"
                                  :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="echa" id="coverage"></div>
                    </div>

                    <div class="eBoxClass"  :class="this.mess.chooseTwo == 4?'zIndex99':''">
                        <div class="echa" id="overdue"></div>
                    </div>

                    <div class="eBoxClass"  :class="this.mess.chooseTwo == 5?'zIndex99':''">
                        <div class="echa" id="aboutOf"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as getSituation from "api/patrol/situation";
import * as echartFun from "./echartsFun";
import YbSlider from 'components/YbSlider';
import * as plan from 'api/common' 
export default {
    beforeDestroy(){
      this.willDestroy = true;
    },
    mounted() {
        // 默认开始日期为本年1月1日，截止时间为当天
        const dates =  new Date();
        let mon = dates.getMonth()  + 1;         //getMonth()返回的是0-11，则需要加1
        if(mon <=9){                                     //如果小于9的话，则需要加上0
            mon = "0" + mon;
        }
        let day = dates.getDate();                   //getdate()返回的是1-31，则不需要加1
        if(day <=9){                                     //如果小于9的话，则需要加上0
            day = "0" + day;
        }
        this.specialOverTime = dates.getFullYear() + "-" + mon + "-" +  day;
        this.dailyOverTime = dates.getFullYear() + "-" + mon + "-" +  day;
        this.reportEndDate = dates.getFullYear() + "-" + mon + "-" +  day;
        this.specialBeginTime = dates.getFullYear() + "-01-01";
        this.dailyBeginTime = dates.getFullYear() + "-01-01";
        this.reportStartDate = dates.getFullYear() + "-01-01";


        this.getSpecial();
        this.getDaily();
        this.getPatrolResult();
        this.getProcessingType();
        this.getTotalPatrol();
        this.getOverdueNotPatrolChart();
        this.getToBeOverdueChart();
        this.getReportDaily();
        this.listDictUserItemByDictCode('OTHER_RISK');
        this.listDictUserItemByDictCode('OTHER_QUANTIFY');
    },
    methods: {
        exportExcel () {
          getSituation.exportDailyExcel(this.reportStartDate,this.reportEndDate,this.rank);
        },
        choose(index) {
            this.mess.chooseOne = index;
        },
        chooseTwo(index, key) {
            this.mess.chooseTwo = index;
            if (index == 0) {
                this.getReportDaily()
            }else if (index == 1) {
                this.dynamicFn();
            }
        },
        getSpecial(){
          let params = {'startDate' : this.specialBeginTime, 'endDate' : this.specialOverTime};
            getSituation.getSpecialData(params).then((data)=>{
                this.specialData = data.data;
            })
        },
        getPatrolResult(){
          let params = {'startDate' : this.dailyBeginTime, 'endDate' : this.dailyOverTime};
            getSituation.getPatrolResult(params).then((data)=>{
              this.inconformity = data.data[2].percent;
              // 巡查结果分布
                let legendData = [];
                let seriesData = [];
                for(var i=0;i<data.data.length;i++){
                    let seriesobj = {};
                    seriesobj.value = data.data[i].number;
                    seriesobj.name = data.data[i].resultStr;
                    legendData.push(data.data[i].resultStr);
                    seriesData.push(seriesobj);
                }
                this.resultDistribution.legendData = legendData;
                this.resultDistribution.seriesData = seriesData;
                echartFun.distribution(this.resultDistribution,"0","echartDaily");
            })
        },
        getProcessingType(){
          let params = {'startDate' : this.specialBeginTime, 'endDate' : this.specialOverTime};
            getSituation.getProcessingType(params).then((data)=>{
                // 处理方式分布
                let legendData = [];
                let seriesData = [];
                for(var i=0;i<data.data.length;i++){
                    let seriesobj = {};
                    seriesobj.value = data.data[i].number;
                    seriesobj.name = data.data[i].treatStr;

                    legendData.push(data.data[i].treatStr);
                    seriesData.push(seriesobj);
                }
                this.typeDistribution.legendData = legendData;
                this.typeDistribution.seriesData = seriesData;
                echartFun.distribution(this.typeDistribution,"1","echartDailyT");
            })
        },
        getTotalPatrol(){
          let params = {'startDate' : this.specialBeginTime, 'endDate' : this.specialOverTime};
            getSituation.getTotalPatrol(params).then((data)=>{
                let legendData = ['符合','基本符合','不符合'];
                let seriesData = [];
                let xData = [];
                let fuhe = {
                    name:'符合',
                    type:'bar',
                    data:[]
                }
                let jiben = {
                    name:'基本符合',
                    type:'bar',
                    data:[]
                }
                let bufuhe = {
                    name:'不符合',
                    type:'bar',
                    data:[]
                }
                for(var i=0;i<data.data.length;i++){
                    xData.push(data.data[i].deptName);
                    for(var o=0;o<data.data[i].patrolResult.length;o++){
                        if(data.data[i].patrolResult[o].resultStr == '符合'){
                            fuhe.data.push(data.data[i].patrolResult[o].number)
                        } else if (data.data[i].patrolResult[o].resultStr == '不符合') {
                            bufuhe.data.push(data.data[i].patrolResult[o].number)
                        } else if (data.data[i].patrolResult[o].resultStr == '基本符合') {
                            jiben.data.push(data.data[i].patrolResult[o].number)
                        }
                    }
                }
                seriesData.push(fuhe);
                seriesData.push(jiben);
                seriesData.push(bufuhe);
                // 累计巡查
                this.total.legendData = legendData;
                this.total.xData = xData;
                this.total.seriesData = seriesData;
                echartFun.totalPatrol(this.total.legendData,this.total.xData,this.total.seriesData,"totalPatrol");

            })
        },
        getOverdueNotPatrolChart(){
          let params = {'startDate' : this.specialBeginTime, 'endDate' : this.specialOverTime};
            getSituation.getOverdueNotPatrolChart(params).then((data)=>{
                let xData = [];
                let overdue = [];//逾期未巡查
                for(var i=0;i<data.data.length;i++){
                    xData.push(data.data[i].deptName);
                    overdue.push(data.data[i].overdueNotPatrol);
                }

                // 逾期未巡查数
                this.overdue.legendData = ['逾期未巡查数'];
                this.overdue.xData = xData;
                let obj = {};
                obj.data = overdue;
                obj.name = '逾期未巡查数';
                obj.type = 'bar';
                obj.barWidth = 50;
                this.overdue.seriesData = [];
                this.overdue.seriesData.push(obj);
                echartFun.oneBarEchart(this.overdue.legendData,this.overdue.xData,this.overdue.seriesData,"overdue");
            })
        },
        getEntityCoverageChart(){
            let params = {
                'startDate':this.specialBeginTime, 
                'endDate' : this.specialOverTime,
                'quanLevel': this.quanLevel,
                'riskLevel' : this.riskLevel,
            };
            getSituation.getEntityCoverageChart(params).then((data)=>{
                let xData = [];
                let coverage = [];// 主体覆盖率
                for(var i=0;i<data.data.length;i++){
                    xData.push(data.data[i].deptName);
                    coverage.push(data.data[i].entityCoverage);
                }

                // 主体覆盖率
                this.coverage.legendData = ['主体覆盖率'];
                this.coverage.xData = xData;
                let obj = {};
                obj.data = coverage;
                obj.name = '主体覆盖率';
                obj.type = 'bar';
                obj.barWidth = 50;
                this.coverage.seriesData = [];
                this.coverage.seriesData.push(obj);
                echartFun.oneBarEchart(this.coverage.legendData,this.coverage.xData,this.coverage.seriesData,"coverage");
            })
        },
        getToBeOverdueChart(){
          let params = {'startDate' : this.specialBeginTime, 'endDate' : this.specialOverTime};
            getSituation.getToBeOverdueChart(params).then((data)=>{
                let xData = [];
                let aboutOf = [];// 即将逾期数
                for(var i=0;i<data.data.length;i++){
                    xData.push(data.data[i].deptName);
                    aboutOf.push(data.data[i].toBeOverdue);
                }


                // 即将逾期数
                this.aboutOf.legendData = ['即将逾期数'];
                this.aboutOf.xData = xData;
                let obj = {};
                obj.data = aboutOf;
                obj.name = '即将逾期数';
                obj.type = 'bar';
                obj.barWidth = 50;
                this.aboutOf.seriesData = [];
                this.aboutOf.seriesData.push(obj);
                echartFun.oneBarEchart(this.aboutOf.legendData,this.aboutOf.xData,this.aboutOf.seriesData,"aboutOf");
            })
        },
        getDaily(){
          let params = {'startDate' : this.dailyBeginTime, 'endDate' : this.dailyOverTime};
            getSituation.getDailyData(params).then((data)=>{
                this.dailyData = data.data;
                this.getEntityCoverageChart();
            })
        },
        //动态巡查
        dynamicFn(){
            getSituation.getDynamic().then(res=>{
              this.updateTable(this.dynamic,res.data,5,10,()=>{
                  setTimeout(()=>{
                      if(this.willDestroy) return
                      this.dynamicFn()
                  },10000)
               });
            })
        },
        //更新表格 @updateObj 更细的数据对象，@dataSource 数据源 ，@limit 显示格式，@time 间隔时间 @callback数据滚完一遍重新请求新的数据
        updateTable(updateObj,dataSource=[],limit=5,time=5,callback){
            let dynamicNum = 0
            handle()
            let timeID = setInterval(handle,time*1000)
            function handle(){
                try {
                        updateObj.splice(0,updateObj.length);
                        dynamicNum ++;
                        let newArr = dataSource.slice((dynamicNum-1)*limit,dynamicNum*limit);
                        if((dataSource.length%2 != 0) && (dynamicNum*limit >= dataSource.length)){
                                newArr =  dataSource.slice((dynamicNum-1)*limit,dataSource.length);
                        }
                        for(let i=0;i<newArr.length;i++){
                                updateObj.push(newArr[i]);
                        }
                        if(dynamicNum*limit>=dataSource.length){
                                clear()
                                callback()
                        }
                } catch (error) {
                    clearInterval(timeID)
                    timeID = null;

                }
            }

            function clear() {
              clearInterval(timeID);
              timeID = null;
              dynamicNum = null;
              limit = null;
              updateObj = null;
              dataSource = null;
              time = null;
            }
        },
        getReportDaily(){
            getSituation.getReportDaily(this.reportStartDate,this.reportEndDate,this.rank).then((data)=>{
                this.report = data.data;
            })
        },
        go(name,stateTxt){
            let stateT = stateTxt || '';
            this.$router.push({
                name: name,
                query:{
                    stateTxt:stateT
                }
            })
        },
        listDictUserItemByDictCode(dictCode){
            plan.listDictUserItemByDictCode(dictCode).then((data)=>{
                if (dictCode == 'OTHER_RISK') {
                    this.riskLevelLis = data.data;
                    this.riskLevelLis.unshift({code:'',name:"全部"})
                } else {
                    this.quanLevelLis = data.data;
                    this.quanLevelLis.unshift({code:'',name:"全部"})
                }
            })
        }
    },
    components: {
        YbSlider
    },
    data() {
        return {
            willDestroy:false,
            specialBeginTime:null,
            specialOverTime:null,
            dailyBeginTime:null,
            dailyOverTime:null,
            reportStartDate:null,
            reportEndDate:null,
            mess: {
               chooseOne: 0,
               chooseTwo: 0
            },
            PlanStateList:[
                {
                    name:"巡查结果分布"
                },{
                    name:"处理方式分布"
                }
            ],
            muchDatas:[
                {
                    name:"统计报表"
                },{
                    name:"巡查动态"
                },{
                    name:"累计巡查次数"
                },{
                    name:"主体覆盖率"
                },{
                    name:"逾期未巡查数"
                },{
                    name:"即将逾期"
                }
            ],
            rank:'',
            rankLis:[
                {
                    type:'累计巡查',
                    key: "totalPatrol"
                },{
                    type:'主体覆盖率',
                    key: "entityCoverage"
                },{
                    type:'逾期未巡查',
                    key: "overdueNotPatrolNum"
                },{
                    type:'即将逾期',
                    key: "toBeOverdueNum"
                }
            ],
            report:[],
            dynamic:[],
            specialData:{},
            dailyData:{},
            inconformity:0,
            resultDistribution:{},
            typeDistribution:{},
            total:{},
            coverage:{},
            overdue:{},
            aboutOf:{},
            quanLevel:'',
            riskLevel:'',
            quanLevelLis:null,
            riskLevelLis:null
        }
    }
}
</script>

<style scoped lang="scss">
.content{
    background-color: #edf0f3;
    padding: 20px;
    margin-top: 20px;
    margin-left: -20px;
    width: calc(100% + 20px);
     .timeBox{
        margin-bottom: 20px;
         span{
            font-size: 16px;
            color: #6D7787;
         }
     }
     .specialData{
        margin-bottom:20px;
        margin-right: 20px;
         div{
            width: 23%;
            padding: 15px 0 20px;
         }
     }
     .dailyData{
        margin-bottom: 20px;
        overflow:hidden;
         .dataBox{
            width: 59%;
            background-color: #fff;
            padding: 20px;
            float: left;
             .topDataBox{
                justify-content: space-between;
                 div{
                    width: 31%;
                    padding: 28px 0 32px;
                 }
             }
             .bottomDataBox{
                padding: 0;
                justify-content: space-between;
                 div{
                    width: 48%;
                    padding: 28px 0 32px;
                 }
                 div:first-child{
                    border-left: 6px solid #FA503B;
                 }
                 div:last-child{
                    border-left: 6px solid #FFCF69;
                 }
             }
         }
         .echartBox{
            width: 35%;
            background-color: #fff;
            float: right;
            margin-right: 20px;
            position: relative;
            height: 357px;
             .echart{
                height: 305px;
                position: absolute;
                background-color: #fff;
                top: 52px;
                left: 0;
                bottom: 0;
                right: 0;
                opacity: 0;
                z-index: -1;
             }
             .echartIndex{
                opacity: 1 !important;
                z-index: 6;
             }
         }
     }
     .muchDataBox{
        margin: 20px 20px 0 0;
        background-color: #fff;
     }
}
.aloneDiv{
    padding: 20px 0;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    div{
        background-color: #edf0f3;
        text-align: center;
        border: 1px solid #edf0f3;
        cursor: pointer;
         h3{
            font-size: 30px;
            color: #333333;
         }
         p{
            font-size: 14px;
            color: #A2AAB6;
         }
    }
    div:hover{
        border: 1px solid #0DB5EF;
        background-color: #fff;
     }
}
.sleq{
    margin: 0 5px 0 25px;
}
.slez{
    margin-left: 5px;
}
.tab-box {
    width: 100%;
    display: flex;
    position: relative;
}
.tab-box .tab-bott {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #EBF1F5;
}
.tab-box li {
    width: 130px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #9A9A9A;
    text-align: center;
}
.tab-box .li-bott {
    border-bottom: 2px solid #0DB5EF;
    position: relative;
    color: #393939;
}

.resultStrSpan{
    display: inline-block;
    padding: 0 5px;
    border-radius: 4px;
    font-size: 12px;
}
.okSpan{
    background: #ECF9F0;
    border: 1px solid #B9E7C7;
    color: #32C25E;
}
.noSpan{
    background: #FFF0EE;
    border: 1px solid #FFC0C0;
    color: #FA503B;
}
.echa{
    width: 100%;
    height: 340px;
}
.eBoxClass{
    padding: 20px;
    background-color: #fff;
    position: absolute;
    top: -170px;
    left: 0;
    z-index: -1;
    width: calc(100% - 40px);
    opacity: 0;
}
.zIndex99{
    z-index: 99 !important;
    opacity: 1 !important;
    top: 0px !important;
}
</style>

<template>
    <div class="city">
        <div class="page-tilt">
            <b></b><span>配送商溯源监管</span>
        </div>
        <div class="main_content">
            <!-- 1 -->
            <section class="item1 clearfix">
                <div class="floatL">
                    <p>溯源纳入情况</p>
                    <div class="textC">
                        <p><span style="color:#393939;font-size:36px;" >{{ sourceNunber }}</span><span style="font-size:36px;"></span>家</p>
                        <p>配送商数量</p>
                    </div>
                </div>
                <div class="floatR">
                    <div class="inquireBtn  relative">
                        <span class="fs14 col999"><span class="tipBAR mr10">!</span>点击此柱状图可查询详细溯源信息</span>
                         <el-button class="absolute btn" type="primary" @click="go">综合查询分析</el-button>
                    </div>
                    <div style="width:100%;height:calc(100% - 44px);" id="bar1">
                        <div class="partlyLoading"><div>拼命加载中...</div></div>
                    </div>
                </div>
            </section>
            <!-- 2 -->
            <section class="item2">
                <div class="date boxSB">
                    <el-date-picker
                    v-model="seldate"
                    type="month"
                    @change="use_()"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="info">
                    <div class="floatL">
                        <p>
                            {{ useNumber.m }}月溯源平台使用情况 
                            <span class="areaRankBtn fr" @click="areaRank">区域排名</span>
                        </p>
                        <div class="textC">
                            <p style="color:#393939;font-size:36px;">{{ useNumber.rate }}</p>
                            <p>全市溯源平台使用率</p>
                        </div>
                    </div>
                    <div class="floatR">
                        <div style="width:100%;height:100%;" id="usearea">
                             <div class="partlyLoading"><div>拼命加载中...</div></div>
                        </div>
                    </div>
                </div>
               
            </section>
            <!-- 3 -->
            <section class="item3 boxSB">
                <div  style="width:100%;height:100%;" id="his">
                </div>
            </section>
            <!-- 4 -->
            <!-- <section class="item4 boxSB">
                <p class="fs14 col39 mb20">实时溯源数据</p>
                <el-table :data="newdata_" class="textC table-div">
                    <el-table-column show-overflow-tooltip prop="deptName" min-width="180" label="主体"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="areaName" min-width="100" label="所属区县" align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="pdtName" min-width="180" label="商品"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="sourceName" min-width="180" label="上游信息"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="inputTime" min-width="150" label="发生时间"  align="center"></el-table-column>
                </el-table>
            </section> -->
            <section class="item4 boxSB">
                <p class="fs14 col39 mb20">实时溯源数据</p>
                	<div class="tableBox">
                        <ul class="tHead">
                            <li class="td1">主体</li>
                            <li class="td2">所属区县</li>
                            <li class="td3">商品</li>
                            <li class="td4">上游信息</li>
                            <li class="td5">发生时间</li>
                        </ul>
                        <div class="tBodyBox" id="tBodyBox">
                            <div class="tBody" id="tBody">
                                <ul v-for="(item,index) in newdata_" :key="index">
                                    <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top-start">
                                         <li class="td1">{{item.deptName}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.areaName}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.pdtName" placement="top-start">
                                        <li class="td3">{{item.pdtName}}</li>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="item.sourceName" placement="top-start">
                                        <li class="td4">{{item.sourceName}}</li>
                                    </el-tooltip>
                                    <li class="td5" >{{item.inputTime}}</li>
                                </ul>
                            </div>
                             <div class="tBody" id="tBody2">
                                <ul v-for="(item,index) in newdata_" :key="index+1">
                                    <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top-start">
                                         <li class="td1">{{item.deptName}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.areaName}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.pdtName" placement="top-start">
                                        <li class="td3">{{item.pdtName}}</li>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="item.sourceName" placement="top-start">
                                        <li class="td4">{{item.sourceName}}</li>
                                    </el-tooltip>
                                    <li class="td5" >{{item.inputTime}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </section>
            <!-- 5 -->
            <section class="item5" >
                 <div class="date boxSB">
                    <el-date-picker
                    v-model="seldate"
                    type="month"
                    @change="check_()"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="info">
                    <div class="floatL relative">
                        <div style="width:100%;height:100%;" id="piebox">
                             <div class="partlyLoading"><div>拼命加载中...</div></div>
                        </div>
                    </div>
                    <div class="floatR boxSB">
                        <div class="fs14 col39 mb20">风险品种</div>
                        <el-table :data="risk_" class="textC table-div">
                            <el-table-column show-overflow-tooltip prop="pdtName" min-width="200" label="品种"  align="left"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="rate" min-width="100" label="不合格率" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="total" min-width="100" label="检测总批次"  align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="qua" min-width="100" label="合格批次"  align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="unqua" min-width="100" label="不合格批次"  align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="item5Box boxSB"  id="bar2">
                     <div class="partlyLoading"><div>拼命加载中...</div></div>
                </div>
            </section>
            <!-- 6 -->
            <section class="item6">
                 <p class="fs14 col39 mb20">实时检测数据</p>
                <!-- <el-table :data="realTimeCheck_data" class="textC table-div">
                    <el-table-column show-overflow-tooltip prop="deptName" min-width="180" label="主体"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="areaName" min-width="100" label="所属区县" align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="pdtName" min-width="180" label="商品"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="detecType" min-width="70" label="检测类型"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="actualVal" min-width="70" label="检测值"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="detecResult" min-width="70" label="检测结果"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="detecTime" min-width="150" label="检测时间"  align="center"></el-table-column>
                </el-table> -->
                <div class="tableBox tableBox2">
                        <ul class="tHead">
                            <li class="td1">主体</li>
                            <li class="td2">所属区县</li>
                            <li class="td3">商品</li>
                            <li class="td4">检测类型</li>
                            <li class="td5">检测值</li>
                            <li class="td6">检测结果</li>
                            <li class="td7">检测时间</li>
                        </ul>
                        <div class="tBodyBox" id="tBodyBox2">
                            <div class="tBody" id="tBody3">
                                <ul v-for="(item,index) in realTimeCheck_data" :key="index+2">
                                    <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top-start">
                                         <li class="td1">{{item.deptName}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.areaName}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.pdtName" placement="top-start">
                                        <li class="td3">{{item.pdtName}}</li>
                                    </el-tooltip>
                                    <li class="td4">{{item.detecType}}</li>
                                    <li class="td5" >{{item.actualVal}}</li>
                                    <li class="td6">{{item.detecResult}}</li>
                                    <li class="td7" >{{item.detecTime}}</li>
                                </ul>
                            </div>
                            <div class="tBody" id="tBody4">
                                <ul v-for="(item,index) in realTimeCheck_data" :key="index+3">
                                    <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top-start">
                                         <li class="td1">{{item.deptName}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.areaName}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.pdtName" placement="top-start">
                                        <li class="td3">{{item.pdtName}}</li>
                                    </el-tooltip>
                                    <li class="td4">{{item.detecType}}</li>
                                    <li class="td5" >{{item.actualVal}}</li>
                                    <li class="td6">{{item.detecResult}}</li>
                                    <li class="td7" >{{item.detecTime}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </section>
            <!-- 7 -->
             <section class="item7" v-show="false">
                 <p class="fs14 col39 mb20">下级区域溯源检测情况</p>
                <el-table :data="dataPage3" class="textC table-div pointerTab" @row-click="rowclick">
                    <el-table-column show-overflow-tooltip prop="area" min-width="180" label="区域"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="marketNum" min-width="100" label="批发市场数量" align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="vendorNum" min-width="100" label="商户数量"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="current" min-width="100" label="当月溯源使用率"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="lastMonth" min-width="100" label="上月溯源使用率"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="currentNum" min-width="100" label="当月检测批次"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="lastMonthNum" min-width="100" label="上月检测批次"  align="center"></el-table-column>
                </el-table>
            </section>
        </div>
         <!-- 排名list -->
        <div v-if="rankList" class="rankBox">
            <div class="rank">
                <h3>区县使用率排行 <span style="float: right;margin-right: 10px;cursor: pointer;" @click="areaRank">X</span></h3>
                <p v-for="(item,idnex) in rankData" :class="item.areaId == areaId_ ? 'theIs': '' " :key="idnex">
                    <span style="text-align: center;width: 70px;">{{item.rank}}</span>
                    <span style="width: 160px;">{{item.areaName}}</span>
                    <span class="biBo" style="margin-bottom: -5px;"><span :style="'width:' + Math.round(item.rate*100) + '%'" class="smBo"></span></span>
                    <span style="width: 190px;text-align: center;">{{ (item.rate*100).toFixed(2) }}%</span>
                    <!-- <span :class="item.ranks > 0?'':'rotate360'">
                        <i class="icon iconfont icon-arrow" v-if="item.ranks!=0" :class="item.ranks > 0?'col5e':'col3b'"></i>
                        <span v-if="item.ranks==0">--</span>
                    </span> -->
                </p >
            </div>
        </div>
    </div>
</template>

<script>
import pie_echart from "../inquire/echarts/pie_echart";
import bar_echart from "../inquire/echarts/bar_echart";
import bar2_echart from "../inquire/echarts/bar2_echart";
import barline_echart from "../inquire/echarts/bar_line_echart";
import scrollTop from "./slider";
import * as api1 from "api/trace/dlr";
export default {
  methods: {
    cb(timerObj){
      const prev = timerObj.prev;
      const current = timerObj.current;
      if(prev){
        let index = this.timer.indexOf(prev);
        if(~index){
          this.timer.splice(index,1);
        }
      }
      if(current){
        if(!this.timer.includes(current)) this.timer.push(current);
      }
      // timerObj=null;
    },
    //  获取时间处理，默认为当前时间
    getdate(date) {
      let dates = date || new Date();
      let mon = dates.getMonth() + 1; //getMonth()返回的是0-11，则需要加1
      if (mon <= 9) {
        //如果小于9的话，则需要加上0
        mon = "0" + mon;
      }
      return dates.getFullYear() + "-" + mon;
    },
    rowclick(row, event) {
      //最后一个表格没行点击的事件
      // console.log(row,event)
      this.$router.push({ name: "yb.dlrAreaChart" });
    },
    go($index, e) {
      //点击按钮是综合查询表格
      this.$router.push({ name: "yb.dlrAnalyzeInfo" });
    },
    areaRank() {
      this.rankList = !this.rankList;
    },
    use_() {
      //改变item2日期做的事
      if (this.seldate == null) {
        this.seldate = this.old;
      } else {
        api1
          .dlr_use({
            areaId: this.areaId_,
            date: this.getdate(this.seldate),
            type: "shi"
          })
          .then(d => {
            console.log(d);
            let n = d.data.total * 100;
            this.useNumber.rate = n.toFixed(2) + "%";
            this.useNumber.m = this.getdate(this.seldate).slice(5, 7);
            let useareas_ = [];
            let rate_ = [];
            let list = d.data.list;
            for (let item in list) {
              if (
                Object.prototype.toString
                  .call(list[item])
                  .slice(8, -1)
                  .toLowerCase() === "function"
              ) {
                continue;
              }
              useareas_.push(list[item].areaName);
              rate_.push((list[item].rate * 100).toFixed(2));
            }
            this.useData.name = useareas_;
            this.useData.value = rate_;
            this.useData.title =
              this.getdate(this.seldate).slice(5, 7) + "月溯源数据";
              if(!this._isDestroyed){
                   bar_echart(this.useData, "usearea", this);
              }
          });
            //排名列表
            api1
            .rankNumber({
              areaId: this.areaId_,
              date: this.getdate(this.seldate)
            })
            .then(d => {
              this.rankData = d.data;
            });
      }
    
    },
    check_() {
      api1
        .risk({
          areaId: this.areaId_,
          date: this.getdate(this.seldate)
        })
        .then(d => {
          // this.risk_=d.data;
          let rd = d.data;
          for (let item in rd) {
            if (
              Object.prototype.toString
                .call(rd[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            rd[item].rate = rd[item].rate * 100;
            rd[item].rate = rd[item].rate + "%";
          }
          this.risk_ = rd;
        });
      //检测情况
      api1
        .check({
          areaId: this.areaId_,
          date: this.getdate(this.seldate)
        })
        .then(d => {
          let name = [];
          let result = [];
          let fail = [];
          let bar2 = d.data.list;
          console.log(d.data);
          for (let item in bar2) {
            if (
              Object.prototype.toString
                .call(bar2[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            name.push(bar2[item].areaName);
            result.push(bar2[item].qua);
            fail.push(bar2[item].unqua);
          }
          this.bar2Data.nameArray = name;
          this.bar2Data.resultdata.data = result;
          this.bar2Data.faildata.data = fail;
          if(!this._isDestroyed) {
             bar2_echart(this.bar2Data, "bar2");
          }
          this.pieData.dataArray = [
            { name: "合格", value: d.data.quaTotal },
            { name: "不合格", value: d.data.unquaTotal }
          ];
          this.pieData.subtitle = "检测总批次（" + d.data.total + "次)";
          if(!this._isDestroyed){
              pie_echart(this.pieData, "piebox");
          } 
        });
    }
  },
  mounted: function() {
    this.$store.dispatch("getInfo").then(r => {
      this.areaId_ = this.$store.state.common.user.regionCode + "00";
      this.seldate = this.getdate();
      //溯源纳入情况(市区加00)
      api1
        .dlr_city({
          areaId: this.areaId_,
          type: "shi"
        })
        .then(d => {
          this.sourceNunber = d.data.dlrTotal;
          let name_ = [];
          let data_ = [];
          let id_ = [];
          let list = d.data.list;
          for (let item in list) {
            if (
              Object.prototype.toString
                .call(list[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            name_.push(list[item].areaName);
            data_.push(list[item].dlrNum);
            id_.push(list[item].areaId);
          }
          this.bar1Data.name = name_;
          this.bar1Data.value = data_;
          this.bar1Data.id = id_;
          if(!this._isDestroyed) {
            bar_echart(this.bar1Data, "bar1", this);
          }
          
        });
      // 使用率
      api1
        .dlr_use({
          areaId: this.areaId_,
          date: this.seldate,
          type: "shi"
        })
        .then(d => {
          let n = d.data.total * 100;
          this.useNumber.rate = n.toFixed(2) + "%";
          this.useNumber.m = this.seldate.slice(5, 7);
          let useareas_ = [];
          let rate_ = [];
          let list = d.data.list;
          for (let item in list) {
            if (
              Object.prototype.toString
                .call(list[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            useareas_.push(list[item].areaName);
            rate_.push((list[item].rate * 100).toFixed(2));
          }
          this.useData.name = useareas_;
          this.useData.value = rate_;
          this.useData.title = this.seldate.slice(5, 7) + "月溯源数据";
          if(!this._isDestroyed) {
            bar_echart(this.useData, "usearea", this);
          }
          
        });
      api1
        .rankNumber({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          this.rankData = d.data;
        });
      //历史情况
      api1
        .historyUse({
          areaId: this.areaId_,
          type: "shi",
          staDate: "",
          endDate: ""
        })
        .then(d => {
          let hisData = [];
          let hisRate = [];
          let month = d.data;
          for (let item in month) {
            if (
              Object.prototype.toString
                .call(month[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            hisData.push(month[item].month);
            hisRate.push((month[item].rate * 100).toFixed(2));
          }
          this.hisData.name = hisData;
          this.hisData.value = hisRate;
          if(!this._isDestroyed) {
            bar_echart(this.hisData, "his", this);
          }
          
        });
      //实时溯源数据
      api1
        .newdata({
          areaId: this.areaId_
        })
        .then(d => {
          let list = d.data;
          let new_ = [];
          for (let item in list) {
            if (
              Object.prototype.toString
                .call(list[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            new_.push(list[item]);
          }
          this.newdata_ = new_;
          // console.log(this.newdata_)
          this.$nextTick(()=>{
            if(this._isDestroyed) return
            scrollTop("tBodyBox", "tBody", "tBody2",this.cb)
          });
        });
      //风险品种
      api1
        .risk({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          // this.risk_=d.data;
          let rd = d.data;
          for (let item in rd) {
            if (
              Object.prototype.toString
                .call(rd[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            rd[item].rate = rd[item].rate * 100;
            rd[item].rate = rd[item].rate + "%";
          }
          this.risk_ = rd;
        });
      //检测情况
      api1
        .check({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          let name = [];
          let result = [];
          let fail = [];
          let bar2 = d.data.list;
          for (let item in bar2) {
            if (
              Object.prototype.toString
                .call(bar2[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            name.push(bar2[item].areaName);
            result.push(bar2[item].qua);
            fail.push(bar2[item].unqua);
          }
          this.bar2Data.nameArray = name;
          this.bar2Data.resultdata.data = result;
          this.bar2Data.faildata.data = fail;
          if(!this._isDestroyed) {
             bar2_echart(this.bar2Data, "bar2");
          }
          this.pieData.dataArray = [
            { name: "合格", value: d.data.quaTotal },
            { name: "不合格", value: d.data.unquaTotal }
          ];
          this.pieData.subtitle = "检测总批次（" + d.data.total + "次)";
          if(!this._isDestroyed){
            pie_echart(this.pieData, "piebox");
          } 
          
        });
      //检测动态
      api1
        .realTimeCheck({
          areaId: this.areaId_
        })
        .then(d => {
          let cd = d.data;
          for (let item in cd) {
            if (
              Object.prototype.toString
                .call(cd[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            if (cd[item].detecResult == "QUA") {
              cd[item].detecResult = "合格";
            } else if (cd[item].detecResult == "UNQUA") {
              cd[item].detecResult = "不合格";
            }
          }
          this.realTimeCheck_data = cd;
          this.$nextTick(()=>{
            if(this._isDestroyed) return
            scrollTop("tBodyBox2", "tBody3", "tBody4",this.cb)
          })
        });
    });

    //    barline_echart(this.barlineData,"barline");
  },
  watch: {
    seldate: function(val, oldVal) {
      this.old = this.getdate(new Date(oldVal));
    }
  },
  beforeDestroy(){
    this.timer.forEach(item=>{
      clearInterval(item);
      item = null;
    })
  },
  data() {
    return {
      timer:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      risk_: [], //风险品种
      rankList: false, //排名list
      rankData: [], //排名数据
      sourceNunber: 0, //溯源纳入情况
      newdata_: [], //实时动态数据
      useNumber: {
        rate: "0%",
        m: "0"
      }, //使用率
      seldate: this.getdate(), //日期时间
      old: "", //如果选择器=null，数据还是上一次选择的时间
      areaId_: "", //地区id
      realTimeCheck_data: [],
      dataPage3: [
        {
          area: "高新区",
          marketNum: "55",
          vendorNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          vendorNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          vendorNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          vendorNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "合计",
          marketNum: "55",
          vendorNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        }
      ],

      pieData: {
        nameArray: ["合格", "不合格"],
        dataArray: [{ name: "合格", value: "" }, { name: "不合格", value: "" }],
        title: "检测情况",
        subtitle: ""
      },
      useData: {
        title: "",
        formatter: {
          y: "{value} %",
          tooltip: "%",
          Ttext: "溯源使用率"
        }
      },
      hisData: {
        title: "历史溯源平台使用情况趋势图",
        formatter: {
          y: "{value} %",
          tooltip: "%",
          Ttext: "溯源使用率"
        },
        dataZoom: false,
        gridB: "5%",
        rotate: 0
      },
      bar1Data: {
        title: "",
        url: "yb.dlrAreaChart",
        formatter: {
          y: "{value} 家",
          tooltip: "家",
          Ttext: "主体数量"
        }
      },
      bar2Data: {
        nameArray: ["合格1", "不合格2", "合格3", "不合格4", "合格5", "不合格"],
        resultdata: {
          name: "合格",
          data: ["5555", "55", "881", "785", "788", "445"]
        },
        faildata: {
          name: "不合格",
          data: ["155", "15", "120", "350", "450", "280"]
        }
      },
      barlineData: {
        title: "历史溯源33333",
        bar: {
          name: "实际数量",
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            3
          ]
        },
        line: {
          name: "使用率",
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            3
          ]
        },
        xAxis: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      }
    };
  }
};
</script>

<style scoped lang="sass">
    .city{
        background: #edf0f3;
        width:calc(100% + 40px);
        position: relative;
        left: -20px;
        height: 2750px !important;
    }
    .bigbox{
        position: relative;
    }
    .page-tilt{
        background: #ffffff;
        padding: 12.5px 0 12.5px 20px;
    }
    .main_content{
        padding: 20px;
        width: calc(100% - 40px);
        /* display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between; */
    }
    .main_content>section{
        background: #fff;
        width: 100%;
        margin-bottom: 20px;
    }
    .item1{
        height: 340px;
    }
    .item1>.floatL{
        width:30%;
        height:100%;
        border-right:1px  #EDF0F3 solid;
        padding: 20px;
         box-sizing: border-box;
    }
    .item1>.floatL>p{
        color: #393939;
        font-size: 14px;
    }
    .item1>.floatL>div{
        color: #9199A7;
        font-size: 14px;
        margin-top: 100px;
    }
    .item1>.floatR{
        height: 100%;
        width:70%;
        padding:20px 20px 0px 20px;
        box-sizing: border-box;
    }
    .inquireBtn{
        height: 34px;
    }
     .inquireBtn>.btn{
       right: 0;
    }
     .item2{
        height: 415px;
    }
    .item2>.date{
        height: 74px;
        padding: 20px;
        border-bottom:1px  #EDF0F3 solid;
    }
  
    .item2 .info>.floatL{
        width:30%;
        height:340px;
        border-right:1px  #EDF0F3 solid;
        padding: 20px;
         box-sizing: border-box;
    }
    .item2 .info>.floatL>p{
        color: #393939;
        font-size: 14px;
    }
    .item2 .info>.floatL>div{
        color: #9199A7;
        font-size: 14px;
        margin-top: 100px;
    }
    .item2 .info>.floatR{
        height: 340px;
        width:70%;
        padding:20px 20px 10px 20px;
        box-sizing: border-box;
    }
    .item3{
        width: 100%;
        height: 340px;
        padding: 20px 20px 10px 20px;
    }
    .item4{
        min-height: 337px;
        padding: 20px;
    }
    .item5{
        height: 724px;
    }
     .item5>.date{
        height: 74px;
        padding: 20px;
        border-bottom:1px  #EDF0F3 solid;
    }
    .item5 .info{
        border-bottom:1px  #EDF0F3 solid;
        min-height: 280px;
    }
    .item5 .info>.floatL{
        width:30%;
        height:280px;
        border-right:1px  #EDF0F3 solid;
        padding: 20px;
        box-sizing: border-box;
    }
    .item5 .info>.floatR{
        height: 280px;
        width:70%;
        padding:20px;
        box-sizing: border-box;
    }
    .item5>.item5Box{
        height: 340px;
        padding: 20px;
    }
    .item6,.item7{min-height: 288px;padding: 20px;box-sizing: border-box}
    .item6{
        height: 354px;
    }
    /*滚动表格*/
    .tableBox{
        width: 100%;
        height: 255px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 100%;
        max-width: 100%;
        border: 1px solid #ebeef5 ;
        /*border-bottom: 0!important;*/
	}
			.tableBox .tHead{
				height: 45px;
				line-height: 45px;
				background: #F1F4F7;
				color: #909399;
				font-weight: 100;
				font-size: 12px;
			}
			.tableBox li{
				padding: 0 5px;
				box-sizing: border-box;
				text-align: left;
				float: left;
				list-style: none;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			.tableBox ul:after{
				content: "";
				clear: both;
				display: block;
				height: 0;
			}
			.tBodyBox{
				height: 210px;
                overflow: hidden;
                transition: all 0.5s;
                -moz-transition: all 0.5s;
                -webkit-transition: all 0.5s;
                -o-transition: all 0.5s;
			}
			.tBody{
                width: 100%;
                min-height: 820px;
			}
			.tBody ul{
				border-bottom: 1px solid #ebeef5;
				line-height: 41px;
				height: 41px;
			 	color: #787878;
			 	font-size: 14px;
			}
			.tBody ul:hover{
				background: #F4F6F9;
			}
			.td1{
				width: 25%;
			}
			.td2{
				width: 10% ;
			}
			.td3{
				width: 25%;
			}
			.td4{
				width: 20%;
			}
			.td5{
				width: 20%;
				text-align: center !important;
            }
            .tableBox2 .td1{
                width: 20%;
            }
            .tableBox2 .td2{
                width: 15%;
            }
            .tableBox2 .td3{
                width: 20%;
            }
            .tableBox2 .td4{
                width: 10%;
            }
            .tableBox2 .td5{
                width: 10%;
            }
            .tableBox2 .td6{
                width: 10%;
            }
            .tableBox2 .td7{
                width: 15%; 
                text-align: center !important;
            }
             /*排名*/
   
.rankBox{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(155,155,155,.5);
        z-index: 9999;
        overflow: auto;
        padding-bottom: 20px;
    }
    .rank{
        background-color: #fff;
        width: 900px;
        margin: 80px auto 0;
        border-radius: 5px;
        color: #7c7d7e;
        padding-bottom: 20px;
         h3{
            font-size: 18px;
            font-weight: 500;
            padding: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
         }
         p{
            margin: 5px 0;
            line-height: 40px;
            height: 40px;
            padding: 0 28px;
             span{
                display: inline-block;
             }
         }
    }
    .biBo{
        width: 400px;
        display: inline-block;
        background-color: #c0c0c0;
        position: relative;
        height: 20px;
    }
    .smBo{
        display: inline-block;
        background-color: #f05050;
        position: absolute;
        left: 0;
        top: 0;
        height: 20px;
    }
    .theIs{
        background-color: #ccc;
    }
    .rotate360{
        transform: rotateX(180deg);
    }
    .col5e{
        color: #32c25e;
    }
    .col3b{
        color: #fa503b;
    }
    .areaRankBtn{
        color: rgb(13, 181, 239);
        cursor: pointer;
        font-size: 14px;
        width: 65px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid rgb(13, 181, 239);
        -moz-border-radius: 3px; 
        -webkit-border-radius: 3px; 
        border-radius: 3px;
        
    }
    .areaRankBtn:hover{
        background: rgba(13, 181, 239,0.3);
        border: 1px solid rgba(13, 181, 239,0.3);
        color: #fff;
    }
</style>

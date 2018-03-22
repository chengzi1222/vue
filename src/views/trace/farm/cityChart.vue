<template>
    <div class="city">
        <div class="page-tilt">
            <b></b><span>农贸市场溯源监管</span>
        </div>
        <div class="main_content">
            <!-- 1 -->
            <section class="item1 clearfix">
                <div class="floatL">
                    <p>溯源纳入情况</p>
                    <div class="textC">
                        <p><span style="color:#393939;font-size:36px;" >{{ sourceNunber }}</span><span style="font-size:36px;"></span>家</p>
                        <p>农贸市场数量</p>
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
                        <p>{{ useNumber.m }}月溯源平台使用情况</p>
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
                     <div class="partlyLoading"><div>拼命加载中...</div></div>
                </div>
            </section>
            <!-- 4 -->
            <section class="item4 boxSB">
                <p class="fs14 col39 mb20">实时溯源数据</p>
                <!-- <el-table :data="newdata_" class="textC table-div">
                    <el-table-column show-overflow-tooltip prop="market" min-width="180" label="主体"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="area" min-width="100" label="所属区县" align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="goods" min-width="180" label="商品"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="from" min-width="180" label="上游信息"  align="left"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="date" min-width="150" label="发生时间"  align="center"></el-table-column>
                </el-table> -->
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
                                    <el-tooltip class="item" effect="dark" :content="item.market" placement="top-start">
                                         <li class="td1">{{item.market}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.area}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.goods" placement="top-start">
                                        <li class="td3">{{item.goods}}</li>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="item.from" placement="top-start">
                                        <li class="td4">{{item.from}}</li>
                                    </el-tooltip>
                                    <li class="td5" >{{item.date}}</li>
                                </ul>
                            </div>
                             <div class="tBody" id="tBody2">
                                <ul v-for="(item,index) in newdata_" :key="index+1">
                                     <el-tooltip class="item" effect="dark" :content="item.market" placement="top-start">
                                         <li class="td1">{{item.market}}</li>
                                    </el-tooltip>
                                    <li class="td2">{{item.area}}</li>
                                    <el-tooltip class="item" effect="dark" :content="item.goods" placement="top-start">
                                        <li class="td3">{{item.goods}}</li>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="item.from" placement="top-start">
                                        <li class="td4">{{item.from}}</li>
                                    </el-tooltip>
                                    <li class="td5" >{{item.date}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </section>
            <!-- 5 -->
            <section class="item5" v-show="shows" key="c">
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
                    <div class="floatL relative">
                        <div style="width:100%;height:100%;" id="piebox">
                             <div class="partlyLoading"><div>拼命加载中...</div></div>
                        </div>
                    </div>
                    <div class="floatR boxSB">
                        <div class="fs14 col39 mb20">风险品种</div>
                        <el-table :data="dataNum" class="textC table-div">
                            <el-table-column show-overflow-tooltip prop="type" min-width="200" label="品种"  align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="fail" min-width="100" label="不合格率" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="checkAllNum" min-width="100" label="检测总批次"  align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="passNum" min-width="100" label="合格批次"  align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="failNum" min-width="100" label="不合格批次"  align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="item5Box boxSB" style="background:pink;" id="bar2">
                     <div class="partlyLoading"><div>拼命加载中...</div></div>
                </div>
            </section>
            <!-- 6 -->
            <section class="item6" v-show="shows" key="b">
                 <p class="fs14 col39 mb20">检测动态情况</p>
                <el-table :data="dataPage2" class="textC table-div">
                    <el-table-column show-overflow-tooltip prop="vendor" min-width="180" label="主体"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="area" min-width="150" label="所属区县" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="pdt" min-width="180" label="商品"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="checkType" min-width="150" label="检测类型"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="num" min-width="100" label="检测值"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="result" min-width="100" label="检测结果"  align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="date" min-width="150" label="检测时间"  align="center"></el-table-column>
                </el-table>
            </section>
            <!-- 7 -->
             <section class="item7" v-show="shows" key="a">
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
    </div>
</template>

<script>
import pie_echart from "../inquire/echarts/pie_echart";
import bar_echart from "../inquire/echarts/bar_echart";
import bar2_echart from "../inquire/echarts/bar2_echart";
import barline_echart from "../inquire/echarts/bar_line_echart";
import * as api from "api/trace/farm";
import scrollTop from "../dlr/slider";
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
      this.$router.push({ name: "yb.areaChart" });
    },
    go() {
      //点击按钮是综合查询表格
      this.$router.push({ name: "yb.farmAnalyzeInfo" });
    },
    use_() {
      //改变item2日期做的事
      if (this.seldate == null) {
        this.seldate = this.old;
      } else {
        api
          .use({
            areaId: this.areaId_,
            date: this.getdate(this.seldate)
          })
          .then(d => {
            let n = d * 100;
            this.useNumber.rate = n.toFixed(2) + "%";
            this.useNumber.m = this.getdate(this.seldate).slice(5, 7);
          });
        api
          .useareas({
            areaId: this.areaId_,
            date: this.getdate(this.seldate)
          })
          .then(d => {
            let useareas_ = [];
            let rate_ = [];
            for (let item in d) {
              if (
                Object.prototype.toString
                  .call(d[item])
                  .slice(8, -1)
                  .toLowerCase() === "function"
              ) {
                continue;
              }
              useareas_.push(d[item].areaName);
              rate_.push((d[item].rate * 100).toFixed(2));
            }
            this.useData.name = useareas_;
            this.useData.value = rate_;
            this.useData.title =
            this.getdate(this.seldate).slice(5, 7) + "月溯源数据";
            if(!this._isDestroyed) {
                bar_echart(this.useData, "usearea");
            }
          });
      }
    }
  },
  watch: {
    seldate: function(val, oldVal) {
      this.old = this.getdate(new Date(oldVal));
    }
  },
  mounted: function() {
    this.$store.dispatch("getInfo").then(r => {
      this.seldate = this.getdate();
      this.areaId_ = this.$store.state.common.user.regionCode + "00";
      //溯源纳入情况_批发市场总数(市区加00)
      api
        .total({
          areaId: this.areaId_
        })
        .then(d => {
          this.sourceNunber = d;
          console.log(d, 1);
        });
      //溯源纳入情况_批发市场区域图表
      api
        .areas({
          areaId: this.areaId_
        })
        .then(d => {
          let name_ = [];
          let data_ = [];
          let id_ = [];
          for (let item in d) {
            if (
              Object.prototype.toString
                .call(d[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            name_.push(d[item].areaName);
            data_.push(d[item].cnt);
            id_.push(d[item].areaId);
          }
          this.bar1Data.name = name_;
          this.bar1Data.value = data_;
          this.bar1Data.id = id_;
          if(!this._isDestroyed) {
              bar_echart(this.bar1Data, "bar1", this);
          }
          
        });
      // 使用率
      api
        .use({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          let n = d * 100;
          this.useNumber.rate = n.toFixed(2) + "%";
          this.useNumber.m = this.seldate.slice(5, 7);
        });
      api
        .useareas({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          let useareas_ = [];
          let rate_ = [];
          for (let item in d) {
            if (
              Object.prototype.toString
                .call(d[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            useareas_.push(d[item].areaName);
            rate_.push((d[item].rate * 100).toFixed(2));
          }
          this.useData.name = useareas_;
          this.useData.value = rate_;
          this.useData.title = this.seldate.slice(5, 7) + "月溯源数据";
          if(!this._isDestroyed) {
            bar_echart(this.useData, "usearea", this);
          }
          
        });
      //历史情况
      api
        .history({
          areaId: this.areaId_,
          date: this.seldate
        })
        .then(d => {
          let hisData = [];
          let hisRate = [];
          for (let item in d) {
            if (
              Object.prototype.toString
                .call(d[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            hisData.push(d[item].date);
            hisRate.push((d[item].rate * 100).toFixed(2));
          }
          this.hisData.name = hisData.reverse();
          this.hisData.value = hisRate.reverse();
          if(!this._isDestroyed) {
            bar_echart(this.hisData, "his", this);
          }
          
        });
      //实时溯源数据
      api
        .newdata({
          areaId: this.areaId_
        })
        .then(d => {
          let new_ = [];
          for (let item in d) {
            if (
              Object.prototype.toString
                .call(d[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            new_.push(d[item]);
          }
          this.newdata_ = new_;
          this.$nextTick(()=>{
            if(this._isDestroyed) return
            scrollTop("tBodyBox", "tBody", "tBody2",this.cb)
          });
        });
      if(!this._isDestroyed) {
        pie_echart(this.pieData, "piebox");
      }
      
    });
    //    bar2_echart(this.bar2Data,"bar2");
    //    barline_echart(this.barlineData,"barline");
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
      shows: false,
      sourceNunber: 0, //溯源纳入情况
      newdata_: [], //实时动态数据
      useNumber: {
        rate: "0%",
        m: "0"
      }, //使用率
      seldate: this.getdate(), //日期时间
      old: "", //如果选择器=null，数据还是上一次选择的时间
      // areaId_:this.$store.state.common.user.regionCode+"00",//地区id
      areaId_: "", //地区id
      dataPage2: [
        {
          vendor: "张家院子小卖店张家院子小卖店张家院子小",
          area: "高新区",
          pdt: "胡萝卜",
          checkType: "萝卜",
          num: "南城市场",
          topinfo: "南城市场",
          result: "及格",
          date: "2018-2-28 12:55"
        },
        {
          vendor: "张家院子小卖店张家院子小卖店张家院子小",
          area: "高新区",
          pdt: "胡萝卜",
          checkType: "萝卜",
          num: "南城市场",
          topinfo: "南城市场",
          result: "及格",
          date: "2018-2-28 12:55"
        },
        {
          vendor: "张家院子小卖店张家院子小卖店张家院子小",
          area: "高新区",
          pdt: "胡萝卜",
          checkType: "萝卜",
          num: "南城市场",
          topinfo: "南城市场",
          result: "及格",
          date: "2018-2-28 12:55"
        },
        {
          vendor: "张家院子小卖店张家院子小卖店张家院子小",
          area: "高新区",
          pdt: "胡萝卜",
          checkType: "萝卜",
          num: "南城市场",
          topinfo: "南城市场",
          result: "及格",
          date: "2018-2-28 12:55"
        }
      ],
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
      dataNum: [
        {
          type: "豆类",
          fail: "50%",
          checkAllNum: "30",
          passNum: "15",
          fail: "15"
        },
        {
          type: "豆类",
          fail: "50%",
          checkAllNum: "30",
          passNum: "15",
          fail: "15"
        },
        {
          type: "豆类",
          fail: "50%",
          checkAllNum: "30",
          passNum: "15",
          fail: "15"
        },
        {
          type: "豆类",
          fail: "50%",
          checkAllNum: "30",
          passNum: "15",
          fail: "15"
        }
      ],
      pieData: {
        nameArray: ["合格", "不合格"],
        dataArray: [
          { name: "合格", value: "5565" },
          { name: "不合格", value: "556" }
        ]
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
        url: "yb.farmAreaChart",
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

<style scoped>
.city {
  background: #edf0f3;
  width: calc(100% + 40px);
  position: relative;
  left: -20px;
  height: 1650px !important;
}
.bigbox {
  position: relative;
}
.page-tilt {
  background: #ffffff;
  padding: 12.5px 0 12.5px 20px;
}
.main_content {
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
.main_content > section {
  background: #fff;
  width: 100%;
  margin-bottom: 20px;
}
.item1 {
  height: 340px;
}
.item1 > .floatL {
  width: 30%;
  height: 100%;
  border-right: 1px #edf0f3 solid;
  padding: 20px;
  box-sizing: border-box;
}
.item1 > .floatL > p {
  color: #393939;
  font-size: 14px;
}
.item1 > .floatL > div {
  color: #9199a7;
  font-size: 14px;
  margin-top: 100px;
}
.item1 > .floatR {
  height: 100%;
  width: 70%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
}
.inquireBtn {
  height: 34px;
}
.inquireBtn > .btn {
  right: 0;
}
.item2 {
  height: 415px;
}
.item2 > .date {
  height: 74px;
  padding: 20px;
  border-bottom: 1px #edf0f3 solid;
}
.item2 .info > .floatL {
  width: 30%;
  height: 340px;
  border-right: 1px #edf0f3 solid;
  padding: 20px;
  box-sizing: border-box;
}
.item2 .info > .floatL > p {
  color: #393939;
  font-size: 14px;
}
.item2 .info > .floatL > div {
  color: #9199a7;
  font-size: 14px;
  margin-top: 100px;
}
.item2 .info > .floatR {
  height: 340px;
  width: 70%;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
}
.item3 {
  width: 100%;
  height: 340px;
  padding: 20px 20px 10px 20px;
}
.item4 {
  min-height: 288px;
  padding: 20px;
}
.item5 {
  height: 724px;
}
.item5 > .date {
  height: 74px;
  padding: 20px;
  border-bottom: 1px #edf0f3 solid;
}
.item5 .info {
  border-bottom: 1px #edf0f3 solid;
  min-height: 310px;
}
.item5 .info > .floatL {
  width: 30%;
  height: 310px;
  border-right: 1px #edf0f3 solid;
  padding: 20px;
  box-sizing: border-box;
}
.item5 .info > .floatR {
  height: 310px;
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
}
.item5 > .item5Box {
  height: 340px;
  padding: 20px;
}
.item6,
.item7 {
  min-height: 288px;
  padding: 20px;
  box-sizing: border-box;
}
/*滚动表格*/
.tableBox {
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
  border: 1px solid #ebeef5;
  /*border-bottom: 0!important;*/
}
.tableBox .tHead {
  height: 45px;
  line-height: 45px;
  background: #f1f4f7;
  color: #909399;
  font-weight: 100;
  font-size: 12px;
}
.tableBox li {
  padding: 0 5px;
  box-sizing: border-box;
  text-align: left;
  float: left;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableBox ul:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
}
.tBodyBox {
  height: 210px;
  overflow: hidden;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
}
.tBody {
  width: 100%;
  min-height: 820px;
}
.tBody ul {
  border-bottom: 1px solid #ebeef5;
  line-height: 41px;
  height: 41px;
  color: #787878;
  font-size: 14px;
}
.tBody ul:hover {
  background: #f4f6f9;
}
.td1 {
  width: 25%;
}
.td2 {
  width: 10%;
}
.td3 {
  width: 25%;
}
.td4 {
  width: 20%;
}
.td5 {
  width: 20%;
  text-align: center !important;
}
</style>

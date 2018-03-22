<template>
    <div class="area">
        <div class="page-tilt">
            <b></b><span>批发市场溯源监管{{ title == '' ? '': '-'+title }}</span><Back v-show="backshow"></Back>
        </div>
        <div class="main_content">
            <!-- 1 -->
            <section class="item1 clear_a">
                <div class="left">
                    <div class="floatL">
                        <p>溯源纳入情况</p>
                        <div class="textC">
                            <p><span style="color:#393939;font-size:36px;">{{ sourceNunber }}</span>家</p>
                            <p>批发市场数量</p>
                        </div>
                    </div>
                    <div class="floatR ">
                        <div class="clear_a" style="height:34px;">
                            <span class="fs14 col999"><span class="tipBAR mr10">!</span>点击此柱状图可查询详细溯源信息</span>
                            <el-button class="fr btn" type="primary" @click="go">综合查询分析</el-button>
                        </div>
                        <div style="width:100%;height:88%" id="inquireBar1">
                             <div class="partlyLoading"><div>拼命加载中...</div></div>
                        </div>
                    </div>
                </div>
                <div class="right fr boxSB">
                    <p class="fs14 col39 mb20">
                        低溯源预警Top5
                        <el-tooltip class="item" effect="dark" content="按最近30天内溯源排名" placement="top-start">
                              <span class="tip">!</span>
                        </el-tooltip>
                    </p>
                    <div v-for="(item,index) in low" :key="index" class="low"  :data-guid="item.areaId" >
                        <p :class="'low'+index" >No.{{ index+1 }}</p>
                        <div class="clear_a">
                        <el-tooltip class="item" effect="dark" :content="item.areaName" placement="top-start">
                            <div class="name textell">{{ item.areaName }}</div> 
                        </el-tooltip>
                        <el-progress   :stroke-width="18" :percentage="item.rate"></el-progress> 
                        </div>
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
                            <p><span style="color:#393939;font-size:36px;">{{ useNumber.rate }}</span></p>
                            <p>本市各区县排名第 <span class="rankNumber" @click="ranking"> {{ rank }} </span>名</p>
                        </div>
                    </div>
                    <div class="floatR">
                        <div style="width:100%;height:100%;" id="inquireUsearea">
                             <div class="partlyLoading"><div>拼命加载中...</div></div>
                        </div>
                    </div>
                </div>
               
            </section>
            <!-- 3 -->
            <section class="item3 boxSB">
                <div  style="width:100%;height:100%;" id="inquireHis">
                     <div class="partlyLoading"><div>拼命加载中...</div></div>
                </div>
            </section>
            <!-- 7 -->
            <section class="item7" v-show="false">
                 <p class="fs14 col39 mb20">下级区域溯源检测情况</p>
                <el-table :data="dataPage3" class="textC table-div pointerTab" @row-click="rowclick">
                    <el-table-column show-overflow-tooltip prop="area" min-width="180" label="街道"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="marketNum" min-width="100" label="批发市场数量" align="center" ></el-table-column>
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
                <h3>区县使用率排行 <span style="float: right;margin-right: 10px;cursor: pointer;" @click="ranking">X</span></h3>
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
import Back from "utils/back";
import bar_echart from "./echarts/bar_echart";
import * as api from "api/trace/inquire";
export default {
  components: {
    Back
  },
  methods: {
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
    ranking() {//排名弹框
      this.rankList = !this.rankList;
    },
    go() {
      //点击按钮是综合查询表格
      this.$router.push({ name: "yb.analyzeInfo" });
    },
    rowclick(row, event) {
      // console.log(row,event)
      this.$router.push({ name: "yb.streetChart", query: { selected: "2" } });
    },
    use_() {
      //改变日期做的事
      if (this.seldate == null) {
        this.seldate = this.old;
      } else {
        api
          .dc_rate({
            areaId: this.areaId_,
            date: this.getdate(this.seldate)
          })
          .then(d => {
            let n = d * 100;
            this.useNumber.rate = n.toFixed(2) + "%";
            this.useNumber.m = this.getdate(this.seldate).slice(5, 7);
          });
        api
          .dc_rate_areas({
            areaId: this.areaId_,
            date: this.getdate(this.seldate)
          })
          .then(d => {
            if(d.length == "0"){this.useNumber.rate  = "0.00%";};//处理无数据时的问题
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
            bar_echart(this.useData, "inquireUsearea");
          });
      }
      api.rankNum({
        areaId:this.areaId_,
        date:this.getdate(this.seldate)
      }).then(d=>{
        if(d==""){this.rank="0";}else{this.rank=d;}
      });
      api.rankList({
        areaId:this.areaId_,
        date:this.getdate(this.seldate)
      }).then(d=>{
        this.rankData=d;
      });
    },
    dc() {
      //溯源纳入情况总数
      api
        .dc({
          areaId: this.areaId_
        })
        .then(d => {
          this.sourceNunber = d;
        });
    },
    dc_areas() {
      //溯源纳入情况图表
      api
        .dc_areas({
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
          this.bar1Data.backtitle = this.title + "-"; //现在要把backtitle传过去，
          bar_echart(this.bar1Data, "inquireBar1", this);
        });
    },
    dc_rate_low() {
      //低溯源预警
      api
        .dc_rate_low({
          areaId: this.areaId_
        })
        .then(d => {
          for (let item in d) {
            if (
              Object.prototype.toString
                .call(d[item])
                .slice(8, -1)
                .toLowerCase() === "function"
            ) {
              continue;
            }
            d[item].rate = d[item].rate * 100;
            d[item].rate = Math.ceil(d[item].rate);
          }
          this.low = d;
        });
    },
    dc_rate() {
      //使用率
      api
        .dc_rate({
          areaId: this.areaId_,
          date: this.getdate()
        })
        .then(d => {
          let n = d * 100;
          this.useNumber.rate = n.toFixed(2) + "%";
          this.useNumber.m = this.getdate().slice(5, 7);
        });
      api
        .dc_rate_areas({
          areaId: this.areaId_,
          date: this.getdate()
        })
        .then(d => {
          if(d.length == "0"){this.useNumber.rate  = "0.00%";};//处理无数据时的问题
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
          this.useData.title = this.getdate().slice(5, 7) + "月溯源数据";
          bar_echart(this.useData, "inquireUsearea", this);
        });
      api.rankNum({
        areaId:this.areaId_,
        date:this.getdate()
      }).then(d=>{
        if(d==""){this.rank="0";}else{this.rank=d;}
      });
      api.rankList({
        areaId:this.areaId_,
        date:this.getdate()
      }).then(d=>{
        this.rankData=d;
      });
    },
    dc_his() {
      //历史
      api
        .dc_his({
          areaId: this.areaId_,
          date: this.getdate()
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
          bar_echart(this.hisData, "inquireHis", this);
        });
    },
    get() {
      //溯源纳入情况总数
      this.dc();
      //溯源纳入情况图表
      this.dc_areas();
      //低溯源预警
      this.dc_rate_low();
      // 使用率
      this.dc_rate();
      //历史情况
      this.dc_his();
    }
  },
  mounted: function() {
    //判断这个页面是用户直接进来，还是上一层页面进来,并且确定id
    if (this.$route.query.areaid) {
      this.areaId_ = this.$route.query.areaid;
      this.backshow = true;
      this.title = this.$route.query.name;
      this.get();
    } else {
      this.$store.dispatch("getInfo").then(r => {
        this.areaId_ = this.$store.state.common.user.regionCode;
        this.backshow = false;
        this.get();
      });
    }
  },
  watch: {
    seldate: function(val, oldVal) {
      this.old = this.getdate(new Date(oldVal));
    }
  },
  data() {
    return {
      title: "", //标题
      sourceNunber: "0", //溯源纳入总数
      seldate: this.getdate(), //日期时间
      old: "", //如果选择器=null，数据还是上一次选择的时间
      areaId_: "", //用户id
      backshow: false, //是否显示back
      rank: "0", //排名
      rankList: false, //排名list
      rankData: [], //排名数据
      useNumber: {
        rate: "0%",
        m: "0"
      }, //使用率
      useData: {
        //使用图表
        title: "",
        formatter: {
          y: "{value} %",
          tooltip: "%",
          Ttext: "溯源使用率"
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      hisData: {
        //历史溯源平台使用情况趋势图
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
      low: [], //预警top5
      bar1Data: {
        title: "",
        url: "yb.streetChart",
        formatter: {
          y: "{value} 家",
          tooltip: "家",
          Ttext: "主体数量"
        }
      },
      dataPage3: [
        {
          area: "高新区",
          marketNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "高新区",
          marketNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        },
        {
          area: "合计",
          marketNum: "55",
          current: "50%",
          lastMonth: "50%",
          currentNum: "250",
          lastMonthNum: "250"
        }
      ]
    };
  }
};
</script>

<style scoped lang="sass">
.area {
  background: #edf0f3;
  width: calc(100% + 40px);
  position: relative;
  left: -20px;
  height: 1250px !important;
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
  background: transparent !important;
}
.item1 > .left {
  height: 100%;
  width: 71%;
  background: #fff;
  margin-right: 20px;
}
.item1 > .right {
  height: 100%;
  width: calc(29% - 20px);
  background: #fff;
  padding: 20px;
}
.item1 > .left > .floatL {
  width: 30%;
  height: 100%;
  border-right: 1px #edf0f3 dashed;
  padding: 20px;
  box-sizing: border-box;
}
.item1 > .left > .floatL > p {
  color: #393939;
  font-size: 14px;
}
.item1 > .left > .floatL > div {
  color: #9199a7;
  font-size: 14px;
  margin-top: 100px;
}
.item1 > .left > .floatR {
  height: 100%;
  width: 70%;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
}
.item1 > .right .name {
  width: 33%;
  height: 21px;
  line-height: 21px;
  padding-right: 2%;
  font-size: 14px;
  margin-bottom: 12px;
}
.item1 > .right .el-progress {
  width: 65%;
  height: 21px;
  margin-bottom: 12px;
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
.item7 {
  min-height: 288px;
  padding: 20px;
  box-sizing: border-box;
}
.tip {
  border: 1px solid red;
  color: red;
  display: inline-block;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
}
.low {
  width: 100%;
  height: 50px;
}
.low > p {
  font-size: 14px;
  color: #393939;
}
.low > .low0 {
  color: #2694ca;
}
.low > .low1 {
  color: #0db5ef;
}
.low > .low2 {
  color: #92e6ff;
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

</style>

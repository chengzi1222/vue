<template>
    <div class="area">
        <div class="page-tilt">
            <b></b><span>批发市场溯源监管-批发市场溯源监管-xxxxx-xxxx-xxxxxx</span><Back></Back>
        </div>
        <div class="main_content">
            <!-- 1 -->
           <section class="item1 clear_a">
                <div class="left boxSB">
                    <p class="fs14 col39" >商户基本信息</p>
                    <div class="clear_a panel">
                        <ul class="clear_a fs14">
                           <li><span class="leftName">所属批发市场：</span><span class="rightText">白家批发市场</span></li>
                           <li><span class="leftName">联系方式：</span><span  class="rightText">15245687245</span></li>
                           <li><span class="leftName">摊位号：</span><span  class="rightText">45号</span></li>
                           <li><span class="leftName">经营地址：</span><span  class="rightText">白家批发市场45号好利来又有大肉铺</span></li>
                           <li><span class="leftName">责任人：</span><span  class="rightText">陈志强</span></li>
                        </ul>
                        <div>
                            <div></div>
                            <p class="ewm fs14">溯源二维码</p>
                        </div>
                    </div>
                  
                </div>
                <div class="right fr boxSB">
                     <p>3月溯源平台使用情况</p>
                    <div class="textC">
                        <p><span style="color:#393939;font-size:36px;">70%</span></p>
                        <p>本市各区县排名第七</p>
                    </div>
                </div>
            </section>
            <!-- 3 -->
            <section class="item3 boxSB">
                <div  style="width:100%;height:100%;">
                     <div class="partlyLoading"><div>拼命加载中...</div></div>
                </div>
            </section>
            <!-- 7 -->
            <section class="item7">
                 <p class="fs14 col39 mb20">下级区域溯源检测情况</p>
                 <div class="filtrate mb20">
                         <el-date-picker
                            @change="rangeDateChange"
                            class="w140"
                            value-format="yyyy-MM-dd"
                            v-model="range_startTime"
                            type="date"
                            placeholder="起始时间">
                        </el-date-picker>
                        <span>至</span>
                        <el-date-picker
                                @change="rangeDateChange"
                                value-format="yyyy-MM-dd"
                                class="w14s0"
                                v-model="range_endTime"
                                type="date"
                                placeholder="截止时间">
                        </el-date-picker>
                        <el-select v-model="type" placeholder="检测结果" class="ml20"  @change="handleChange">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            </el-option>
                        </el-select>
                        <el-input style="margin-left: 20px;" placeholder="商品名"  class="w260 seekIpt"  v-model="subName" @keyup.enter.native ="seekEnter()">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                        </el-input>
                 </div>
                <el-table :data="dataPage3" class="textC table-div pointerTab">
                    <el-table-column show-overflow-tooltip prop="date" min-width="150" label="溯源日期"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="pdt" min-width="180" label="商品名" align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="info" min-width="180" label="上游信息"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="img" min-width="100" label="进货票证"  align="center" >
                        <template slot-scope="scope">
                            <a style="color: #1787AD;cursor:pointer" @click="go(scope.row)">查看图片</a>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="check" min-width="150" label="检测"  align="center" ></el-table-column>
                    <el-table-column show-overflow-tooltip prop="checkNum" min-width="100" label="检测值"  align="center"></el-table-column>
                     <el-table-column show-overflow-tooltip prop="checkResult" min-width="100" label="检测结果"  align="center"></el-table-column>
                </el-table>
            </section>
        </div>
        <!-- 弹框 -->
        <popupBody class="popup-body" v-if="isShow">
                <!-- 功能模块添加到这一区域 -->
                <div style="width:100%;height:500px;border:1px solid red">放图片</div>
                <div style="height:34px;width:62px;margin:20px auto 0;">
                     <el-button type="primary"  @click="isShow = false" >关闭</el-button>
                </div>
        </popupBody>
    </div>
</template>

<script>
import popupBody from "components/popup/popupdata";
import Back from "utils/back";
export default {
  components: {
    popupBody,
    Back
  },
  methods: {
    rangeDateChange() {
      console.log(this.range_startTime, this.range_endTime);
    },
    // ,rowclick(row,event){
    //     // console.log(row,event)
    //     this.$router.push({name:"yb.marketChart", query: {selected: "2"}});
    // }
    handleChange() {
      //下拉框
      console.log("下拉");
    },
    handleIconClick() {
      //搜索框放大镜
      console.log("handle");
    },
    seekEnter() {
      ///搜索框enter事件
      console.log("enter");
    },
    go(a) {
      //查看图片
      this.isShow = true;
    }
  },
  mounted: function() {
    //    this.seldate =this.getdate();
  },
  data() {
    return {
      isShow: false,
      range_startTime: null,
      range_endTime: null,
      subName: "",
      type: "",
      dataPage3: [
        {
          date: "2017-07-24",
          pdt: "白皮黄心土豆55",
          info: "批发市场-成华区-南城批发市场",
          img: "55555",
          check: "农药残快检",
          checkNum: "50%",
          checkResult: "合格"
        },
        {
          date: "2017-07-24",
          pdt: "白皮黄心土豆55",
          info: "批发市场-成华区-南城批发市场",
          img: "55555",
          check: "农药残快检",
          checkNum: "50%",
          checkResult: "合格"
        },
        {
          date: "2017-07-24",
          pdt: "白皮黄心土豆55",
          info: "批发市场-成华区-南城批发市场",
          img: "55555",
          check: "农药残快检",
          checkNum: "50%",
          checkResult: "合格"
        },
        {
          date: "2017-07-24",
          pdt: "白皮黄心土豆55",
          info: "批发市场-成华区-南城批发市场",
          img: "55555",
          check: "农药残快检",
          checkNum: "50%",
          checkResult: "合格"
        },
        {
          date: "2017-07-24",
          pdt: "白皮黄心土豆55",
          info: "批发市场-成华区-南城批发市场",
          img: "55555",
          check: "农药残快检",
          checkNum: "50%",
          checkResult: "合格"
        }
      ],
      options: [
        {
          value: "allSchool",
          label: "检测结果"
        },
        {
          value: "yey",
          label: "幼儿园"
        },
        {
          value: "xiaoXue",
          label: "小学"
        },
        {
          value: "zhongXue",
          label: "中学"
        },
        {
          value: "daXue",
          label: "大学"
        },
        {
          value: "other",
          label: "其他学校"
        }
      ]
    };
  }
};
</script>

<style scoped>
.area {
  background: #edf0f3;
  width: calc(100% + 40px);
  position: relative;
  left: -20px;
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
  padding: 20px;
}
.item1 > .left > .panel > ul {
  width: 72%;
  height: 200px;
  margin-right: 3%;
  margin-top: 76px;
}
.item1 > .left > .panel > ul li {
  width: 50%;
  margin-bottom: 30px;
  height: 25px;
  line-height: 25px;
}
.item1 > .left > .panel > ul li:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
}
.item1 > .left > .panel > ul li .leftName {
  width: 40%;
  display: block;
  float: left;
  color: #6d7787;
  margin-right: 2%;
  text-align: right;
}
.item1 > .left > .panel > ul li .rightText {
  width: 58%;
  display: block;
  float: left;
  color: #393939;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item1 > .left > .panel > div {
  width: 25%;
  height: 200px;
  margin-top: 50px;
}
.item1 .panel > div > div {
  width: 135px;
  height: 135px;
  margin-bottom: 10px;
  background: blueviolet;
}
.item1 .panel > div > div img {
  width: 100%;
  height: 100%;
  display: block;
}
.item1 > .left > .panel > div > p {
  color: #15baf3;
  text-align: center;
  width: 135px;
}
.item1 > .right {
  height: 100%;
  width: calc(29% - 20px);
  background: #fff;
  padding: 20px;
}
.item1 > .right > p {
  color: #393939;
  font-size: 14px;
}
.item1 > .right > div {
  color: #9199a7;
  font-size: 14px;
  margin-top: 100px;
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
.filtrate {
  height: 34px;
}
</style>


<template>
    <div class="user-box" ref="loadingDiv">
    	<div class="page-tilt">
    	    <b></b><span>日常计划策略配置</span><Back v-if="cdit"></Back>
    	</div>
        <toggle-form title="当前巡查模式">
            <div class="childBox">
                <span>当前巡查模式：</span>
                <span  v-if="!cdit">{{datas?datas.type:dataType}}</span>
                <el-select v-model="dataType" class="w150" placeholder="请选择" v-if="cdit" @change="handleChange">
                    <el-option
                      v-for="item in pattern"
                      :label="item"
                      :key="item"
                      :value="item">
                    </el-option>
                </el-select>
            </div>
        </toggle-form>

        <toggle-form title="巡查频次配置" v-if="this.dataType == '智能模式'">
            <div style="margin: 34px 0;">
                <el-table style="width: 100%;" :data="tableData" class="table-div">
                    <el-table-column label="序号">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="otherRisk" label="风险等级"></el-table-column>
                    <el-table-column prop="otherQuantify" label="量化等级"></el-table-column>
                    <el-table-column label="巡查频次/年">
                        <template slot-scope="scope">
                            <span v-if="!cdit">{{scope.row.times}}</span>
                            <el-select v-model="scope.row.times" placeholder="请选择" v-if="cdit" @change="handleChange">
                                <el-option v-for="item in options"
                                  :label="item"
                                  :key="item"
                                  :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
              </el-table>
            </div>
        </toggle-form>
        <toggle-form title="新增主体默认生效时间设置" v-if="this.dataType == '智能模式'">
            <div class="childBox">
                <span>默认生效时间：</span>
                <span v-if="!cdit">{{datas?datas.effeTime:""}}</span>
                <el-select v-model="dataEffeTime" class="w150" placeholder="请选择" v-if="cdit" @change="handleChange">
                    <el-option
                      v-for="item in takeTime"
                      :label="item"
                      :key="item"
                      :value="item">
                    </el-option>
                </el-select>
            </div>
        </toggle-form>
        <div class="freetxt" v-if="this.dataType == '自由模式'"><h3>说明：自由模式下，系统将不会规定主体的巡查频次</h3></div>
        <!-- 底部按钮 -->
        <div class="foot-btn" style="z-index:998" v-auth="'daily.plan|func.edit'">
            <div>
                <!-- <el-button v-if="!cdit">返回</el-button> -->
                <el-button v-if="!cdit" @click="cditCik()"   class="cdit">编辑</el-button>
                <el-button v-if="cdit" @click="offCik()">取消</el-button>
                <el-button v-if="cdit" @click="saveCik()" class="cdit" :class="tag ? 'forbidden':''" :disabled="tag">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Back from "utils/back.vue"; //返回上一个页面按钮
import ToggleForm from "components/ToggleForm"; //列表块
import { gainPlanList, transferPlanList, getConfigs } from "api/patrol/dailyPlan.js";

export default {
  methods: {
    handleChange() {
      if (arguments[0] === '智能模式') {
        // 发送请求请求数据config数据
        console.log(this.datas.id)
        getConfigs(this.datas.id).then(r => {
          this.tableData = JSON.parse(r.data.configs);
        })
      }
      this.tag = false;
    },
    cditCik() {
      this.cdit = true;
      let me = this;
      // gainPlanList().then(function(data) {
      //   me.tableData = JSON.parse(data.data.config);
      //   me.dataType = data.data.type;
      //   me.dataEffeTime = data.data.effeTime;
      //   me.datas = data.data;
      // });
    },
    offCik() {
      this.tableData = JSON.parse(this.datas.config);
      this.dataType = this.datas.type;
      this.dataEffeTime = this.datas.effeTime;
      this.cdit = false;
      this.tag = true;
    },
    saveCik() {
      // delete this.datas.id; // 不能删除id属性
      if (this.tableData) {
        const tempTableData = JSON.parse(JSON.stringify(this.tableData));
        tempTableData.forEach((line) =>{
          line.otherRisk = line.otherRiskValue;
          line.otherQuantify = line.otherQuantifyValue;
        })
        console.log(tempTableData);
        this.datas.config = JSON.stringify(tempTableData);
      }
      this.datas.type = this.dataType;
      this.datas.effeTime = this.dataEffeTime;
      transferPlanList(this.datas).then(() => {
        gainPlanList().then(data => {
          if (data.data.config) {
            this.tableData = JSON.parse(data.data.config);
          }
          this.dataType = data.data.type;
          this.dataEffeTime = data.data.effeTime;
          this.datas = data.data;
          this.cdit = false;
          this.tag = true;
        });
      });
    }
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 1)',
      target: this.$refs['loadingDiv']
    })
    let me = this;
    gainPlanList().then(function(data) {
      if (data.data.config) {
        me.tableData = JSON.parse(data.data.config);
      }
      me.dataType = data.data.type;
      me.dataEffeTime = data.data.effeTime;
      me.datas = data.data;
      loading.close();
    });
  },
  data() {
    return {
      tag: true,
      options: [1, 2, 3, 4,6],
      cdit: false,
      datas: null,
      dataType: '',
      dataEffeTime: "一周",
      tableData: [],
      pattern: ["智能模式", "自由模式"],
      takeTime: ["立即生效", "1周", "2周", "3周", "4周", "5周", "6周", "7周", "8周"]
    };
  },
  components: {
    Back,
    ToggleForm
  }
};
</script>

<style scoped>
.app-container>div{
  height:auto !important;
}
.user-box {
  margin-bottom: 150px;
}
.titBox {
  background: #f2f5f8;
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
}
.titBox b {
  background: #606979;
  height: 30px;
  width: 3px;
  display: inline-block;
  float: left;
}
.titBox span {
  margin-left: 13px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #6d7787;
}
.titBox div {
  float: right;
  width: 30px;
  height: 30px;
  background: #e7ecf2;
}
.childBox {
  width: 300px;
  height: 34px;
  line-height: 34px;
  margin: 34px auto;
}
.childBox span {
  font-size: 14px;
}
.childBox span:first-child {
  color: #6d7787;
}
.childBox span:last-child {
  color: #393939;
}
.table-div {
  text-align: center;
}
.cdit {
  background: #0db5ef;
  color: #fff;
}
.forbidden {
  background: #b5bec6;
  color: #fff;
}
.freetxt {
  text-align: center;
  margin-top: 34px;
  margin-bottom: 34px;
}
</style>

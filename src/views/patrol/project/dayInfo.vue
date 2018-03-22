<style>
    .brN .is-leaf{
        border-right: 0;
    }
    .brN tr td{
        border-right: 0;
    }
    .brN tr td[colspan="1"]{
        border-right: 1px solid #ebeef5;
    }
    /*.brN .el-table__body-wrapper{
        max-height: 350px;
    }*/
    .brN tr:hover>td{
        background-color:#fff !important;
    }
    .mT35 .el-table__header-wrapper{
        display: none;
    }
    .firsTeit .el-table__header-wrapper{
        display: block;
    }
    .mT35 .el-table{
        border-top: none !important;
    }
    .mT35 .firsTeit{
        border-top: 1px solid #ebeef5!important;
    }
</style>
<template>
    <div>
        <div style="margin-top:20px;border-left:3px solid  #0DB5EF;">
            <span style="margin-left:10px;font-size: 16px;color: #393939;font-weight:bolder;" v-if="patrolType=='DAILY'">日常巡查记录详情</span>
            <span style="margin-left:10px;font-size: 16px;color: #393939;font-weight:bolder;" v-if="patrolType=='SPECIAL'">专项巡查记录详情</span>
        </div>
        <div class="container" @click="ifbig(-1)">
        <!-- 左边信息悬浮栏 -->
      <div class="left-info">
            <ul class="main-block">
                <li class="clearfix " :class="slideIndex==index?'activePosition':''" v-for="(item,index) in progress" :key="index">
                    <p class="floatL left">{{item.title}}</p>
                </li>
            </ul>
        </div>
        <!-- 左边信息悬浮栏 end-->
        <div class="right-info">
            <el-form :model="ruleForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <!-- 基本信息 -->
                <toggle-form title="基本信息">
                    <div class="content" v-if="basicInfoData">
                        <div class="row">
                            <el-form-item label="主体名:" prop="">
                                <span>{{basicInfoData.entityName}}</span>
                                <a href="javascript:;" @click="ifType" v-auth="'biz.cb,biz.pb,biz.rb,biz.cfda'">进入该主体档案</a>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="许可备案号:" prop="">
                                <span>{{basicInfoData.licenseNumber}}</span>
                            </el-form-item>
                            <el-form-item label="主体类型:" prop="">
                                <span>{{basicInfoData.entityTypeStr}}</span>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="经营地址:" prop="">
                                <span v-if="basicInfoData.spaceAddr != ''">{{basicInfoData.spaceAddr}}</span>
                                <span v-else>{{basicInfoData.spaceAddr}}</span>
                            </el-form-item>
                        </div>
                        <div class="row">
                            <el-form-item label="巡查地址:" prop="">
                                <span v-if="patrolRecordAddressIsShow">{{basicInfoData.patrolRecordAddress.address}}</span>
                                <span v-else>暂无</span>
                                <el-button v-if="patrolRecordAddressIsShow" type="text" @click="mapAddressVisible = true">巡查坐标</el-button>
                                <el-dialog
                                  v-if="patrolRecordAddressIsShow"
                                  :visible.sync="mapAddressVisible"
                                  :modal-append-to-body="false"
                                  width="60%">
                                  <slot slot="title">
                                      <!-- <h1>{{basicInfoData.entityName}}:</h1> -->
                                      {{basicInfoData.entityName}} <br />
                                    {{basicInfoData.patrolRecordAddress.address}}
                                  </slot>
                                  <!-- <footer slot="footer">
                                    <h1 align="center">footer</h1>
                                  </footer> -->
                                  <div style="height: 300px;">
                                    <address-map
                                      v-if="patrolRecordAddressIsShow"
                                      :lng="basicInfoData.patrolRecordAddress.lng"
                                      :lat="basicInfoData.patrolRecordAddress.lat">
                                    </address-map>
                                  </div>
                                </el-dialog>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="巡查时间:" prop="">
                                <span>{{basicInfoData.patrolTime}}</span>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="监管人员:" prop="">
                                <span>{{basicInfoData.patrolSoIdStr}}</span>
                            </el-form-item>
                            <el-form-item label="信息员:" prop="">
                                <span v-for="(item,index) in basicInfoData.messengerList">{{item.messengerStr}}<span v-if="index<basicInfoData.messengerList.length-1">，</span></span>
                            </el-form-item>
                        </div>
                    </div>
                </toggle-form>

                <!-- 巡查项 -->
                <toggle-form title="巡查项">
                    <div class="mT35" v-if="patrolData">
                        <el-table :key="index" v-for="(item,index) in patrolData" :class="index==0?'firsTeit':''" :data="item.content" :span-method="objectSpanMethod" border class="table-div brN">
                          <el-table-column show-overflow-tooltip label="检查项编号" width="100">
                                <template slot-scope="scope">
                                    <span>{{index+1}}</span>
                                </template>
                          </el-table-column>
                          <el-table-column show-overflow-tooltip prop="item" label="巡查项目" width="120"></el-table-column>
                          <el-table-column show-overflow-tooltip label="巡查内容编号" width="120">
                                <template slot-scope="scope">
                                    <span>{{index+1}}.{{scope.$index+1}}</span>
                                </template>
                          </el-table-column>
                          <el-table-column show-overflow-tooltip prop="context" label="巡查内容" width="250"></el-table-column>
                          <el-table-column show-overflow-tooltip prop="importantStr" label="是否重点项" width="80"></el-table-column>
                          <el-table-column show-overflow-tooltip prop="score" label="分值" width="50"></el-table-column>
                          <el-table-column show-overflow-tooltip prop="qualStr" label="是否符合" width="80"></el-table-column>
                          <el-table-column show-overflow-tooltip prop="remark" label="备注"></el-table-column>
                        </el-table>
                        <div class="zj">
                            <span>总计：</span>
                            <span v-if="gross">{{gross}}分</span>
                            <span v-if="!gross">0分</span>
                        </div>
                      </div>
                </toggle-form>

                <!-- 巡查结果 -->
                <toggle-form title="巡查结果">
                    <div class="content" v-if="resultData">
                        <div class="row ml30" style="margin-left: 40px;">
                           <span style="color: #6D7787;">本次巡查重点项<span>{{resultData.importantItem.total}}</span>项，一般项<span>{{resultData.generalItem.total}}</span>项，共{{resultData.generalItem.total + resultData.importantItem.total}}项</span>
                        </div>
                        <div class="row result ml30">
                            <div class="item">
                                <div class="number">{{resultData.importantItem.unqualified}}</div>
                                <div class="project-name">重点项不合格</div>
                            </div>
                             <div class="item">
                                <div class="number">{{resultData.generalItem.unqualified}}</div>
                                <div class="project-name">一般项不合格</div>
                            </div>
                        </div>
                        <div class="row ml30" style="margin: 20px 0">
                           <span style="font-size: 18px;color: #393939;">企业得分：</span><span style="color: #0DB5EF;font-size: 18px; "><span>{{resultData.score}}</span>分</span>
                           <span style="font-size: 12px;color: #A2AAB6;margin-left: 40px;">（满分：{{resultData.totalScores}}分，此评分仅供参考）</span>
                        </div>
                        <div class="row">
                            <el-form-item label="巡查结果：" prop="">
                              <span>{{resultData.resultStr}}</span>
                            </el-form-item>
                        </div>
                        <div class="row">
                            <el-form-item label="处理方式：" prop="">
                                <span>{{resultData.treatStr}}</span>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="备注：" prop="">
                                <span v-if="resultData.treatRemark">{{resultData.treatRemark}}</span>
                                <span v-if="!resultData.treatRemark">无</span>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="上传图片：" prop="">
                              <div class="imgbox" v-if="resultData.photo.length >= 1">
                                  <div v-for="(item,index) in resultData.photo" @click.stop="ifbig(index)" class="imgdiv" :class="imgbig == index?'imgbig':''">
                                      <img :src="pathFile + item" alt="">
                                      <span>预览</span>
                                  </div>
                              </div>
                              <div v-if="resultData.photo.length == 0">
                                  <span>无</span>
                              </div>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="量化等级：" prop="">
                                <span v-if="resultData.quantitativeLevel != ''">{{resultData.quantitativeLevel}}</span>
                                <span v-if="resultData.quantitativeLevel == ''">无</span>
                            </el-form-item>
                        </div>

                        <div class="row">
                            <el-form-item label="企业电子签名：" prop="">
                                <span v-if="!resultData.sign">企业拒绝配合</span>
                                <span v-if="resultData.sign">企业配合</span>
                                <div v-if="resultData.sign" @click.stop="ifbigq()" class="imgdiv" :class="ifbigqy?'imgbig':''">
                                      <img :src="pathFile + resultData.sign" alt="">
                                      <span>预览</span>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                </toggle-form>

            </el-form>
        </div>
        </div>
        <!-- 底部按钮 -->
        <div class="foot-btn" style="z-index:1">
            <div>
                <el-button style="width:100px;" @click="back">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import ToggleForm from "components/ToggleForm.vue";
import qr from "components/QRcode.vue";
import scroll from "utils/scroll";
import * as plan from "api/patrol/project"
import addressMap from "./patrolRecordAddressMap"

export default {
    components: {
        ToggleForm,
        qr,
        addressMap
    },
    mounted(){
        scroll.call(this,'slideIndex',0,50);

        this.pathFile = this.$store.getters.filePath;

        this.recordId = this.$route.query.recordId;
        this.patrolType = this.$route.query.patrolType;

        this.initData();
    },
    methods:{
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            let rownum = 0;
            for(var i=0;i<this.patrolData.length;i++){
                if (this.patrolData[i].content.indexOf(row) >= 0) {
                    rownum = this.patrolData[i].content.length;
                    break;
                }
            }
            if (columnIndex === 0 || columnIndex === 1) {
                if(rowIndex%rownum == 0){
                    return {
                        rowspan: rownum,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        ifbig(index){
            if (this.imgbig == null || this.imgbig != index) {
                this.imgbig = index;
            } else{
                this.imgbig = null;
            }
            if(index == -1){
                this.ifbigqy = false;
            }
        },
        ifbigq(){
            this.ifbigqy = !this.ifbigqy;
        },
        initData(){
            plan.getBasicInfo(this.recordId,this.patrolType).then(d => {
                this.basicInfoData = d.data;
                if (this.basicInfoData.patrolRecordAddress &&
                    this.basicInfoData.patrolRecordAddress.address &&
                    this.basicInfoData.patrolRecordAddress.lng &&
                    this.basicInfoData.patrolRecordAddress.lat) {
                  this.patrolRecordAddressIsShow = true
                }
            });
            plan.getPatrolItems(this.recordId,this.patrolType).then(d => {
                this.patrolData = d.data;
                for(var i=0;i<d.data.length;i++){
                    for(var j=0;j<d.data[i].content.length;j++){
                        this.gross += d.data[i].content[j].score;
                    }
                }
            });
            plan.getPatrolResult(this.recordId,this.patrolType).then(d => {
                this.resultData = d.data;
            });
        },
        ifType(){
          let name1,name2,back,resultRouter;
          if(this.patrolType === 'DAILY'){
              name1 = 'patrol.record.dailyinfo';
              name2 = 'patrol.record.dailyEntityInfo';
              back = 'patrol.record.dailyDetail';
              resultRouter = '/biz/patrol/record/daily/detail'
          }

          if(this.patrolType === 'SPECIAL'){
              name1 = 'patrol.record.info';
              name2 = 'patrol.record.entityInfo';
              back = 'patrol.record.detail';
              resultRouter = '/biz/patrol/record/special/detail';
          }

          if (this.basicInfoData.entityParentType == 'CFDA') {
            this.$router.push({
              name:name1,
              query: {
                id: this.basicInfoData.entityId,
                back: back,
                recordId:this.recordId,
                patrolType:this.patrolType,
               },
            })
          } else if(this.basicInfoData.entityParentType == 'ENTITY'){
                this.$router.push({
                    name: name2,
                    params:{
                        entityId:this.basicInfoData.entityId,
                        entityType:this.basicInfoData.entityType,
                        recordId:this.recordId,//myself
                        patrolType:this.patrolType,//myself
                        //resultRouter:'/biz/patrol/table/list'原来代码
                      resultRouter:resultRouter
                    }
                })
            }
        },
        back(){
          if (this.patrolType==='DAILY') {
            this.$router.push({
              name:'patrol.record.daily'
            })
          } else {
            this.$router.push({
              name:'patrol.record.special'
            })
          }
        },
    },
    data() {
        return {
          patrolRecordAddressIsShow: false,
          mapAddressVisible:false,
            slideIndex:-1,
            pathFile: "",
            checkboxGroup1: [],
            ruleForm: {
                name: "",
                checkboxGroup1: []
            },
            // 左边悬浮栏的数据
            progress:[
                {
                    title:'基本信息'
                },
                 {
                    title:'巡查项'
                },
                 {
                    title:'巡查结果'
                }
            ],
            imgbig:null,
            ifbigqy:false,
            recordId:null,
            patrolType:null,
            basicInfoData:null,
            patrolData: null,
            resultData:null,
            gross:0
        }
    }
}
</script>

<style lang="scss" scoped>

.container{
    position:relative;
    margin-bottom:200px;
}
$c:#0db5ef;
.left-info {
    width: 210px;
    height: 560px;
    background: #fff;
    position: fixed;
    margin-left: -230px;
    margin-top: 0;
    z-index: 2;
    .head-block{
        background: #F2F5F8;
        height: 70px;
        padding:14px 20px;
        box-sizing: border-box;
        .num{
            color: $c;
        }
    }
    .main-block{
        // border-right: 2px solid #EBF1F5;
        // min-height: 470px;
        >li{
             border-right: 2px solid #EBF1F5;
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            cursor: default;
            &:hover{
                 background: #F2F5F8;
            }
            .right{
                color: #A2AAB6;
            }
        }
        .activePosition{
            border-right: 2px solid $c;
            .left{color:$c}
        }
    }
}
// 左边悬浮信息栏的样式 end
.right-info {
    width: calc(100% - 230px);
    margin-left:230px;
     .content{
        width: 600px;
     }
}
.content {
    margin-top: 20px;

     a{
        background: #F6F7F8;
        border: 1px solid #C2CAD2;
        padding: 5px 19px;
        font-size: 14px;
        color: #393939;
        height: 30px;
        width: 136px;
        box-sizing: border-box;
        margin-left: 10px;
    }
}
.mT35{
    margin-top: 35px;
}
.row .el-form-item{
    min-width: 250px;
}
.table-div{
    text-align: center;
}
.zj{
    border: 1px solid #ebeef5;
    border-top: 0;
    height: 44px;
    line-height: 44px;

     span:first-child{
        margin-left: 36px;
     }
     span:last-child{
        width: 85%;
        display: inline-block;
        text-align: center;
     }
}

.result{
    margin:20px 0;
    width:402px;
    height:90px;
    border:1px solid #C2CAD2;
    display:flex;
    justify-content: space-around;
    align-items: center;
    .item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .number{
        font-size: 26px;
        color: #3B3B3B;
      }
      .project-name{
        font-size: 14px;
        color: #A2AAB6;
      }
    }
}
.imgbox{
    display: flex;
}
.imgdiv{
    width: 130px;
    height: 130px;
    border: 1px solid #C2CAD2;
    border-radius: 6px;
    position: relative;
    margin-right: 20px;
     img{
        transition: all 0.5s;
        width: 100%;
        height: 100%;
        border-radius: 6px;
     }
     span{
        display: none;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(0,0,0,0.40);
        border-radius: 0 0 5px 5px;
        font-size: 14px;
        color: #FFFFFF;
        position: absolute;
        bottom: 0;
     }
    }
    .imgdiv:hover{
     span{
        display: inline-block;
     }
    }
    .imgbig{
    z-index: 999;
     span{
        display: none !important;
     }
     img{
        transform:scale(2);
        border-radius: 0;
     }
    }
</style>

<template>
  <div>
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
      <div class="no-star">
        <div class="form-item">

          <ul class="clearfix nav">
            <li v-for="(item,index) in licenceno" :key="item.licenceType" class="floatL" style="margin-right:10px;">
              <router-link v-if="item.bizId != $route.params.entityId" target="_blank" :to="{path:'../index',query:{id:item.bizId}}">
                <el-button >{{item.licenceTypeStr}}</el-button>
              </router-link>

              <span v-else>
                <el-button>{{item.licenceTypeStr}}</el-button>
              </span>
            </li>
          </ul>

        </div>
      </div>
      <el-form  label-width="130px" class="demo-ruleForm labW150">
        <!-- 基础信息 -->
        <toggle-form title="基础信息">
          <div class="content">
            <div class="row">
              <el-form-item label="主体名称:" >
                <span>{{subInfo.entityName}}</span>
              </el-form-item>
              <span v-if="subInfo.natureType == 'YZYZ' || subInfo.natureType == 'YZWZ'">
                <el-form-item label="统一社会信用代码:">
                <span>{{subInfo.creditCode}}</span>
              </el-form-item>
              </span>
            </div>

            <span v-if="subInfo.natureType == 'YZYZ' || subInfo.natureType == 'YZWZ'">
              <div class="row">
              <el-form-item label="经营者姓名:">
                <span>{{subInfo.legalPerson}}</span>
              </el-form-item>
              <el-form-item label="主体工商状态:" >
                <span>{{subInfo.creditTypeStr}}</span>
              </el-form-item>
            </div>
            </span>


            <span v-if="subInfo.natureType == 'YZYZ'">
              <div class="row">
              <el-form-item label="许可备案号:">
                <span>{{subInfo.licence}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="有效期:">
                <span>{{subInfo.licBegin}} - {{subInfo.licEnd}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="许可证状态(主体状态):" >
                <span>{{subInfo.licStateStr}}</span>
              </el-form-item>
            </div>
            </span>

          </div>
        </toggle-form>

        <!-- 负责人信息 -->
        <toggle-form title="负责人信息">
          <div class="content">
            <div class="row">
              <el-form-item label="负责人:" >
                <span>{{subInfo.corpName}}</span>
              </el-form-item>
              <el-form-item label="负责人联系电话:">
                <span>{{subInfo.mobile}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="负责人身份证:">
                <span>{{subInfo.idNo}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="负责人住所:">
                <span>{{subInfo.address}}</span>
              </el-form-item>
            </div>

          </div>
        </toggle-form>

        <!-- 经营信息 -->
        <toggle-form title="经营信息">
          <div class="content">
            <div class="row">
              <el-form-item label="风险等级:" >
                <span>{{subInfo.riskRankStr}}</span>
              </el-form-item>
              <el-form-item label="量化等级:">
                <span>{{subInfo.quanLevelStr}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="经营面积:" >
                <span>{{subInfo.spaceArea}}</span>
              </el-form-item>
              <el-form-item label="场所分布:">
                <span>{{subInfo.spaceDstStr}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="经营场所:" >
                <span>{{subInfo.spaceAddr}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="从业人数:">
                <span>{{subInfo.empNumber}}</span>
              </el-form-item>
              <el-form-item label="主体业态:">
                <span>{{subInfo.subTypeStr}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="经济性质:">
                <span>{{subInfo.econTypeStr}}</span>
              </el-form-item>
              <el-form-item label="营业状态:">
                <span>{{subInfo.manageStateStr}}</span>
              </el-form-item>
            </div>



            <div class="row" v-if="subInfo.entityType == 'PRODUCT'">
              <el-form-item label="经营类别:" >
                <span style="max-width:380px;">{{subInfo.operTypeStr}}</span>
              </el-form-item>
            </div>

            <div class="row" v-if="subInfo.entityType == 'PRODUCT'">
              <el-form-item label="经营明细:" >
                <span style="max-width:380px;">{{subInfo.operDetailStr}}</span>
              </el-form-item>
            </div>

            <div class="row" v-if="subInfo.entityType == 'CIRCULATION' || subInfo.entityType == 'RESTAURANT'">
              <el-form-item label="经营项目:" >
                <span style="max-width:380px;">{{subInfo.operProStr}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="详细经营信息:" >
                <span style="max-width:380px;">{{subInfo.detailedEngageStr}}</span>
              </el-form-item>
            </div>

          </div>
        </toggle-form>


        <!-- 责任落实 -->
        <toggle-form title="责任落实">
          <div class="content">
            <div class="row">
              <el-form-item label="所属食药所:" >
                <span>{{subInfo.syjName}}</span>
              </el-form-item>

              <el-form-item label="所在网格:" >
                <span>{{subInfo.gridName}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="监管人员:" >
                <span>{{subInfo.soName}}</span>
              </el-form-item>

              <el-form-item label="监管人员联系方式:" >
                <span>{{subInfo.soPhone}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="网格信息员:" >
                <span>{{subInfo.infoAssi}}</span>
              </el-form-item>

              <el-form-item label="信息员联系方式:" >
                <span>{{subInfo.infoAssiPhone}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="第一责任人:" >
                <span>{{subInfo.firstPl}}</span>
              </el-form-item>

              <el-form-item label="第一责任人联系方式:" >
                <span>{{subInfo.firstPlTel}}</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="管理人员:" >
                <span>{{subInfo.manager}}</span>
              </el-form-item>

              <el-form-item label="管理人员联系方式:" >
                <span>{{subInfo.managerTel}}</span>
              </el-form-item>
            </div>
          </div>
        </toggle-form>

        <!-- 附件上传 -->
        <!-- <toggle-form title="附件上传 ">

            </toggle-form> -->
      </el-form>
    </div>

  </div>
</template>

<script>

  import ToggleForm from "components/ToggleForm.vue";
  import scroll from "utils/scroll";
  import {getSubInfo} from "api/sub/sub.js";
  import { mapActions } from 'vuex';
  import{getLicenceno} from  "api/sub/add.js";

  export default {
    components: {
      ToggleForm,
    },
    mounted(){

      getSubInfo(this.$route.params.entityId).then((r) => {
        this.subInfo = r.data;
        let IndexParam = {
          entityName:r.data.entityName,
          natureType:r.data.natureTypeStr,
          entityType:r.data.entityTypeStr,
          address:r.data.spaceAddr
        };
        this.setInfo(IndexParam);
        getLicenceno(r.data.creditCode).then((r) => {
          this.licenceno = r.data;

          //滚动效果
          scroll.call(this,'slideIndex');

        });
      });

    },
    methods:{
      ...mapActions({setInfo :'sub/setInfo'}),
    },
    data() {
      return {
        slideIndex:-1,
        licenceno:{},
        subInfo:{},
        // 左边悬浮栏的数据
        progress:[
          {
            title:'基础信息',
          },
          {
            title:'负责人信息',
          },
          {
            title:'经营信息',
          },
          {
            title:'责任落实',
          },
        ],

      }
    }
  }
</script>

<style lang="scss" scoped>
  // 左边悬浮信息栏的样式 start
  $c:#0db5ef;

  .left-info {
    width: 210px;
    height: 560px;
    background: #fff;
    position: fixed;
    margin-left: -230px;
    margin-top: -20px;
  // z-index: 2;

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
    margin-top: 20px;
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
       width: 100%;
     }
  .right-info .nav .el-button{
    border: 0px;
  }
  // .content {
     //   padding-left: 25%;
     //   margin-top: 20px;
     // }
</style>

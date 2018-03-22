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

    <div class="right-info">

      <el-form label-width="130px" class="demo-ruleForm labW150">
        <!-- 基础信息 -->
        <toggle-form v-if="fieldChange.based ? fieldChange.based.show : false" title="基础信息（变动前）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.based?fieldChange.based.entityName:fasle) ? 'font-color':''">
                <el-form-item label="主体名称:">
                  <span>{{beforeSubInfo.entityName}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.based?fieldChange.based.creditCode:fasle) ? 'font-color':''" v-if="beforeSubInfo.natureType == 'YZYZ' || beforeSubInfo.natureType == 'YZWZ'">
                <el-form-item label="统一社会信用代码:">
                  <span>{{beforeSubInfo.creditCode}}</span>
                </el-form-item>
              </span>
            </div>

            <span v-if="beforeSubInfo.natureType == 'YZYZ' || beforeSubInfo.natureType == 'YZWZ'">
              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.legalPerson:fasle) ? 'font-color':''">
                  <el-form-item label="经营者姓名:">
                    <span>{{beforeSubInfo.legalPerson}}</span>
                  </el-form-item>
                </span>
                <span :class="(fieldChange.based?fieldChange.based.creditType:fasle) ? 'font-color':''">
                  <el-form-item label="主体工商状态:">
                    <span>{{beforeSubInfo.creditTypeStr}}</span>
                  </el-form-item>
                </span>
              </div>
            </span>

            <span v-if="beforeSubInfo.natureType == 'YZYZ'">
              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licence:fasle) ? 'font-color':''">
                  <el-form-item label="许可备案号:">
                    <span>{{beforeSubInfo.licence}}</span>
                  </el-form-item>
                </span>
              </div>

              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licDate:fasle) ? 'font-color':''">
                  <el-form-item label="有效期:">
                    <span>{{beforeSubInfo.licBegin}} - {{beforeSubInfo.licEnd}}</span>
                  </el-form-item>
                </span>
              </div>

              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licState:fasle) ? 'font-color':''">
                  <el-form-item label="许可证状态(主体状态):">
                    <span>{{beforeSubInfo.licStateStr}}</span>
                  </el-form-item>
                </span>
              </div>
            </span>

          </div>
        </toggle-form>

        <toggle-form v-if="fieldChange.based ? fieldChange.based.show : false" title="基础信息（变动后）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.based?fieldChange.based.entityName:fasle) ? 'font-color':''">
                <el-form-item label="主体名称:">
                  <span>{{afterSubInfo.entityName}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.based?fieldChange.based.creditCode:fasle) ? 'font-color':''" v-if="beforeSubInfo.natureType == 'YZYZ' || beforeSubInfo.natureType == 'YZWZ'">
                <el-form-item label="统一社会信用代码:">
                  <span>{{afterSubInfo.creditCode}}</span>
                </el-form-item>
              </span>
            </div>

            <span v-if="beforeSubInfo.natureType == 'YZYZ' || beforeSubInfo.natureType == 'YZWZ'">
              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.legalPerson:fasle) ? 'font-color':''">
                  <el-form-item label="经营者姓名:">
                    <span>{{afterSubInfo.legalPerson}}</span>
                  </el-form-item>
                </span>
                <span :class="(fieldChange.based?fieldChange.based.creditType:fasle) ? 'font-color':''">
                  <el-form-item label="主体工商状态:">
                    <span>{{afterSubInfo.creditTypeStr}}</span>
                  </el-form-item>
                </span>
              </div>
            </span>

            <span v-if="beforeSubInfo.natureType == 'YZYZ'">
              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licence:fasle) ? 'font-color':''">
                  <el-form-item label="许可备案号:">
                    <span>{{afterSubInfo.licence}}</span>
                  </el-form-item>
                </span>
              </div>

              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licDate:fasle) ? 'font-color':''">
                  <el-form-item label="有效期:">
                    <span>{{afterSubInfo.licBegin}} - {{afterSubInfo.licEnd}}</span>
                  </el-form-item>
                </span>
              </div>

              <div class="row">
                <span :class="(fieldChange.based?fieldChange.based.licState:fasle) ? 'font-color':''">
                  <el-form-item label="许可证状态(主体状态):">
                    <span>{{afterSubInfo.licStateStr}}</span>
                  </el-form-item>
                </span>
              </div>
            </span>

          </div>
        </toggle-form>

        <!-- 负责人信息 -->
        <toggle-form v-if="fieldChange.personCharge ? fieldChange.personCharge.show : false" title="负责人信息（变动前）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.corpName:fasle) ? 'font-color':''">
                <el-form-item label="负责人:">
                  <span>{{beforeSubInfo.corpName}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.mobile:fasle) ? 'font-color':''">
                <el-form-item label="负责人联系电话:">
                  <span>{{beforeSubInfo.mobile}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.idNo:fasle) ? 'font-color':''">
                <el-form-item label="负责人身份证:">
                  <span>{{beforeSubInfo.idNo}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.censusReg:fasle) ? 'font-color':''">
                <el-form-item label="负责人住所:">
                  <span>{{beforeSubInfo.address}}</span>
                </el-form-item>
              </span>
            </div>

          </div>
        </toggle-form>

        <toggle-form v-if="fieldChange.personCharge ? fieldChange.personCharge.show : false" title="负责人信息（变动后）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.corpName:fasle) ? 'font-color':''">
                <el-form-item label="负责人:">
                  <span>{{afterSubInfo.corpName}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.mobile:fasle) ? 'font-color':''">
                <el-form-item label="负责人联系电话:">
                  <span>{{afterSubInfo.mobile}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.idNo:fasle) ? 'font-color':''">
                <el-form-item label="负责人身份证:">
                  <span>{{afterSubInfo.idNo}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.personCharge?fieldChange.personCharge.censusReg:fasle) ? 'font-color':''">
                <el-form-item label="负责人住所:">
                  <span>{{afterSubInfo.address}}</span>
                </el-form-item>
              </span>
            </div>

          </div>
        </toggle-form>

        <!-- 经营信息 -->
        <toggle-form v-if="fieldChange.management ? fieldChange.management.show : false" title="经营信息（变动前）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.riskRank:fasle) ? 'font-color':''">
                <el-form-item label="风险等级:">
                  <span>{{beforeSubInfo.riskRankStr}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.quanLevel:fasle) ? 'font-color':''">
                <el-form-item label="量化等级:">
                  <span>{{beforeSubInfo.quanLevelStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.spaceArea:fasle) ? 'font-color':''">
                <el-form-item label="经营面积:">
                  <span>{{beforeSubInfo.spaceArea}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.spaceDst:fasle) ? 'font-color':''">
                <el-form-item label="场所分布:">
                  <span>{{beforeSubInfo.spaceDstStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.spaceAddr:fasle) ? 'font-color':''">
                <el-form-item label="经营场所:">
                  <span>{{beforeSubInfo.spaceAddr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.empNumber:fasle) ? 'font-color':''">
                <el-form-item label="从业人数:">
                  <span>{{beforeSubInfo.empNumber}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.subType:fasle) ? 'font-color':''">
                <el-form-item label="主体业态:">
                  <span>{{beforeSubInfo.subTypeStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.econType:fasle) ? 'font-color':''">
                <el-form-item label="经济性质:">
                  <span>{{beforeSubInfo.econTypeStr}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.manageState:fasle) ? 'font-color':''">
                <el-form-item label="营业状态:">
                  <span>{{beforeSubInfo.manageStateStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'PRODUCT'">
              <span :class="(fieldChange.management?fieldChange.management.operType:fasle) ? 'font-color':''">
                <el-form-item label="经营类别:">
                  <span style="max-width:380px;">{{beforeSubInfo.operTypeStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'PRODUCT'">
              <span :class="(fieldChange.management?fieldChange.management.operDetail:fasle) ? 'font-color':''">
                <el-form-item label="经营明细:">
                  <span style="max-width:380px;">{{beforeSubInfo.operDetailStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'CIRCULATION' || beforeSubInfo.entityType == 'RESTAURANT'">
              <span :class="(fieldChange.management?fieldChange.management.operPro:fasle) ? 'font-color':''">
                <el-form-item label="经营项目:">
                  <span style="max-width:380px;">{{beforeSubInfo.operProStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.detailedEngage:fasle) ? 'font-color':''">
                <el-form-item label="详细经营信息:">
                  <span style="max-width:380px;">{{beforeSubInfo.detailedEngageStr}}</span>
                </el-form-item>
              </span>
            </div>

          </div>
        </toggle-form>

        <!-- 经营信息 -->
        <toggle-form v-if="fieldChange.management ? fieldChange.management.show : false" title="经营信息（变动后）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.riskRank:fasle) ? 'font-color':''">
                <el-form-item label="风险等级:">
                  <span>{{afterSubInfo.riskRankStr}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.quanLevel:fasle) ? 'font-color':''">
                <el-form-item label="量化等级:">
                  <span>{{afterSubInfo.quanLevelStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.spaceArea:fasle) ? 'font-color':''">
                <el-form-item label="经营面积:">
                  <span>{{afterSubInfo.spaceArea}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.spaceDst:fasle) ? 'font-color':''">
                <el-form-item label="场所分布:">
                  <span>{{afterSubInfo.spaceDstStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.spaceAddr:fasle) ? 'font-color':''">
                <el-form-item label="经营场所:">
                  <span>{{afterSubInfo.spaceAddr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.empNumber:fasle) ? 'font-color':''">
                <el-form-item label="从业人数:">
                  <span>{{afterSubInfo.empNumber}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.subType:fasle) ? 'font-color':''">
                <el-form-item label="主体业态:">
                  <span>{{afterSubInfo.subTypeStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.econType:fasle) ? 'font-color':''">
                <el-form-item label="经济性质:">
                  <span>{{afterSubInfo.econTypeStr}}</span>
                </el-form-item>
              </span>
              <span :class="(fieldChange.management?fieldChange.management.manageState:fasle) ? 'font-color':''">
                <el-form-item label="营业状态:">
                  <span>{{afterSubInfo.manageStateStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'PRODUCT'">
              <span :class="(fieldChange.management?fieldChange.management.operType:fasle) ? 'font-color':''">
                <el-form-item label="经营类别:">
                  <span style="max-width:380px;">{{afterSubInfo.operTypeStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'PRODUCT'">
              <span :class="(fieldChange.management?fieldChange.management.operDetail:fasle) ? 'font-color':''">
                <el-form-item label="经营明细:">
                  <span style="max-width:380px;">{{afterSubInfo.operDetailStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row" v-if="beforeSubInfo.entityType == 'CIRCULATION' || beforeSubInfo.entityType == 'RESTAURANT'">
              <span :class="(fieldChange.management?fieldChange.management.operPro:fasle) ? 'font-color':''">
                <el-form-item label="经营项目:">
                  <span style="max-width:380px;">{{afterSubInfo.operProStr}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.management?fieldChange.management.detailedEngage:fasle) ? 'font-color':''">
                <el-form-item label="详细经营信息:">
                  <span style="max-width:380px;">{{afterSubInfo.detailedEngageStr}}</span>
                </el-form-item>
              </span>
            </div>

          </div>
        </toggle-form>

        <!-- 责任落实 -->
        <toggle-form v-if="fieldChange.duty ? fieldChange.duty.show : false" title="责任落实（变动前）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.syj:fasle) ? 'font-color':''">
                <el-form-item label="所属食药所:">
                  <span>{{beforeSubInfo.syjName}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.grid:fasle) ? 'font-color':''">
                <el-form-item label="所在网格:">
                  <span>{{beforeSubInfo.gridName}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.so:fasle) ? 'font-color':''">
                <el-form-item label="监管人员:">
                  <span>{{beforeSubInfo.soName}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.soPhone:fasle) ? 'font-color':''">
                <el-form-item label="监管人员联系方式:">
                  <span>{{beforeSubInfo.soPhone}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.infoAssi:fasle) ? 'font-color':''">
                <el-form-item label="网格信息员:">
                  <span>{{beforeSubInfo.infoAssi}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.infoAssiPhone:fasle) ? 'font-color':''">
                <el-form-item label="信息员联系方式:">
                  <span>{{beforeSubInfo.infoAssiPhone}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.firstPl:fasle) ? 'font-color':''">
                <el-form-item label="第一责任人:">
                  <span>{{beforeSubInfo.firstPl}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.firstPlTel:fasle) ? 'font-color':''">
                <el-form-item label="第一责任人联系方式:">
                  <span>{{beforeSubInfo.firstPlTel}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.manager:fasle) ? 'font-color':''">
                <el-form-item label="管理人员:">
                  <span>{{beforeSubInfo.manager}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.managerTel:fasle) ? 'font-color':''">
                <el-form-item label="管理人员联系方式:">
                  <span>{{beforeSubInfo.managerTel}}</span>
                </el-form-item>
              </span>
            </div>
          </div>
        </toggle-form>

        <toggle-form v-if="fieldChange.duty ? fieldChange.duty.show : false" title="责任落实（变动后）">
          <div class="content">
            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.syj:fasle) ? 'font-color':''">
                <el-form-item label="所属食药所:">
                  <span>{{afterSubInfo.syjName}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.grid:fasle) ? 'font-color':''">
                <el-form-item label="所在网格:">
                  <span>{{afterSubInfo.gridName}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.so:fasle) ? 'font-color':''">
                <el-form-item label="监管人员:">
                  <span>{{afterSubInfo.soName}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.soPhone:fasle) ? 'font-color':''">
                <el-form-item label="监管人员联系方式:">
                  <span>{{afterSubInfo.soPhone}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.infoAssi:fasle) ? 'font-color':''">
                <el-form-item label="网格信息员:">
                  <span>{{afterSubInfo.infoAssi}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.infoAssiPhone:fasle) ? 'font-color':''">
                <el-form-item label="信息员联系方式:">
                  <span>{{afterSubInfo.infoAssiPhone}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.firstPl:fasle) ? 'font-color':''">
                <el-form-item label="第一责任人:">
                  <span>{{afterSubInfo.firstPl}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.firstPlTel:fasle) ? 'font-color':''">
                <el-form-item label="第一责任人联系方式:">
                  <span>{{afterSubInfo.firstPlTel}}</span>
                </el-form-item>
              </span>
            </div>

            <div class="row">
              <span :class="(fieldChange.duty?fieldChange.duty.manager:fasle) ? 'font-color':''">
                <el-form-item label="管理人员:">
                  <span>{{afterSubInfo.manager}}</span>
                </el-form-item>
              </span>

              <span :class="(fieldChange.duty?fieldChange.duty.managerTel:fasle) ? 'font-color':''">
                <el-form-item label="管理人员联系方式:">
                  <span>{{afterSubInfo.managerTel}}</span>
                </el-form-item>
              </span>
            </div>
          </div>
        </toggle-form>

        <toggle-form title="工单操作记录">
          <div style="text-align: left;font-size:20px;margin:20px 0px 0px 11px">
            <span>工单类型 : {{this.$route.params.workType}}</span>
          </div>
          <el-table :data="workTableData" style="margin-top:20px" class="table-div">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="optType" min-width="100" label="操作类型"></el-table-column>
            <el-table-column show-overflow-tooltip prop="state" min-width="100" label="操作结果"></el-table-column>
            <el-table-column show-overflow-tooltip prop="backReason" min-width="120" label="操作备注"></el-table-column>
            <el-table-column show-overflow-tooltip prop="username" min-width="100" label="操作员"></el-table-column>
            <el-table-column show-overflow-tooltip prop="optTime" min-width="100" label="操作日期"></el-table-column>
          </el-table>
        </toggle-form>

      </el-form>
    </div>

  </div>
</template>

<script>

import scroll from "utils/scroll";
import ToggleForm from "components/ToggleForm.vue";
import { getInfoFeldChange } from "views/sub/info/infoFieldChange";
import { changeInfo, getRecordByWorkId } from "api/sub/work.js";

export default {
  components: {
    ToggleForm,
  },
  mounted() {
    let $this = this;
    changeInfo(this.$route.params.id).then((r) => {
      this.afterSubInfo = r.data.afterSubInfo;
      this.beforeSubInfo = r.data.beforeSubInfo;
      this.fieldChange = getInfoFeldChange(this.afterSubInfo, this.beforeSubInfo);
      this.initProgress();
    });

    getRecordByWorkId(this.$route.params.id).then((r) => {
      this.workTableData = r.data;
    });
  },
  updated() {
    if (this.updatedTag) {
      //滚动效果
      scroll.call(this, 'slideIndex');
    }
  },
  methods: {
    changeData(selected) {
    },
    initProgress() {
      let option = [{
        show: this.fieldChange.based.show,
        title: '基础信息（变动前）',
      }, {
        show: this.fieldChange.based.show,
        title: '基础信息（变动后）',
      }, {
        show: this.fieldChange.personCharge.show,
        title: '负责人信息（变动前）',
      }, {
        show: this.fieldChange.personCharge.show,
        title: '负责人信息（变动后）',
      }, {
        show: this.fieldChange.management.show,
        title: '经营信息（变动前）',
      }, {
        show: this.fieldChange.management.show,
        title: '经营信息（变动后）',
      }, {
        show: this.fieldChange.duty.show,
        title: '责任落实（变动前）',
      }, {
        show: this.fieldChange.duty.show,
        title: '责任落实（变动后）',
      }, {
        show: true,
        title: '工单操作记录',
      }];
      this.progress = option.filter(item => item.show === true);
    }
  },
  data() {
    return {
      updatedTag: true,
      slideIndex: -1,
      workTableData: [],
      afterSubInfo: {},
      afterSubInfoStr: {},
      beforeSubInfo: {},
      beforeSubInfoStr: {},
      fieldChange: {},
      // 左边悬浮栏的数据
      progress: [
        { show: false, title: '基础信息(变动后)', },
        { show: false, title: '基础信息(变动前)', },
        { show: false, title: '负责人信息(变动后)', },
        { show: false, title: '负责人信息(变动前)', },
        { show: false, title: '经营信息(变动后)', },
        { show: false, title: '经营信息(变动前)', },
        { show: false, title: '责任落实(变动后)', },
        { show: false, title: '责任落实(变动前)', },
        { show: true, title: '工单操作记录', },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
// 左边悬浮信息栏的样式 start
$c: #0db5ef;

.table-div {
  width: 100%;
  text-align: center;
}

.font-color {
  color: red !important;
}
.font-color label {
  color: red;
}

.left-info {
  width: 210px;
  height: 560px;
  background: #fff;
  position: fixed;
  margin-left: -230px;
  margin-top: -20px;
  // z-index: 2;

  .head-block {
    background: #f2f5f8;
    height: 70px;
    padding: 14px 20px;
    box-sizing: border-box;
    .num {
      color: $c;
    }
  }
  .main-block {
    margin-top: 20px;
    // border-right: 2px solid #EBF1F5;
    // min-height: 470px;
    > li {
      border-right: 2px solid #ebf1f5;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      cursor: default;
      &:hover {
        background: #f2f5f8;
      }
      .right {
        color: #a2aab6;
      }
    }
    .activePosition {
      border-right: 2px solid $c;
      .left {
        color: $c;
      }
    }
  }
}
// 左边悬浮信息栏的样式 end

.right-info {
  width: 100%;
}

// .content {
//   padding-left: 25%;
//   margin-top: 20px;
// }
</style>

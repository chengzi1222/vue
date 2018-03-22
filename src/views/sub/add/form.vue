<template>
  <div>
    <!-- 左边信息悬浮栏 -->
    <div class="left-info">
      <div class="head-block">
                <span>信息完成度:
                    <span class="num" style="margin-left:20px;">{{e.percentageNumber}}%</span>
                </span>
        <el-progress :percentage="e.percentageNumber" style="margin-top:5px;"></el-progress>
      </div>

      <ul class="main-block">
        <li class="clearfix " :class="slideIndex==index?'activePosition':''" v-for="(item,index) in progress" :key="index">
          <p class="floatL left">{{item.title}}</p>
          <p class="floatR right">
            <span>{{item.successNum}}</span>/
                        <span>{{item.totalNum}}</span>
          </p>
        </li>
      </ul>

    </div>
    <!-- 左边信息悬浮栏 end-->
    <div class="right-info">
      <el-form :model="e" :rules="rules" ref="e" label-width="130px" class="demo-ruleForm labW150">
        <!-- 基础信息 -->
        <toggle-form title="基础信息">
          <div class="content">
            <div class="row">
              <el-form-item label="主体名称:" prop="entityName">
                <el-input class="w200" v-model="e.entityName" :disabled="e.formState == 'change'" :maxlength="50" placeholder="请输入主体名称"></el-input>
              </el-form-item>

              <el-form-item label="社会统一信用代码:" v-if="(e.natureType == 'yzyz' || e.natureType == 'yzwz') && e.formState == 'change'">
                <el-input class="w200" v-model="e.creditCode" :disabled="e.formState == 'change'" :maxlength="50" ref="creditCode"  @blur="creditCodeChange" placeholder="请输入统一社会信用代码"></el-input>
              </el-form-item>

              <el-form-item label="社会统一信用代码:" prop="creditCode" v-if="(e.natureType == 'yzyz' || e.natureType == 'yzwz') && e.formState != 'change'">
                <el-input class="w200" v-model="e.creditCode" :disabled="e.formState == 'change'" :maxlength="50" ref="creditCode"  @blur="creditCodeChange" placeholder="请输入统一社会信用代码"></el-input>
              </el-form-item>

            </div>
            <div class="row" v-if="e.natureType == 'yzyz' || e.natureType == 'yzwz'">
              <el-form-item label="法人姓名:" prop="legalPerson">
                <el-input class="w200" v-model="e.legalPerson" :disabled="e.formState == 'change'" :maxlength="32" placeholder="例:王维"></el-input>
              </el-form-item>
              <el-form-item label="主体工商备案状态:" prop="creditType">
                <el-select class="w200" placeholder="请选择主体工商状态" v-model="e.creditType" >
                  <el-option  v-for="item in creditTypeSelect"  :label="item.name" :value="item.key" :key="item.key">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="row" v-if="e.natureType == 'yzyz' && creditCodeList && creditCodeList.length > 0">
              <el-form-item label="该主体已拥有许可证:">
                <div v-for="item in creditCodeList"><span class="tag" >{{item.licenceTypeStr}}：{{item.licence}}</span></div>
              </el-form-item>
            </div>

            <div class="row" v-if="e.natureType == 'yzyz'">
              <el-form-item label="许可证类型:" prop="licenceType">
                <el-select v-model="e.licenceType" :disabled="e.formState == 'change'">
                  <el-option  v-for="item in licenceTypeSelect" :label="item.name" :value="item.key" :key="item.key">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="许可备案号:" class="mL-10" prop="licence">
                <el-input class="w200" v-model="e.licence" :disabled="e.formState == 'change'" :maxlength="50" placeholder="请输入许可备案号"></el-input>
              </el-form-item>
            </div>

            <div class="row" v-if="e.natureType == 'yzyz'">
              <el-form-item label="有效期:" prop="licenceTime">
                <el-date-picker
                  class="w200"
                  v-model="e.licBegin"
                  :editable="false"
                  :picker-options="pickerOptions0"
                  placeholder="选择日期">
                </el-date-picker>
                -
                <el-date-picker
                  class="w200"
                v-model="e.licEnd"
                :editable="false"
                :picker-options="pickerOptions1"
                placeholder="选择日期">
              </el-date-picker>
              </el-form-item>
            </div>

            <div class="row" v-if="e.natureType == 'yzyz'">
              <el-form-item label="许可证状态(主体状态):" prop="licState">
                <el-select class="w120" v-model="e.licState" placeholder="请选择">
                  <el-option  v-for="item in licStateSelect" :label="item.name" :value="item.key" :key="item.key">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
            </div>

          </div>
        </toggle-form>

        <!-- 负责人信息  -->
        <toggle-form title="负责人信息">
          <div class="content">
            <div class="row">
              <el-form-item label="负责人:" prop="corpName">
                <el-input class="w120" v-model="e.corpName" :maxlength="32" placeholder="例：王维"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="mobile">
                <el-input class="w150" v-model="e.mobile" :maxlength="11" placeholder="例：187226491XX"></el-input>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="身份证号:" prop="idNo">
                <el-input class="w300" v-model="e.idNo" :maxlength="18" placeholder="请输入18位身份证号"></el-input>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="住所:" prop="address">
                <el-input class="w300" v-model="e.address" :maxlength="50" placeholder="请输入住所"></el-input>
              </el-form-item>
            </div>
          </div>
        </toggle-form>


        <!-- 经营信息 -->
        <toggle-form title="经营信息">
          <div class="content">

            <div class="row">
              <el-form-item label="风险等级:" prop="riskRank">
                <el-select clearable class="w200" placeholder="请选择风险等级" v-model="e.riskRank">
                  <el-option  v-for="item in riskRankSelect" :label="item.name" :value="item.code" :key="item.key">{{item.name}}</el-option>
                </el-select>
                <span class="optional">（选填）</span>
              </el-form-item>
              <el-form-item label="量化等级:" prop="quanLevel">
                <el-select clearable class="w200" v-model="e.quanLevel" placeholder="请选择量化等级">
                  <el-option  v-for="item in quanLevelSelect" :label="item.name" :value="item.code" :key="item.key">{{item.name}}</el-option>
                </el-select>
                <span class="optional">（选填）</span>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="经营面积:"  prop="spaceArea">
                <el-input class="w150" :maxlength="9" v-model="e.spaceArea" placeholder="例：120"></el-input>&nbsp;m²
                            </el-form-item>
              <!--<el-form-item label="场所分布:" prop="spaceDst">
                <el-select class="w200"  v-model="e.spaceDst" placeholder="请选择场所分布">
                  <el-option  v-for="item in spaceDstSelect" :label="item.name" :value="item.code" :key="item.code">{{item.name}}</el-option>
                </el-select>
              </el-form-item>-->
              <el-form-item label="场所分布:" prop="spaceDst">
                <el-checkbox-group v-model="e.spaceDst" size="large">
                  <el-checkbox-button v-for="item in spaceDstSelect" :label="item.code" :key="item.id">{{item.name}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="经营场所:" prop="spaceAddr">
                <el-input class="w300" :maxlength="50" v-model="e.spaceAddr" placeholder="请输入经营场所"></el-input>
                <span class="w250 tip">请真实填写，可在地理信息定位系统中展示，如：XX省XX市XX区/县XX镇</span>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="从业人数:" prop="empNumber">
                <el-input class="w120" :maxlength="6" v-model="e.empNumber" placeholder="例：20"></el-input>
              </el-form-item>
              <el-form-item label="主体业态:" prop="subType">
                <el-select class="w200" v-model="e.subType" placeholder="请选择主体业态">
                  <el-option   v-for="item in subTypeSelect" :label="item.name" :value="item.code" :key="item.code">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="经济性质:"  prop="econType">
                <el-select class="w200" v-model="e.econType" placeholder="请选择经济性质">
                  <el-option  v-for="item in econTypeSelect" :label="item.name" :value="item.key" :key="item.key">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业状态:" prop="manageState">
                <el-select class="w200" v-model="e.manageState" placeholder="请选择营业状态">
                  <el-option  v-for="item in manageStateSelect" :label="item.name" :value="item.key" :key="item.key">{{item.name}}</el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="row" v-if="e.entityType == 'product'">
              <el-form-item label="经营类别:" prop="operType">
                <el-checkbox-group v-model="e.operType" size="large">
                  <el-checkbox-button v-for="operType in operTypeBtn" :label="operType.code" :key="operType.id">{{operType.name}}</el-checkbox-button>
                </el-checkbox-group>
                <el-button class="more-btn" @click="moreClick">更多食品类别</el-button>
                <search-tap v-if="showMore"
                            :ajax='ajax'
                            listFiled="data"
                            text="name"
                            checkedListFiled="checked"
                            @searchTapChange="searchTapChange1"
                            placeholder="请输入搜索信息,例:酒"
                >
                </search-tap>
              </el-form-item>
            </div>
            <div class="row" v-if="e.entityType == 'product'">
              <el-form-item label="经营明细:" prop="operDetail">
                <search-tap
                  :ajax='ajax2'
                  :checkbox="operDetailCheck"
                  listFiled="data"
                  text="name"
                  checkedListFiled="checked"
                  @searchTapChange="searchTapChange2"
                  placeholder="请输入搜索信息,例:酒"
                >
                </search-tap>
              </el-form-item>
            </div>

            <div class="row" v-if="e.entityType == 'circulation' || e.entityType == 'restaurant'">
              <el-form-item label="经营项目:" >
                <btn-select :data="operProBtnSelect"
                            @changeData="operProBtnChange">
                </btn-select>
                <el-checkbox-group v-model="e.operPro">
                  <el-checkbox-button v-for="item in operProBtn" :label="item.code" :key="item.id">{{item.name}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="详细经营信息:">
                <yb-select
                  @getSelectData="getDetailedSelect"
                  :selectData="detailedEngageItem"
                  :checkedData="detailedEngage"
                  showFlied="name"
                  childFlid="children"
                  id='id'>
                </yb-select>
              </el-form-item>
              <span style="color: #A2AAB6;font-size:12px;margin-right:40%;float: right;margin-top: 10px;">(选填)</span>
            </div>

          </div>
        </toggle-form>


        <!-- 责任落实 -->
        <toggle-form title="责任落实">
          <div class="content">
            <div class="row">
              <el-form-item label="所属食药所:" prop="syj">
                <el-select class="w200" v-model="e.syj" @change="getGridChange" placeholder="请选择食药所">
                  <el-option
                    v-for="item in syjSelect"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在网格:" prop="grid">
                <el-select class="w200" v-model="e.grid" @change="gridSelectChange"  placeholder="请选择所属网格">
                  <el-option
                    v-for="item in gridSelect"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="监督人员:" prop="so">
                <el-select class="w200" v-model="e.so" @change="soSelectChange" placeholder="请选择监督人员">
                  <el-option
                    v-for="item in soSelect"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
              <span style="margin-left:6px;color:#48576a" v-if="e.grid != ''">监督人员联系方式:
                                    <span style="margin-left:12px;">{{e.soPhone}}</span>
                                </span>
            </div>
            <div class="row">
              <el-form-item label="网格信息员:" prop="infoAssi">
                <el-select class="w200" v-model="e.infoAssi" @change="infoAssiSelectChange" placeholder="请选择信息员">
                  <el-option
                    v-for="item in infoAssiSelect"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <span style="margin-left:-7px;color:#48576a" v-if="e.infoAssi != ''">网格信息员联系方式:
                                    <span style="margin-left:12px;">{{e.infoAssiPhone}}</span>
                                </span>
            </div>
            <div class="row">
              <el-form-item label="第一负责人:" prop="firstPl">
                <el-input class="w120" :maxlength="32" v-model="e.firstPl" placeholder="例：王维"></el-input>
              </el-form-item>
              <el-form-item label="联系方式:" prop="firstPlTel">
                <el-input class="w150" :maxlength="11" v-model="e.firstPlTel" placeholder="例：18722649176"></el-input>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="管理人员:" prop="manager">
                <el-input class="w120" :maxlength="32" v-model="e.manager" placeholder="例：王维"></el-input>
                <span class="optional">（选填）</span>
              </el-form-item>
              <el-form-item label="联系方式:" prop="managerTel">
                <el-input class="w150" :maxlength="11" v-model="e.managerTel" placeholder="例：18722649176"></el-input>
                <span class="optional">（选填）</span>
              </el-form-item>
            </div>
          </div>
        </toggle-form>
      </el-form>
    </div>

    <!-- 底部按钮 -->
    <div class="foot-btn" style="z-index:998">
      <div>
        <el-button style="width:120px;" @click="saveback" v-if="this.e.formState == 'add'">保存到草稿箱</el-button>
        <el-button type="primary" @click="submitSub" v-if="this.e.formState == 'add'">提交审核</el-button>
        <el-button type="primary" @click="updateSub" v-if="this.e.formState == 'edit'">提交审核</el-button>
        <el-button type="primary" @click="bizChange" v-if="this.e.formState == 'change'">提交审核</el-button>
        <el-button style="width:120px;" @click="backBtn" v-if="this.e.formState == 'change' || this.e.formState == 'edit'">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ToggleForm from "components/ToggleForm.vue";
  import BtnSelect from "components/BtnSelect.vue";
  import SearchTap from "components/SearchTap.vue";
  import scroll from "utils/scroll";
  import{getData,addSub,getGrid,getSoEmp,getInfoAssi,
    getLicenceno,getCreditinfo,getOperTypes,getProd,
    autosaveback,saveback,getOperDetail,edit} from  "api/sub/add.js";
  import{floatValid,idNoValid,phoneValid,intValid, checkSocialCreditCode} from 'utils/validate';
  import {listDictUserItemByDictCode,listDictUserItemByCodeAll,getEnums} from 'api/common.js';
  import {change,changeInfo,reapply} from 'api/sub/work.js';
  import YbPopup from 'components/ybpopup/YbPopup';
  import YbSelect from 'components/ybselect/YbSelect.vue'
  import {getByAreaCode} from 'api/admin/area.js';

  let _this;
  export default {
    components: {
      ToggleForm,
      SearchTap,BtnSelect,YbPopup,YbSelect
    },
    mounted(){
      _this = this;
      //滚动效果
     scroll.call(this,'slideIndex');
     this.routeChange();
      //详细经营信息
      listDictUserItemByCodeAll("OTHER_MANAGEMENT").then((r) =>{
        this.detailedEngageItem = r.data;
      });
      //获取经营状态
      getEnums(['com.ybveg.govx.enums.ManageStateEnum'],false).then((r) => {
        this.manageStateSelect = r.data
      });

      if (this.e.entityType == 'product'){
        listDictUserItemByDictCode("OTHER_RISK").then((r) =>{
          this.commondata.pb_riskRankSelect = r.data;
        });
        listDictUserItemByDictCode("OTHER_QUANTIFY").then((r) =>{
          this.commondata.pb_quanLevelSelect = r.data;
        });
        listDictUserItemByDictCode("PB_SUB").then((r) =>{
          this.commondata.pb_subTypeSelect = r.data;
        });
      }

      if (this.e.entityType == 'circulation'){
        //流通主体经营项
        listDictUserItemByDictCode("CB_MANAGEMENT").then((r) =>{
          this.commondata.cb_operProBtn = this.groupOperBtn(r.data);
        });
        listDictUserItemByDictCode("OTHER_QUANTIFY").then((r) =>{
          this.commondata.cb_quanLevelSelect = r.data;
        });
        listDictUserItemByDictCode("OTHER_RISK").then((r) =>{
          this.commondata.cb_riskRankSelect = r.data;
        });
        listDictUserItemByDictCode("CB_SUB").then((r) =>{
          this.commondata.cb_subTypeSelect = r.data;
        });
      }

      if (this.e.entityType == 'restaurant') {
        //餐饮主体经营项
        listDictUserItemByDictCode("RB_MANAGEMENT").then((r) =>{
          this.commondata.rb_operProBtn = this.groupOperBtn(r.data);
        });
        listDictUserItemByDictCode("OTHER_QUANTIFY").then((r) =>{
          this.commondata.rb_quanLevelSelect = r.data;
        });
        listDictUserItemByDictCode("OTHER_RISK").then((r) =>{
          this.commondata.rb_riskRankSelect = r.data;
        });
        listDictUserItemByDictCode("RB_SUB").then((r) =>{
          this.commondata.rb_subTypeSelect = r.data;
        });
      }

//      //量化等级
//      listDictUserItemByDictCode("OTHER_QUANTIFY").then((r) =>{
//        this.commondata.cb_quanLevelSelect = r.data;
//      });
//
//      //风险等级
//      listDictUserItemByDictCode("OTHER_RISK").then((r) =>{
//        this.commondata.cb_riskRankSelect = r.data;
//      });

      //场所分布
      listDictUserItemByDictCode("OTHER_PLACE").then((r) =>{
        this.spaceDstSelect = r.data;
      });
      getByAreaCode().then((r) => {
        this.e.spaceAddr = r.data.fullName;
      });
      //添加主体需要的数据
      getData(this.$route.params.entityId,this.$route.params.workId,this.$route.params.backupId,this.e.entityType).then(async (r) => {
        let rdata = r.data;
        Object.assign(this.commondata,rdata);
        this.routeChange();
        this.initSyj(rdata.syj);
        if (this.e.formState == 'change' && this.$route.params.workId){
          await changeInfo(this.$route.params.workId).then((r) => {
            rdata.entity = r.data.afterSubInfo;
            rdata.entity.operType = rdata.entity.operType ? rdata.entity.operType.split(",") : [];
            rdata.entity.operDetail = rdata.entity.operDetail ? rdata.entity.operDetail.split(",") : [];
            rdata.entity.operPro = rdata.entity.operPro ? rdata.entity.operPro.split(",") : [];
            rdata.entity.spaceDst = rdata.entity.spaceDst ? rdata.entity.spaceDst.split(",") : [];
            rdata.entity.detailedEngage = rdata.entity.detailedEngage ? rdata.entity.detailedEngage.split(",") : [];
            rdata.entity.natureType = rdata.entity.natureType.toLowerCase();
            rdata.entity.entityType = rdata.entity.entityType.toLowerCase();
          });
        }

        if (rdata.entity) {
          let isSetEntity = true;
          if (this.e.formState == 'add' && !this.$route.query.auto){
            if (rdata.auto) {
              await this.$confirm('检测到您' + rdata.entity.createData + '有没有完成的录入信息，是否继续上次的录入操作？', '录入提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then((r) => {
                this.$router.push({path: rdata.entity.natureType,query: {
                  auto: true
                }});
              }).catch((r) => {
                isSetEntity = false;
              });
            }
          }
          if (isSetEntity) {
            this.e = rdata.entity;
//            this.getGridChange(this.e.syj);
//            this.gridSelectChange(this.e.grid);
            //覆盖原始对象,初始化路由信息
            this.routeInit();

            if (this.e.spaceArea) this.e.spaceArea = this.e.spaceArea.toString();
            if (this.e.empNumber) this.e.empNumber = this.e.empNumber.toString();

            //如果有三小数据开始处理
            rdata.entity.syj_a = rdata.entity.syj;
            rdata.entity.grid_a = rdata.entity.grid;
            rdata.entity.so_a = rdata.entity.so;
            rdata.entity.infoAssi_a = rdata.entity.infoAssi;
            //处理详细经营信息
            let detailedEngages = [];
            if (rdata.entity.detailedEngage){
              for(let i = 0;i < rdata.entity.detailedEngage.length;i++){
                let de = rdata.entity.detailedEngage[i];
                for(let j = 0;j<this.detailedEngageItem.length;j++){
                  if (de == this.detailedEngageItem[j].code){
                    detailedEngages.push(this.detailedEngageItem[j]);
                  }
                }
              }
            }
//            this.e.detailedEngage = detailedEngages;
            this.detailedEngage = detailedEngages;

            //如果是编辑,合并,判断更多是否有数据,有数据合并到
            let otm = this.e.operTypeMore;
            if (otm) {
              for (let i = 0; i < otm.length; i++) {
                this.e.operType.push(otm[i].code);
              }
            }

            let op = [];
            let nop = [];
            let nopm = [];
            op = op.concat(this.e.operPro, this.e.operProMore);

            let psb = this.operProBtnSelect;
            for (let i = 0; i < op.length; i++) {
              let fs = op[i];
              let isExist = false;
              if (fs) {
                for (let j = 0; j < psb.length; j++) {
                  let psbitem = psb[j];
                  let indexOf = fs.indexOf(psbitem.code);
                  if (indexOf == 0) {
                    isExist = true;
                    if (psbitem.code == fs) {
                      psbitem.active = true;
                      psbitem.ccode = psbitem.code;
                      psbitem.cname = psbitem.name;
                    } else {
                      let children = psbitem.children
                      for (let o = 0; o < children.length; o++) {
                        if (fs == children[o].code) {
                          psbitem.active = true;
                          psbitem.ccode = children[o].code;
                          psbitem.cname = children[o].name;
                        }
                      }
                    }
                  }
                }
              }
              if (isExist) {
                nopm.push(fs);
              } else {
                nop.push(fs);
              }
            }
            this.e.operPro = nop;
            this.e.operProMore = nopm;

            this.e.operTypeMore = [];
            if (this.e.formState != 'add') {
              getOperDetail("PB_VARIETY", this.e.operDetail).then((r) => {
                this.e.operDetail = r.data;
                this.operDetailCheck = this.e.operDetail;
              })
            } else {
              this.operDetailCheck = this.e.operDetail;
            }

            this.creditCodeChange();
          }
        }
        //生产主体经营类别
        getOperTypes(this.e.operType,"PB_CATEGORY").then((r) => {//获取经营类别
          this.operTypeBtn = r.data;
        });
        //枚举数据
        this.creditTypeSelect = rdata.entityBackupState;
        this.licStateSelect = rdata.licenceStateEnum;
        this.econTypeSelect = rdata.businessNature;
      });
      //数据加载完成之后,调用routerChange
    },
    data() {
      return {
        pickerOptions0:{
          disabledDate(time){
            if (_this.e.licEnd == '') return false;
            return time.getTime() > _this.e.licEnd;
          }
        },
        pickerOptions1:{
          disabledDate(time){
            if (_this.e.licBegin == '') return false;
            return time.getTime() < _this.e.licBegin;
          }
        },
        //select 选择框数据
        creditTypeSelect:[],//主体工商备案状态
        licenceTypeSelect:[],//许可证类型
        licenceTypeState:true,
        licStateSelect:[],//许可证状态
        manageStateSelect:[],//许可证状态
        riskRankSelect:[],//风险等级
        quanLevelSelect:[],//量化等级
        spaceDstSelect:[],//场所分布
        subTypeSelect:[],//主体业态
        econTypeSelect:[],//经济性质
        syjSelect:[],//所属食药所
        gridSelect:[],//所在网格
        soSelect:[],//监督人员
        infoAssiSelect:[],//网格信息员
        operTypeBtn:[],//生产类别
        operProBtn:[],
        operProBtnSelect:[],
        creditCodeList:[],//当前信用的许可证集合
        commondata:{},
        operDetailCheck:[],
        detailedEngageItem:[],
        detailedEngage:[],
        //operType
        slideIndex:-1,
        tableData: [{ index: 1 }, { index: 2 }],

        showMore:false,
        // 左边悬浮栏的数据
        progress: [
          {
            title: '基础信息',
            successNum: 0,
            totalNum: 9
          },
          {
            title: '负责人信息',
            successNum: 0,
            totalNum: 4
          },
          {
            title: '经营信息',
            successNum: 0,
            totalNum: 12
          },
          {
            title: '责任落实',
            successNum: 0,
            totalNum: 8
          },
        ],
        //主体数据
        entity:{},
        e:{
          formState:'',
          deptId:'',
          areaCode:'',
          type:'',
          entityName:'',
          bizLic:'',
          creditCode:'',
          creditType:'',
          legalPerson:'',
          licLimit:'',
          recordBegin:'',
          recordEnd:'',
          corpName:'',
          mobile:'',
          idNo:'',
          censusReg:'',
          address:'',
          createUser:'',
          createTime:'',
          entityId:'',
          entityType:'',
          natureType:'',
          licence:'',
          licenceType:'',
          licBegin:'',
          licEnd:'',
          licState:'',
          riskRank:'',
          quanLevel:'',
          spaceArea:'',
          spaceDst:[],
          detailedEngage:[],
          spaceAddr:'',
          empNumber:'',
          manageState:'',
          subType:'',
          econType:'',
          operType:[],
          operTypeMore:[],
          operDetail:[],
          operPro:[],
          operProMore:[],
          syj:'',
          grid:'',
          so:'',
          soPhone:'',
          infoAssi:'',
          infoAssiPhone:'',
          firstPl:'',
          firstPlTel:'',
          manager:'',
          managerTel:'',
          percentageNumber:0
      },
        rules: {
          manager:[
            {validator:this.blurCount,trigger:'blur'}
          ],
          managerTel:[
            { validator: phoneValid, trigger:'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          riskRank:[
            {validator:this.blurCount,trigger:'change'}
          ],
          quanLevel:[
            {validator:this.blurCount,trigger:'change'}
          ],
          entityName: [
            { required:true, message: '请输入主体名称', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          creditCode:[
            { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
            {validator:this.creditCodeValid,trigger:'blur'},
            { validator: checkSocialCreditCode, trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          legalPerson:[
            {required: true, message: '请输入法人姓名', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          creditType:[
            {required: true, message: '请选择主体工商备案状态', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          licState:[
            {required: true, message: '请选择许可证状态', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          manageState:[
            {required: true, message: '请选择营业状态', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          licenceType:[
            {required: true, message: '请选择许可证类型', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          licence:[
            {required: true, message: '请输入许可备案号', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          licenceTime:[
            {validator:this.licenceTimeValid, trigger: 'blur' },
            {validator:this.licenceTimeValid, trigger: 'change' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          corpName:[
            { required: true, message: '请输入负责人', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: phoneValid, trigger:'blur' }
            ,{validator:this.blurCount,trigger:'blur'}
          ],
          idNo:[
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: idNoValid, trigger:'blur' }
            ,{validator:this.blurCount,trigger:'blur'}
          ],
          censusReg:[
            { required: true, message: '请输入户籍地址', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          address:[
            { required: true, message: '请输入住所', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          mngType:[
            { required: true, message: '请选择经营形态', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          empNumber:[
            { required: true, message: '请输入从业人数', trigger: 'blur' },
            { validator: intValid, trigger:'blur' },
            { min: 1, max: 7, message: '长度为在 1 到 7 位的整数', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          operType:[
            {validator:this.operTypeValid,trigger:'change'},
            {validator:this.blurCount,trigger:'change'}
          ],
          operDetail:[
            {validator:this.operDetailValid,trigger:'change'},
            {validator:this.blurCount,trigger:'change'}
          ],
          operPro:[
            {validator:this.operProValid,trigger:'change'},
            {validator:this.blurCount,trigger:'change'}
          ],
          spaceDst:[
            { type:'array',required: true, message: '请选择场所分布', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          spaceArea:[
            { required: true, message: '请输入经营面积数值', trigger: 'blur' },
            {validator:floatValid,trigger:'blur'},
            {validator:this.blurCount,trigger:'blur'}
          ],
          spaceAddr:[
            { required: true, message: '请输入场所地址', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          syj:[
            { required: true, message: '请选择食药所', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          grid:[
            { required: true, message: '请选择网格', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          so:[
            { required: true, message: '请选择监管人员', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          infoAssi:[
            { required: true, message: '请选择网格信息员', trigger: 'change' },
            { validator:this.blurCount,trigger:'change'}
          ],
          firstPl:[
            { required: true, message: '请输入第一负责人', trigger: 'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          firstPlTel:[
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { validator: phoneValid, trigger:'blur' },
            {validator:this.blurCount,trigger:'blur'}
          ],
          subType:[
            { required: true, message: '请选择主体业态', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ],
          econType:[
            { required: true, message: '请选择经济性质', trigger: 'change' },
            {validator:this.blurCount,trigger:'change'}
          ]
        }
      }
    },
    methods:{
      getDetailedSelect(val){
        this.e.detailedEngage = val;
        this.blurCount();
      },
      backBtn(){
        this.$router.push({path: this.$route.params.resultRouter,query:{tag:"back"}});
      },
      bizChange(){
        this.$refs['e'].validate((valid) => {
          if (valid){
            this.$confirm('是否要提交审核?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (!this.$route.params.workId){
                change(this.e).then((r) =>{
                  if(!r.status){
                    this.$message({
                      message: r.message,
                      type: r.level
                    });
                    return;
                  }
                  this.$message({
                    message:'主体提交变更审核成功!!',
                    type: 'success'
                  });

                  setTimeout(() => {
                    this.$router.push({path: this.$route.params.resultRouter,query:{tag:"back"}});
                  }, 1000);

                });
              }else{
                this.e.workId = this.$route.params.workId;
                reapply(this.e).then((r) =>{
                  if(!r.status){
                    this.$message({
                      message: r.message,
                      type: r.level
                    });
                    return;
                  }
                  this.$message({
                    message:'主体重新申请提交成功!!',
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.push({path: this.$route.params.resultRouter,query:{tag:"back"}});
                  }, 1000);

                });
              }
            }).catch(() => {

            });
          }
        });
      },
      updateSub(){
        this.e.workId = this.$route.params.workId;
        edit(this.e).then((r) =>{
          if(!r.status){
            this.$message({
              message: r.message,
              type: r.level
            });
            return;
          }
          this.$message({
            message:'主体重新申请提交成功!!',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push({path: this.$route.params.resultRouter,query:{tag:"back"}});
          }, 1000);
        });
      },
      moreClick(){
        this.showMore = !this.showMore;
        if (!this.showMore){
          this.e.operTypeMore = [];
        }

        this.$refs['e'].validateField('operType');
      },
      //事件
      getGridChange(id){
        if (this.e.syj_a && this.e.syj_a != ''){
          let syj = this.e.syj_a;
          this.e.syj_a = '';//消费掉
          this.e.syj = syj;
          id = syj;
        }
        for (let i = 0;i < this.syjSelect.length > 0;i++){
          if(this.syjSelect[i].id  == id){
            this.getGrid(this.syjSelect[i].areaCode);
            return;
          }
        }
      },
      gridSelectChange(id){
        //我什么时候执行
        this.getSoEmp(id)
        this.getInfoAssi(id);
      },
      creditCodeChange(){ //信用代码变化时
        if (this.e.creditCode == '') return;
        this.licenceTypeState = true;
          if (this.e.natureType == 'yzyz' || this.e.natureType == 'yzwz'){
            getCreditinfo(this.e.creditCode).then((r) => {
              this.creditCodeList = [];
              let licence = [];//当前主体类型的许可证类型集合
              if (this.e.entityType == 'product'){
                licence = this.commondata.produceLicenceType;
              }else if (this.e.entityType == 'circulation'){
                licence = this.commondata.flowLicenceType;
              }else{
                licence = this.commondata.foodLicenceType;
              }
              if (r.data){
                this.e.legalPerson = r.data.legalPerson;
                this.e.creditType = r.data.creditType;
                //获取数据开始
                getLicenceno(this.e.creditCode,this.e.entityId).then((r) => {
                    this.creditCodeList = r.data;
                    if (this.e.formState == 'change') return;
                    let licenceSelect = [];
                    for (let i = 0;i < licence.length;i++){//计算匹配筛选出没有录入的许可证类型
                        let lice = licence[i];
                        let exist = false;
                        for (let j = 0;j < this.creditCodeList.length;j++){
                          if (this.e.entityType == this.creditCodeList[j].entityType){
                            if (lice.key == this.creditCodeList[j].licenceType){
                              exist = true;
                              break;
                            }
                          }else {
                            this.creditCodeList = [];
                            this.licenceTypeState = false;
                            this.licenceTypeSelect = licence;
                            this.licenceTypeChange();
                            this.$alert('该社会统一信用代码对应了其它主体类型', '提示', {
                              confirmButtonText: '确定',
                              callback: r => {
                                this.$refs['e'].validateField('creditCode');
                              }
                            });
                            return;
                          }
                        }
                        if (!exist){
                          licenceSelect.push(lice);
                        }
                    }
                  this.licenceTypeSelect = licenceSelect;
                  this.licenceTypeChange();
                  if (licenceSelect.length == 0){
                      if (this.e.natureType == 'yzyz'){
                        this.$alert('该社会统一信用代码已经拥有对应许可证', '提示', {
                          confirmButtonText: '确定',
                          callback: r => {
                            this.$refs['e'].validateField('creditCode');
                          }
                        });
                      }
                  }

                })

              }else{
                this.licenceTypeSelect = licence;
                this.licenceTypeChange();
                this.$refs['e'].validateField('creditCode');
              }
            });
          }
      },

      licenceTypeChange(){
        let exist = false;
        for (let i = 0; i < this.licenceTypeSelect.length;i++){
          if (this.licenceTypeSelect[i].key == this.e.licenceType){
            exist = true;
            break;
          }
        }
        if (!exist){
          this.e.licenceType = '';
        }
      },

      ajax2(a){
        return new Promise((resolve, reject) => {
          getProd("PB_VARIETY",a).then((r) => {
            let list = r.data;
            for (let i = 0; i < list.length;i++){
              list[i].key = list[i].code;
            }
            let rest = {
              data:list,
              checked:this.e.operDetail
            }
            resolve(rest)
          });
        });
      },
      ajax(a){
        return new Promise((resolve, reject) => {
          let tbtn = this.operTypeBtn;
          let types = [];
          for (let i = 0; i < tbtn.length;i++){
            types.push(tbtn[i].code);
          }
          getProd("PB_CATEGORY",a,types).then((r) => {
            let list = r.data;
            for (let i = 0; i < list.length;i++){
              list[i].key = list[i].code;
            }
            let rest = {
              data:list
            }
            resolve(rest)
          });
        });
      },
      operProBtnChange(data){
        let project = [];
        for (let i = 0;i < data.length;i++ ){
          let item = data[i];
          if (item.ccode && item.ccode != ''){
            project.push(item.ccode);
          }
        }
        this.e.operProMore = project;
      },
      infoAssiSelectChange(val){
        if (this.infoAssiSelect){
          for (let i = 0;i < this.infoAssiSelect.length;i++){
            let infoAssi = this.infoAssiSelect[i];
            if (infoAssi.id == val){
              this.e.infoAssiPhone = infoAssi.phoneNumber;
              return;
            }
          }
          this.e.infoAssiPhone = '';
        }
      },
      soSelectChange(val){
        if (this.soSelect){
          for (let i = 0;i < this.soSelect.length;i++){
            let so = this.soSelect[i];
            if (val == so.id){
              this.e.soPhone = so.phoneNumber;
              return;
            }
          }
          this.e.soPhone = '';
        }
      },

      //初始化责任落实
      async initSyj(syj){
        this.syjSelect = syj;
        return;
        if (syj && syj.length > 0){//是否有食药局的数据
          let syj0 = syj[0];//有就取出第一个食药局
          if (this.e.syj != ''){ //如果食药局的id不为空
            for (let i = 0;i < syj.length;i++){
               if (this.e.syj == syj[i].id){//匹配
                 syj0 = syj[i];
                 await this.getGrid(syj0.areaCode,true);
                 return;
               }
            }
          }
          this.e.syj = syj0.id;
          //拉取网格
        }
      },
      //拉取网格信息
      async getGrid(syj){
        await getGrid(syj).then((results) => {
          let grid = results.data;
          this.gridSelect = grid;
          if (grid && grid.length > 0){
            let grid0 = grid[0];
            if (this.e.grid_a && this.e.grid_a != ''){
              this.e.grid_a = '';
              return;
            }
            this.e.grid = grid0.id;
          }else{
            //重置数据.
            this.e.grid = '';
            this.e.so = '';
            this.e.soPhone = '';
            this.e.infoAssi = '';
            this.e.infoAssiPhone = '';
            this.gridSelect = [];
            this.soSelect = [];
            this.infoAssiSelect = [];
          }
        });
      },
      async getSoEmp(id){
        await getSoEmp(id).then((results) => {
          let so = results.data;

          this.soSelect = so;
          if (so && so.length > 0){
            let so0 = so[0];
            this.e.so = so0.id;
            this.e.soPhone = so0.phoneNumber;
          }else {
            this.e.so = '';
            this.e.soPhone = '';
          }
        });
      },
      async getInfoAssi(id){
        await getInfoAssi(id).then((results) => {
          let infoAssi = results.data;
          this.infoAssiSelect = infoAssi;
          if (infoAssi && infoAssi.length > 0){
            let infoAssi0 = infoAssi[0];
              if (this.e.infoAssi_a && this.e.infoAssi_a != ''){
                for (let i = 0;i < infoAssi.length;i++){
                  if (this.e.infoAssi_a == infoAssi[i].id){
                    infoAssi0 = infoAssi[i];
                    break;
                  }
                }
                this.e.infoAssi_a = '';
              }
            this.e.infoAssi = infoAssi0.id;
            this.e.infoAssiPhone = infoAssi0.phoneNumber;
          }else {
            this.e.infoAssi = '';
            this.e.infoAssiPhone = '';
          }
        });
      },
      //数据验证
      blurCount(rule,value,callback){
        if(callback){
          callback();
        }
        let cnt = 0;
        if (this.e.entityName != '') cnt++;
        if (this.e.natureType == 'yzyz' || this.e.natureType == 'yzwz'){
          if (this.e.creditCode != '') cnt++;
          if (this.e.legalPerson != '') cnt++;
          if (this.e.creditType != '') cnt++;
        }
        if (this.e.natureType == 'yzyz'){
          if (this.e.licenceType != '') cnt++;
          if (this.e.licence != '') cnt++;
          if (this.e.licBegin != '') cnt++;
          if (this.e.licEnd != '') cnt++;
          if (this.e.licState != '') cnt++;
        }
        this.progress[0].successNum = cnt;
        cnt = 0;
        if (this.e.corpName != '') cnt++;
        if (this.e.mobile != '') cnt++;
        if (this.e.idNo != '') cnt++;
        if (this.e.address != '') cnt++;
        this.progress[1].successNum = cnt;
        cnt = 0;
        if (this.e.riskRank != '') cnt++;
        if (this.e.quanLevel != '') cnt++;
        if (this.e.spaceArea != '') cnt++;
        if (this.e.spaceDst.length > 0) cnt++;
        if (this.e.spaceAddr != '') cnt++;
        if (this.e.empNumber != '') cnt++;
        if (this.e.subType != '') cnt++;
        if (this.e.econType != '') cnt++;
        if (this.e.detailedEngage.length > 0) cnt++;
        if (this.e.manageState != '') cnt ++;
        if (this.e.entityType == 'product'){
          if (this.e.operType.length > 0 || (this.e.operTypeMore && this.e.operTypeMore.length > 0)) cnt++;
          if (this.e.operDetail.length > 0 ) cnt++;
        }else {
          if (this.e.operPro.length > 0 || (this.e.operProMore && this.e.operProMore.length > 0)) cnt++;
        }

        this.progress[2].successNum = cnt;
        cnt = 0;
        if (this.e.syj != '') cnt++;
        if (this.e.grid != '') cnt++;
        if (this.e.so != '') cnt++;
        if (this.e.infoAssi != '') cnt++;
        if (this.e.firstPl != '') cnt++;
        if (this.e.firstPlTel != '') cnt++;
        if (this.e.manager != '') cnt++;
        if (this.e.managerTel != '') cnt++;
        this.progress[3].successNum = cnt;

        let total = 0;
        let success = 0;
        for (let i = 0; i< this.progress.length;i++){
          total += this.progress[i].totalNum;
          success += this.progress[i].successNum;

        }
        this.e.percentageNumber = new Number(((success / total)* 100).toFixed(0)) * 1;

        if(this.e.formState == 'add'){
          if (this.e.percentageNumber > 40){
            autosaveback(this.e);
          }
        }

      },
      //operTypeValid
      operTypeValid(rule,value,callback){
        if (this.e.operType.length == 0 && this.e.operTypeMore.length == 0){
          callback(new Error('请选择经营类别'));
        }else {
          callback();
        }
      },
      operDetailValid(rule,value,callback){
        if (this.e.operDetail.length == 0 ){
          callback(new Error('请选择经营明细'));
        }else {
          callback();
        }
      },
      operProValid(rule,value,callback){
        callback();
      },

      licenceTimeValid(rule,value,callback){
        if (this.e.licBegin == '' || this.e.licEnd == ''){
          callback(new Error('请选择有效期'));
        }else {
          callback();
        }
      },
      creditCodeValid(rule,value,callback){
        if (this.licenceTypeState && this.licenceTypeSelect && this.licenceTypeSelect.length > 0){
          callback();
        }else {
          if (!this.licenceTypeState){
            callback(new Error('统一信用代码对应了其它主体类型'));
          }else{
            callback(new Error('统一信用代码已经拥有许可证'));
          }
        }
      },

      //当searchTap组件选项变化时触发
      searchTapChange1(checked){
        this.e.operTypeMore = checked;
        this.$refs['e'].validateField('operType');
      },
      searchTapChange2(checked){
        this.e.operDetail = checked;
        this.$refs['e'].validateField('operDetail');
      },


      groupOperBtn(rdata){
        let list1 = rdata;
        let list2 = [];
        let list3 = [];
        for (let i = 0;i < list1.length;i++){
          let item = list1[i];
          let indexof = item.path.indexOf('.');
          if (indexof == -1 ){
            let path = item.path + '.';
            for (let j = 0;j < list1.length;j++){
              let item2 = list1[j];
              indexof = item2.path.indexOf(path);
              if (indexof == 0){
                item.children = item.children?item.children:[];
                item.children.push(item2);
              }
            }
            if (item.children && item.children.length > 0){
              list3.push(item);
            }else {
              list2.push(item);
            }
          }
        }
        this.buliderOperBtn(list2);
        this.buliderOperBtn(list3);
        return {
          btn:list2,
          select:list3
        };
      },
      buliderOperBtn(list){
        for (let i = 0;i < list.length;i++){
          let item = list[i];
          if (item.children && item.children.length > 0){
            this.$set(item, 'hasChildren', true);
          }else {
            this.$set(item, 'hasChildren', false);
          }
          if (item.check){
            this.$set(item, 'active', true);
            this.$set(item, 'cname', item.check.name);
            this.$set(item, 'ccode', item.check.code);
          }else {
            this.$set(item, 'active', false);
            this.$set(item, 'cname', '');
            this.$set(item, 'ccode', '');
          }
        }
      },
      saveback(){
        saveback(this.e).then((r) =>{
          if(!r.status){
            this.$message({
              message: r.message,
              type: r.level
            });
            return;
          }
          this.e.backupId = r.data;
          this.$message({
            message:'保存草稿成功!!',
            type: 'success'
          });
        });
      },
      submitSub(){
        this.$refs['e'].validate((valid) => {
        if (valid){
          this.$confirm('是否要提交审核?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addSub(this.e).then((r) =>{
              if(!r.status){
                this.$message({
                  message: r.message,
                  type: r.level
                });
                return;
              }
              this.$message({
                message:'主体提交审核成功!!',
                type: 'success'
              });
              this.operProBtnSelect = [];
              this.detailedEngage = [];
              this.e.operPro = [];
              this.e.spaceDst = [];
              this.$refs['e'].resetFields();
              this.$router.push({path: 'yzyz'});
            })
          }).catch(() => {

          });
        }
      });
      },
      routeInit(){
        let path = this.$route.path;
        let paths = path.split("/");
        this.e.natureType = paths[paths.length - 1];
        this.e.entityType = paths[paths.length - 2];
        this.e.formState = paths[paths.length - 3];
      },
      routeChange(){
        this.routeInit();

        if (this.e.natureType == 'yzyz'){
          this.progress[0].totalNum = 9;
        }

        if (this.e.natureType == 'yzwz'){
          this.progress[0].totalNum = 4;
        }

        if (this.e.natureType == 'wzwz'){
          this.progress[0].totalNum = 1;
        }
        if (this.e.entityType == 'product'){
          this.subTypeSelect = this.commondata.pb_subTypeSelect;
          this.riskRankSelect =this.commondata.pb_riskRankSelect;
          this.quanLevelSelect = this.commondata.pb_quanLevelSelect;
          this.licenceTypeSelect = this.commondata.produceLicenceType;
          this.progress[2].totalNum = 12;
        }else if (this.e.entityType == 'circulation'){
          this.subTypeSelect = this.commondata.cb_subTypeSelect;
          this.riskRankSelect =this.commondata.cb_riskRankSelect;
          this.quanLevelSelect = this.commondata.cb_quanLevelSelect;
          if (this.commondata.cb_operProBtn){
            this.operProBtn = this.commondata.cb_operProBtn.btn;
            this.operProBtnSelect = this.commondata.cb_operProBtn.select;
          }
          this.licenceTypeSelect = this.commondata.flowLicenceType;
          this.progress[2].totalNum = 11;
        }else{
          this.subTypeSelect = this.commondata.rb_subTypeSelect;
          this.riskRankSelect =this.commondata.rb_riskRankSelect;
          this.quanLevelSelect = this.commondata.rb_quanLevelSelect;
          if (this.commondata.rb_operProBtn){
            this.operProBtn = this.commondata.rb_operProBtn.btn;
            this.operProBtnSelect = this.commondata.rb_operProBtn.select;
          }
          this.licenceTypeSelect = this.commondata.foodLicenceType;
          this.progress[2].totalNum = 11;
        }
        if (this.e.natureType == 'yzyz' || this.e.natureType == 'yzwz'){
          this.creditCodeChange();
        }

        this.blurCount();
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: 'routeChange'
    },
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
    margin-top: -100px;
    z-index: 2;

    .head-block {
      background: #F2F5F8;
      height: 70px;
      padding: 14px 20px;
      box-sizing: border-box;
      .num {
        color: $c;
      }
    }
    .main-block {
      margin-top: 20px; // border-right: 2px solid #EBF1F5;
      // min-height: 470px;
      >li {
        border-right: 2px solid #EBF1F5;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        cursor: default;
        &:hover {
          background: #F2F5F8;
        }
        .right {
          color: #A2AAB6;
        }
      }
      .activePosition {
        border-right: 2px solid $c;
        .left {
          color: $c
        }
      }
    }
  }

  // 更多食品类别的按钮
  .row .more-btn {
    display: block;
    background: #EBEFF2;
    color: #6D7787;
    margin-bottom: 10px;
    border: 0px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }

  // 左边悬浮信息栏的样式 end
  .right-info {
    width: 100%;
  }

  // .content {
  //   padding-left: 25%;
  //   margin-top: 20px;
  // }

  .tag {
    border-radius: 0;
    background: #EFF7F9;
    border: 1px solid #C2EAF8;
    padding: 8px 10px;
    line-height: 0px;
    line-height: 16px;
    margin: 5px  0;
    color: #33b2df;
    font-size: 14px;
    display: block !important;
  }
</style>




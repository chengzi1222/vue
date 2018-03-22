<style>
  .mT35 .el-table__header-wrapper{
    display: none;
  }
  .mT35 .firsTeit .el-table__header-wrapper{
    display: block;
  }
  .mT35 .el-table{
    border-top: none !important;
  }
  .mT35 .firsTeit{
    border-top: 1px solid #ebeef5!important;
  }
  .detail table{
    width:calc(100% - 270px) !important;
  }
</style>

<template>
  <div>
    <div style="margin-top:20px;border-left:3px solid  #0DB5EF;">
      <span v-if="curd === 'add'" style="margin-left:10px;font-size: 16px;color: #393939;font-weight:bolder;">添加整改复查记录</span>
      <span v-if="curd === 'detail'" style="margin-left:10px;font-size: 16px;color: #393939;font-weight:bolder;">限期整改记录详情</span>
    </div>
    <div class="container">
      <!-- 左边信息悬浮栏 -->
      <div v-show="curd === 'add'" class="left-info">
        <div class="head-block">
          <span>信息完成度:<span class="num" style="margin-left:20px;">{{percent}}%</span></span>
          <el-progress :percentage="percent" style="margin-top:5px;"></el-progress>
        </div>
        <ul class="main-block">
          <li class="clearfix " :class="slideIndex==index?'activePosition':''" v-for="(item,index) in progress" :key="index">
            <p class="floatL left">{{item.title}}</p>
            <p class="floatR right"><span>{{item.successNum}}</span>/<span>{{item.totalNum}}</span></p>
          </li>
        </ul>
      </div>
      <div v-show="curd === 'detail'" :class="curd === 'detail'?'marNo':''" class="left-info">
        <ul class="main-block">
          <li class="clearfix " :class="slideIndex==index?'activePosition':''" v-for="(item,index) in progress" :key="index">
            <p class="floatL left">{{item.title}}</p>
          </li>
        </ul>
      </div>
      <!-- 左边信息悬浮栏 end-->
      <div class="right-info">
        <div class="diva" style="cursor: pointer;" @click="goPatrolDetail">查看复查来源记录</div>
        <el-form :model="repatrol" :rules="rules" ref="repatrol" label-width="110px" class="demo-ruleForm">
          <!-- 基础信息 -->
          <toggle-form title="基础信息">
            <div class="content">
              <div class="row">
                <el-form-item label="复查时间:" prop="repatrolTime">
                  <el-date-picker @change="blurCount" v-if="curd === 'add'" style="width: 210px;" v-model="repatrol.repatrolTime" type="datetime" placeholder="选择复查时间">
                  </el-date-picker>
                  <span :key="curd + '-repatrolTime'" v-if="curd === 'detail'">{{initRepatrol.repatrolTime}}</span>
                  <span :key="curd + '-sourceRectifyTime'" style="font-size: 12px;color: #A2AAB6;">（复查截止日期{{initRepatrol.sourceRectifyTime}}）</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="监管人员:" prop="patrolSoId">
                  <el-select v-if="curd === 'add'" :key="curd + '-patrolSoId'" v-model="repatrol.patrolSoId" style="width: 180px;" placeholder="请选择监管人员">
                    <el-option
                      @change="blurCount"
                      v-for="item in soList"
                      :key="item.id"
                      :label="item.realName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <span v-if="curd === 'detail'" :key="curd + '-soUserName'">{{soUserName}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="信息员:">
                  <el-select v-if="curd === 'add'" :key="curd + '-personList'" multiple v-model="personList" style="width: 280px;" placeholder="请选择信息员">
                    <el-option
                      v-for="item in infoList"
                      :key="item.id"
                      :label="item.realName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <div v-if="personListRequired" style="color: #f56c6c; font-size: 12px;">请选择信息员</div>
                  <span v-if="curd === 'detail'" :key="curd + '-infoAssiUserName'">{{infoAssiUserName}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="主体名:">
                  <span :key="curd + '-entityName'">{{initRepatrol.entityName}}</span>
                </el-form-item>
                <el-form-item label="主体类型:">
                  <span :key="curd + '-entityTypeLabel'">{{initRepatrol.entityTypeLabel}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="许可备案号:">
                  <span :key="curd + '-license'">{{initRepatrol.license}}</span>
                </el-form-item>
              </div>

              <div class="row ww">
                <el-form-item label="关联来源巡查时间:">
                  <span :key="curd + '-sourceTime'">{{initRepatrol.sourceTime}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="来源类型:">
                  <span :key="curd + '-sourceTypeLabel'">{{initRepatrol.sourceTypeLabel}}</span>
                </el-form-item>
                <el-form-item label="巡查结果:">
                  <span :key="curd + '-sourceResultLabel'">{{initRepatrol.sourceResultLabel}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="不合格项数:">
                  <span :key="curd + '-initContext.count'">{{initContext.count}}</span>
                </el-form-item>
                <el-form-item label="重点不合格项数:">
                  <span :key="curd + '-initContext.importantCount'">{{initContext.importantCount}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="巡查备注:">
                  <div class="block" style="margin-top: 8px;">
                    {{initRepatrol.sourceRemark}}
                  </div>
                </el-form-item>
              </div>
            </div>
          </toggle-form>

          <!-- 巡查项 -->
          <toggle-form title="巡查项">
            <div class="mT35" v-if="tableList && curd === 'detail'">
              <el-table v-for="(item,index) in tableList" :key="index" :class="index==0?'firsTeit':''" :data="item" :span-method="objectSpanMethod" border class="table-div brN">
                <el-table-column show-overflow-tooltip prop="projectNo" label="检查项编号" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip prop="projectName" label="巡查项目" width="120"></el-table-column>
                <el-table-column show-overflow-tooltip prop="contextNo" label="巡查内容编号" width="120"></el-table-column>
                <el-table-column show-overflow-tooltip prop="context" label="巡查内容" width="250"></el-table-column>
                <el-table-column show-overflow-tooltip prop="importantLabel" label="是否重点项" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip prop="score" label="分值" width="50"></el-table-column>
                <el-table-column prop="initQualLabel" label="是否符合" width="80"></el-table-column>
                <el-table-column prop="remark" label="备注" width="160"></el-table-column>
              </el-table>
              <div class="zj">
                <span>总计：</span>
                <span :key="curd">{{contextStat.scoreTotal}}分</span>
              </div>
            </div>

            <div class="mT35" v-if="tableList && curd === 'add'">
              <el-table v-for="(item,index) in tableList" :key="item.id" :class="index==0?'firsTeit':''" :data="item" :span-method="objectSpanMethod" border class="table-div brN">
                <el-table-column show-overflow-tooltip prop="projectNo" label="检查项编号" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip prop="projectName" label="巡查项目" width="120"></el-table-column>
                <el-table-column show-overflow-tooltip prop="contextNo" label="巡查内容编号" width="120"></el-table-column>
                <el-table-column show-overflow-tooltip prop="context" label="巡查内容" width="250"></el-table-column>
                <el-table-column show-overflow-tooltip prop="importantLabel" label="是否重点项" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip prop="score" label="分值" width="50"></el-table-column>
                <el-table-column align="center" label="是否符合">
                  <template slot-scope="scope">
                    <single-checkbox :currentRowData="scope.row" @singlecheckboxchange="singlecheckboxchange"></single-checkbox>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="备注">
                  <template slot-scope="scope">
                    <input type="text" class="w160" v-model="scope.row.remark" :disabled="!scope.row.qual" placeholder="备注前先选择是否符合">
                  </template>
                </el-table-column>
              </el-table>
              <div class="zj">
                <span>总计：</span>
                <span>{{contextStat.scoreTotal}}分</span>
              </div>
            </div>
            <span v-if="contextListRequired" style="color: #f56c6c; font-size: 12px;">请选择至少一项巡查内容</span>
          </toggle-form>

          <!-- 经营信息 -->
          <toggle-form title="巡查结果">
            <div class="content">
              <div class="row ml30" style="margin-left: 40px;">
                <span :key="curd + '-contextStat.contextCount'" style="color: #6D7787;">本次复查，共复查问题项共{{contextStat.contextCount}}项，其中包含重点项{{contextStat.importantCount}}项目，经复查：</span>
              </div>
              <div class="row result ml30">
                <div class="item">
                  <div :key="curd + '-contextStat.qualCount'" class="number">{{contextStat.qualCount}}</div>
                  <div class="project-name">合格项</div>
                </div>
                <div class="item">
                  <div :key="curd + '-contextStat.unqualCount'" class="number">{{contextStat.unqualCount}}</div>
                  <div class="project-name">不合格项</div>
                </div>
                <div class="item">
                  <div :key="curd + '-contextStat.unqualImportantCount'" class="number">{{contextStat.unqualImportantCount}}</div>
                  <div class="project-name">重点项不合格</div>
                </div>
              </div>
              <div class="row ml30" style="margin: 20px 0">
                <span style="font-size: 18px;color: #393939;">企业得分：</span><span :key="curd +'-contextStat.scoredTotal'" style="color: #0DB5EF;font-size: 18px; ">{{contextStat.scoredTotal}}分</span>
                <span :key="curd + '-contextStat.scoreTotal'" style="font-size: 12px;color: #A2AAB6;margin-left: 40px;">（满分：{{contextStat.scoreTotal}}分，此评分仅供参考）</span>
              </div>
              <div class="row">
                <el-form-item label="巡查结果：" prop="result">
                  <el-radio-group v-if="curd === 'add'" @change="blurCount" v-model="repatrol.result" size="medium">
                    <el-radio-button label="QUALIFIED" >符合</el-radio-button>
                    <el-radio-button label="PASSED">基本符合</el-radio-button>
                    <el-radio-button label="DISQUALIFIED">不符合</el-radio-button>
                  </el-radio-group>
                  <span v-if="curd === 'detail'">{{initRepatrol.resultLabel}}</span>
                </el-form-item>
              </div>
              <div class="row">
                <el-form-item label="处理方式：" prop="treat">
                  <el-radio-group v-if="curd === 'add'" @change="blurCount" v-model="repatrol.treat" size="medium">
                    <el-radio-button label="NORMAL" >复查通过</el-radio-button>
                    <el-radio-button label="TIME_LIMIT_RECTIFICATION">再次限期整改</el-radio-button>
                    <el-radio-button label="INVESTIGATION_AND_TREATMENT">调查处理</el-radio-button>
                  </el-radio-group>
                  <span v-if="curd === 'detail'">{{initRepatrol.treatLabel}}</span>
                </el-form-item>
              </div>

              <div v-if="curd === 'add' && repatrol.treat === 'TIME_LIMIT_RECTIFICATION'" class="row">
                <el-form-item label="整改期限：" prop="">
                  <el-date-picker
                    class="w200"
                    v-model="repatrol.rectifyTime"
                    type="date"
                    placeholder="选择整改期限">
                  </el-date-picker>
                </el-form-item>
              </div>

              <div v-if="curd === 'detail' && initRepatrol.treat === 'TIME_LIMIT_RECTIFICATION'" class="row">
                <el-form-item label="整改期限：" prop="">
                  <span>{{initRepatrol.rectifyTime}}</span>
                </el-form-item>
              </div>

              <div class="row">
                <el-form-item label="备注：">
                  <el-input v-if="curd === 'add'" class="w250" type="textarea" placeholder="如有需要请输入备注" :rows="4">
                    {{repatrol.remark}}
                  </el-input>
                  <span v-if="curd === 'add'" style="font-size: 12px;color: #A2AAB6;">(选填)</span>
                  <span v-if="curd === 'detail'">{{initRepatrol.remark}}</span>
                </el-form-item>
              </div>

              <div v-if="curd === 'add'" class="row">
                <el-form-item label="上传图片：" prop="">
                  <el-upload action="/api/upload" :data="{type:'REPATROL_RECORD', field: 'PHOTO'}" list-type="picture-card"
                             :on-preview="handlePictureCardPreview"
                             :on-remove="handleRemove"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                    <!--<p style="color: #A2AAB6;font-size:14px">点击上传</p>-->
                  </el-upload>

                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <p class="bz" style="margin-top: 10px;">图片格式：png，jpg，gif</p>
                  <p class="bz">图片大小：每张图片小于10M</p>
                  <p class="bz">此项为选填项</p>
                </el-form-item>
              </div>

              <div v-if="curd === 'detail'" class="row">
                <el-form-item label="上传图片：" prop="">
                  <div class="imgbox">
                    <div v-for="(item,index) in resultData.photo" @click.stop="ifbig(index)" class="imgdiv" :class="imgbig == index?'imgbig':''">
                      <img :src="filePath + item" alt="">
                      <span>预览</span>
                    </div>
                  </div>
                </el-form-item>
              </div>

              <div v-if="curd === 'add'" class="row">
                <el-form-item label="企业电子签名：" prop="">
                  <el-radio-group v-model="repatrol.isCooperate" size="medium">
                    <el-radio-button label="NO" >企业拒绝配合</el-radio-button>
                    <el-radio-button label="YES">企业配合上传</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <!-- <el-upload v-if="repatrol.isCooperate === 'YES'" :data="{type:'REPATROL_RECORD', field: 'SIGN'}"
                  class="avatar-uploader upload-pic"
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleSignSuccess"
                  :before-upload="beforeSignUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="avatar-uploader-icon el-icon-plus">
                    <p style="color: #A2AAB6;font-size:14px">点击上传签名</p>
                  </i>
                </el-upload> -->
                <el-upload
                    :file-list = "sign"
                    v-if="repatrol.isCooperate === 'YES'"
                    action="/api/upload"
                    list-type="picture-card"
                    :on-success = "handleSignSuccess"
                    :on-error = "uploadError"
                    :data="{type:'REPATROL_RECORD', field: 'SIGN'}"
                    :before-upload="beforeSignUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="removePic"
                    :limit="1">
                    <i class="el-icon-plus"></i>
                </el-upload>
              </div>

              <div v-if="curd === 'detail'" class="row">
                <el-form-item label="企业电子签名：" prop="">
                  <span v-if="!resultData.sign">企业拒绝配合</span>
                  <span v-if="resultData.sign">企业配合</span>
                  <div v-if="resultData.sign" @click.stop="ifbigq()" class="imgdiv" :class="ifbigqy?'imgbig':''">
                    <img :src="filePath + resultData.sign" alt="">
                    <span>预览</span>
                  </div>
                </el-form-item>
              </div>

            </div>
          </toggle-form>
        </el-form>
      </div>
    </div>

    <!-- 操作成功弹窗 -->
    <yb-popup @close="close" :isShow="isShow" title="操作提示" width="350">
      <div slot="body" style="height:100px;line-height:100px;padding:0 20px;font-size:16px;">
        操作成功！
      </div>
      <div slot="foot">
        <el-button type="defalut" @click="$router.push({name: 'patrol.repatrol.list'});">返回</el-button>
        <el-button type="primary" @click="goDetail()">查看详情</el-button>
      </div>
    </yb-popup>

    <!-- 底部按钮 -->
    <div class="foot-btn" style="z-index:1">
      <div>
        <el-button v-if="curd === 'detail'" @click="$router.push({name: 'patrol.repatrol.list'});" style="width:120px;">返回</el-button>
        <el-button v-if="curd === 'add'" @click="$router.push({name: 'patrol.repatrol.list'});" style="width:120px;">取消</el-button>
        <el-button v-if="curd === 'add'" :disabled="updateSuccess" type="primary" @click="updateRepatroRecord">确认并提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ToggleForm from "components/ToggleForm.vue";
  import BtnSelect from "components/BtnSelect.vue";
  import SingleCheckbox from "components/SingleCheckbox.vue";
  import scroll from "utils/scroll";
  import YbPopup from 'components/ybpopup/YbPopup.vue'
  import { listFile } from "api/common";
  import { getRepatrolRecord, listRepatrolRecordContext, getBasicInfo, update } from "api/patrol/repatrol";

  function getType(entityType) {
    let type;
    if(entityType === 'PRODUCT') {
      type = 'ENTITY'
    } else if(entityType === 'CIRCULATION') {
      type = 'ENTITY'
    } else if(entityType === 'RESTAURANT') {
      type = 'ENTITY'
    } else if(entityType === 'WORKSHOP') {
      type = 'CFDA'
    } else if(entityType === 'SALE') {
      type = 'CFDA'
    } else if(entityType === 'CFDARESTAURANT') {
      type = 'CFDA'
    } else if(entityType === 'VENDORS') {
      type = 'CFDA'
    }
    return type;
  }

  export default {
    components: {
      ToggleForm,
      BtnSelect,
      SingleCheckbox,
      YbPopup,
    },

    async mounted(){
      scroll.call(this,'slideIndex');

      this.filePath = this.$store.getters.filePath;

      this.curd = this.$route.params.curd;
      this.repatrolRecordId = this.$route.params.repatrolRecordId;

      await getRepatrolRecord(this.repatrolRecordId).then((result) => {
        if (result && result.status) {
          this.initRepatrol = result.data;
          this.type = getType(this.initRepatrol.entityType);
        }
      })

      await listRepatrolRecordContext(this.initRepatrol.sourceId, 'NO').then((result) => {
        if(result && result.status) {
          let datas = result.data;
          let lis = [];
          let tablis = [];
          for(var i=0;i<datas.length;i++){
            if(lis.indexOf(datas[i].projectId)<0){
              lis.push(datas[i].projectId);
            }
          }
          for(var i=0;i<lis.length;i++){
            var tabdata = [];
            for(var j=0;j<datas.length;j++){
              if(datas[j].projectId == lis[i]){
                tabdata.push(datas[j]);
              }
            }
            tablis.push(tabdata);
          }
          this.tableList = tablis;

          this.initContext.contextList = result.data;
          this.initContext.count = this.initContext.contextList.length;
          this.initContext.importantCount = 0;
          this.initContext.contextList.forEach(context => {
            this.contextStat.scoreTotal += context.score;
            if(context.important === 'YES') {
              this.initContext.importantCount++;
            }
          });
        }
      })

      await getBasicInfo(this.initRepatrol.entityId, this.type, '').then((result) => {
        if(result && result.status) {
          this.soList = result.data.soList;
          this.infoList = result.data.infoList;

          if(this.curd === 'detail') {
            this.infoAssiUserName = result.data.entity.infoAssiUserName;
            this.soUserName = result.data.entity.soUserName;
          }

          this.repatrol.patrolSoId = result.data.entity.so;
          this.personList.push(result.data.entity.infoAssi);
        }
      })

      if(this.curd === 'detail') {
        await listRepatrolRecordContext(this.repatrolRecordId).then((result) => {   //TODO
          if(result && result.status) {
            let datas = result.data;
            let lis = [];
            let tablis = [];
            for(var i=0;i<datas.length;i++){
              if(lis.indexOf(datas[i].projectId)<0){
                lis.push(datas[i].projectId);
              }
            }
            for(var i=0;i<lis.length;i++){
              var tabdata = [];
              for(var j=0;j<datas.length;j++){
                if(datas[j].projectId == lis[i]){
                  tabdata.push(datas[j]);
                }
              }
              tablis.push(tabdata);
            }
            this.tableList = tablis;

            this.initContext.contextList = result.data;
            this.contextStat.scoreTotal = 0;
            this.initContext.contextList.forEach(context => {
              this.contextStat.scoreTotal += context.score;
              this.contextStat.contextCount++;
              if(context.important === 'YES') {
                this.contextStat.importantCount++;
              }
              if(context.initQual === 'YES') {
                this.contextStat.qualCount++;
                this.contextStat.scoredTotal += context.score;
              } else if(context.initQual === 'NO') {
                this.contextStat.unqualCount++;
                if(context.important === 'YES') {
                  this.contextStat.unqualImportantCount++;
                }
              }
            });
          }
        })

        await listFile(this.repatrolRecordId).then(fileList => {
          fileList.data.forEach(file => {
            if(file.colu === 'PHOTO') {
              this.resultData.photo.push(file.fileId);
            } else if(file.colu === 'SIGN') {
              this.resultData.sign.push(file.fileId);
            }
          })
        })
      }

      if(this.curd === 'add') {
        this.blurCount();
      }
    },
    methods:{
      //点击已上传的文件链接
      handlePictureCardPreview(file){
          this.imageUrl = file.url;
          this.dialogVisible = true;
      },
      //删除图片
      removePic(file, fileList){
         const url = file.url;
         for(let i=0;i<this.picList.length;i++){
             let obj = this.picList[i];
             if(obj.url == url){
                 this.picList.splice(i,1);
                 break;
             }
         }
      },
      //图片上传失败
      uploadError(){
          this.$message.error('图片上传失败！');
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

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        let rownum = 0;
        for(var i=0;i<this.tableList.length;i++){
          if (this.tableList[i].indexOf(row) >= 0) {
            rownum = this.tableList[i].length;
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

      updateRepatroRecord() {
        this.$refs['repatrol'].validate((valid) => {
          if(this.personList.length === 0) {
            this.personListRequired = true;
            return false;
          } else {
            this.personListRequired = false;
          }
          let contextList = [];
          this.initContext.contextList.forEach(context => {
            if(context.qual !== undefined && context.qual !== '') {
              context.patrolRecordId = this.repatrolRecordId;
              contextList.push(context);
            }
          })

          if(contextList.length === 0) {
            this.contextListRequired = true;
            return false;
          } else {
            this.contextListRequired = false;
          }

          if(this.repatrol.treat === 'TIME_LIMIT_RECTIFICATION') {
            let counttemp = 0;
            contextList.forEach(context => {
              if(context.qual === 'NO') {
                counttemp++;
              }
            })
            if(counttemp <= 0) {
              this.$message({
                message: '处理方式为再次限期整改,需选择至少一条巡查不符合项.',
                type: 'warning'
              })
              return false
            }
          }
          if (valid) {
            this.$confirm('是否要提交复查记录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let contextList = [];
              this.initContext.contextList.forEach(context => {
                if(context.qual !== undefined && context.qual !== '') {
                  context.patrolRecordId = this.repatrolRecordId;
                  contextList.push(context);
                }
              })

              this.repatrol.score = this.contextStat.scoredTotal;
              this.repatrol.id = this.repatrolRecordId;

              let updateParam = {
                repatrol: this.repatrol,
                personList: this.personList,
                contextList: contextList,
                fileIdList: this.fileIdList
              };
              update(updateParam).then(result => {
                if(result && result.status) {
                  this.$message({
                    message: '添加成功.',
                    type: 'success'
                  })
                  this.detailRepatrolRecordId = result.data;
                  this.isShow = true;
                } else {
                  this.$message({
                    message: result.message,
                    type: 'error'
                  })
                }
              })
            })
          }
        })
      },

      handleAvatarSuccess(file) {
        if(file.status) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.fileIdList.push(file.data.id);
        }
      },

      beforeAvatarUpload(file){
        let fileType = file.type.split("/")[1];
        if(fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'gif') {
          this.$message({
            message: '请上传正确格式的图片(图片格式：png，jpg，gif)',
            type: 'error'
          })
          return false;
        }
      },
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleSignSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.fileIdList.push(res.data.id);
      },
      beforeSignUpload(file) {
        let fileType = file.type.split("/")[1];

        const isPic = fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'gif';
        const isSize = file.size / 1024 / 1024 > 10;

        if (isPic) {
          this.$message.error('请上传正确格式的图片(图片格式：png，jpg，gif)')
        }
        if (isSize) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }
        return !isPic && !isSize;
      },

      singlecheckboxchange(args) {
        args.row.qual = args.result;
        this.$set(args.row,'qual',args.result);
        this.contextStat = {
          scoreTotal: this.contextStat.scoreTotal,
          contextCount: 0,
          importantCount: 0,
          qualCount: 0,
          unqualCount: 0,
          unqualImportantCount: 0,
          scoredTotal: 0,
        },

        this.initContext.contextList.forEach(context => {
          if(context.qual !== undefined && context.qual !== '') {
            this.contextStat.contextCount++;
            if(context.qual === 'YES') {
              this.contextStat.qualCount++;
              this.contextStat.scoredTotal += context.score;
            }
            if(context.qual === 'NO') {
              this.contextStat.unqualCount++;
              if(context.important === 'YES') {
                this.contextStat.unqualImportantCount++;
              }
            }
            if(context.important === 'YES') {
              this.contextStat.importantCount++;
            }

            if(this.contextList.indexOf(context) === -1) {
              this.contextList.push(context);
            }
          } else {
            var index = this.contextList.indexOf(context)
            this.contextList.splice(index, 1);
          }
        })

        this.blurCount();
      },

      blurCount(rule,value,callback){

        if(callback){
          callback();
        }

        let cnt1 = 0;
        if (this.repatrol.repatrolTime) cnt1++;
        if (this.repatrol.patrolSoId != '') cnt1++;
        if (this.infoList.length > 0) cnt1++;
        this.progress[0].successNum = cnt1;

        cnt1 = 0;
        if(this.contextList.length > 0) {
          cnt1 = 1;
        } else {
          cnt1 = 0;
        }
        this.progress[1].successNum = cnt1;

        cnt1 = 0;
        if (this.repatrol.result) cnt1++;
        if (this.repatrol.treat) cnt1++;
        this.progress[2].successNum = cnt1;

        let total = 0;
        let success = 0;
        for (let i = 0; i< this.progress.length;i++){
          total += this.progress[i].totalNum;
          success += this.progress[i].successNum;
        }
        this.percent = new Number(((success / total)* 100).toFixed(0)) * 1;
      },

      //弹窗
      close(){
        this.isShow = false;
      },

      goPatrolDetail() {
          this.$router.push({
            name: "patrol.record.detail",
            query: {"recordId": this.initRepatrol.sourceId, "patrolType": this.initRepatrol.sourceType}
          });
      },

      goDetail() {
        this.isShow = false;
        this.$router.push({name: 'patrol.repatrol.ad', params: {'curd': 'detail', 'repatrolRecordId': this.detailRepatrolRecordId}})
      },
    },
    watch: {
     async '$route' (to, from) {
        //刷新参数放到这里里面去触发就可以刷新相同界面了
        this.curd = this.$route.params.curd;
        this.repatrolRecordId = this.$route.params.repatrolRecordId;

        await getRepatrolRecord(this.repatrolRecordId).then((result) => {
          if (result && result.status) {
            this.initRepatrol = result.data;
            this.type = getType(this.initRepatrol.entityType);
          }
        })

        await listRepatrolRecordContext(this.initRepatrol.sourceId, 'NO').then((result) => {
          if(result && result.status) {
            let datas = result.data;
            let lis = [];
            let tablis = [];
            for(var i=0;i<datas.length;i++){
              if(lis.indexOf(datas[i].projectId)<0){
                lis.push(datas[i].projectId);
              }
            }
            for(var i=0;i<lis.length;i++){
              var tabdata = [];
              for(var j=0;j<datas.length;j++){
                if(datas[j].projectId == lis[i]){
                  tabdata.push(datas[j]);
                }
              }
              tablis.push(tabdata);
            }
            this.tableList = tablis;

            this.initContext.contextList = result.data;
            this.initContext.count = this.initContext.contextList.length;
            this.initContext.importantCount = 0;
            this.initContext.contextList.forEach(context => {
              this.contextStat.scoreTotal += context.score;
              if(context.important === 'YES') {
                this.initContext.importantCount++;
              }
            });
          }
        })

        await getBasicInfo(this.initRepatrol.entityId, this.type).then((result) => {
          if(result && result.status) {
            this.soList = result.data.soList;
            this.infoList = result.data.infoList;

            if(this.curd === 'detail') {
              this.infoAssiUserName = result.data.entity.infoAssiUserName;
              this.soUserName = result.data.entity.soUserName;
            }

            this.repatrol.patrolSoId = result.data.entity.so;
            this.personList.push(result.data.entity.infoAssi);
          }
        })

        if(this.curd === 'detail') {
          await listRepatrolRecordContext(this.repatrolRecordId).then((result) => {   //TODO
            if(result && result.status) {
              let datas = result.data;
              let lis = [];
              let tablis = [];
              for(var i=0;i<datas.length;i++){
                if(lis.indexOf(datas[i].projectId)<0){
                  lis.push(datas[i].projectId);
                }
              }
              for(var i=0;i<lis.length;i++){
                var tabdata = [];
                for(var j=0;j<datas.length;j++){
                  if(datas[j].projectId == lis[i]){
                    tabdata.push(datas[j]);
                  }
                }
                tablis.push(tabdata);
              }
              this.tableList = tablis;

              this.initContext.contextList = result.data;
              this.contextStat.scoreTotal = 0;
              this.initContext.contextList.forEach(context => {
                this.contextStat.scoreTotal += context.score;
                this.contextStat.contextCount++;
                if(context.important === 'YES') {
                  this.contextStat.importantCount++;
                }
                if(context.initQual === 'YES') {
                  this.contextStat.qualCount++;
                } else if(context.initQual === 'NO') {
                  this.contextStat.unqualCount++;
                  if(context.important === 'YES') {
                    this.contextStat.unqualImportantCount++;
                  }
                }
              });
            }
          })

          await listFile(this.repatrolRecordId).then(fileList => {
            fileList.data.forEach(file => {
              if(file.colu === 'PHOTO') {
                this.resultData.photo.push(file.fileId);
              } else if(file.colu === 'SIGN') {
                this.resultData.sign.push(file.fileId);
              }
            })
          })
        }

        if(this.curd === 'add') {
          this.blurCount();
        }
      }
    },
    data() {
      return {
        slideIndex: -1,
        yes: true,

        filePath: "",

        personListRequired: false,
        contextListRequired: false,

        curd: "",
        repatrolRecordId: "",
        detailRepatrolRecordId: "",

        //init 数据
        initRepatrol: {},
        initContext: {},
        contextList: [],
        tableList: [],
        contextStat: {
          scoreTotal: 0,
          contextCount: 0,
          importantCount: 0,
          qualCount: 0,
          unqualCount: 0,
          unqualImportantCount: 0,
          scoredTotal: 0,
        },

        soList: [],
        infoList: [],
        infoAssiUserName: "",
        soUserName: "",

        //sumbit 数据
        repatrol: {
          patrolSoId: "",
        },
        personList: [],

        rules: {
          repatrolTime: {required: true, message: '请选择巡查时间', trigger: 'blur'},
          patrolSoId: {required: true, message: '请选择巡查员', trigger: 'blur'},
          result: {required: true, message: '请选择巡查结果', trigger: 'blur'},
          treat: {required: true, message: '请选择处理方式', trigger: 'blur'},
        },
        percent: 0, //表单的完成进度
        // 左边悬浮栏的数据
        progress: [
          {
            title: '基础信息',
            successNum: 0,
            totalNum: 3
          },
          {
            title: '巡查项',
            successNum: 0,
            totalNum: 1
          },
          {
            title: '巡查结果',
            successNum: 0,
            totalNum: 2
          },
        ],

        dialogImageUrl: '',
        dialogVisible: false,
        fileIdList: [],
        imageUrl: '',

        resultData: {
          photo: [],
          sign: [],
        },
        imgbig: null,
        ifbigqy: false,

        isShow: false,
        updateSuccess: false,
        sign:[],  //电子签名
      };
    }
  }
</script>

<style lang="scss" scoped>
  .mT35{
    margin-top: 35px;
  }
  .mainbody{
    margin-left:20px;
    margin-bottom:30px;
    background: #EFF7F9;
    border: 1px solid #C2EAF8;
    padding:10px;
    width:720px;
    color:#1FABDC;
    .form-item{
      margin:10px 0;
      display:inline-block;
      width:350px;
      .title{
        width:100px;
        display:inline-block;
        text-align:right;
      }
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
  .bz{
    line-height: 20px;
    font-size: 12px;
    color: #A2AAB6;
  }
  // 图片上传
  .upload-pic{
    border:1px solid #cbcbcb;
    width:130px;
    height:130px;
    border-radius:6px;
    margin-left:110px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .upload-pic-left{
    margin-left:0px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border-radius:50%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color:#fff;
    background:#0DB5EF;
    font-size: 18px;
    margin-bottom: 5px;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
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

  .container{
    position:relative;
    margin-bottom:300px;
  }

  $c:#0db5ef;

  .left-info {
    width: 210px;
    height: 560px;
    background: #fff;
    position: fixed;
    margin-left: -230px;
    margin-top: -100px;
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
    width: calc(100% - 230px);
    margin-left:230px;
  }

  .content {
    margin-top: 20px;
  }

  .table-div{
    text-align: center;
    input{
      background: #FFFFFF;
      border: 1px solid #C2CAD2;
      height: 34px;
      font-size: 12px;
      color: #A2AAB6;
      padding-left: 12px;
      box-sizing: border-box;
    }
  }
  .diva{
    background: #F6F7F8;
    border: 1px solid #C2CAD2;
    font-size: 14px;
    color: #393939;
    height: 34px;
    width: 150px;
    text-align: center;
    line-height: 34px;
    box-sizing: border-box;
  }
  .block{
    width: 252px;
    font-size: 14px;
    color: #6D7787;
    line-height: 26px;
  }
  .brN .is-leaf{
    border-right: 0;
  }
  .brN tr td{
    border-right: 0;
  }
  .brN tr td[colspan="1"]{
    border-right: 1px solid #ebeef5;
  }
  /*.table-div .el-table__body-wrapper{
    max-height: 350px;
  }*/
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
  .marNo{
    margin: 0 !important;
  }
</style>

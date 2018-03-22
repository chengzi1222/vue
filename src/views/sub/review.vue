<template>
    <div class="user-box">
        <div class="page-tilt">
            <b></b>
            <span>{{this.$route.params.review ? '审核' : '详情'}}-{{this.$route.params.workType}}</span>
        </div>
        <div style="margin-top:20px;">
            <span style="font-size:20px;margin-right:20px;">{{this.$route.params.entityName}}</span>
            <span style="color:#A2AAB6">证照类型：{{this.$route.params.natureType}}</span>
        </div>
        <div>
          <transition name="dialog-fade">
              <popupBody class="popup-body" v-if="rejectIsShow">
                    <p style="font-size: 18px;">驳回理由</p>
                    <i @click="rejectIsShow = false" class="popup-hide movePoin el-dialog__close el-icon el-icon-close"
                    style="position: absolute;top: 10px;right: 15px;"></i>

                     <textarea v-model="remark" @change="checkLen" @keyup="checkLen" placeholder="请输入驳回理由" style="width: 100%;min-height: 100px;">
                     </textarea>
                     <div style="color: rgb(162, 170, 182);">您还可以输入<span>{{curr}}</span> 个文字</div>

                     <button type="button" @click="reject" class="w100 el-button el-button--primary" style="float: right;margin-left: 20px;">
                        <span type="primary">确定</span>
                     </button>

                     <button type="button" @click="rejectIsShow = false" class="w100 el-button el-button--default" style="float: right;">
                         <span>取消</span>
                     </button>
              </popupBody>
          </transition>
         </div>
        <ul class="tab-box">
            <li v-for="(item,index) in lists" :key="item.tabName" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
                <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
                <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
            </li>
            <li class="tab-bott"></li>
        </ul>
        <div class="main-body">
            <router-view v-if="($route.params.type === 'FIRST' && defaultIndex < 1) || ($route.params.type === 'CHANGE' && defaultIndex < 3)"></router-view>
            <entity-patrol-record-list v-if="currentInfo == 'entityPatrolRecord'" :entityId="$route.params.entityId"></entity-patrol-record-list>
            <entity-punish-record-list v-if="currentInfo == 'entityPunishRecord'" :entityId="$route.params.entityId"></entity-punish-record-list>
        </div>
        <!-- 底部按钮背景 -->
        <div class="foot-btn" style="z-index:1">

          <div>
             <el-button  @click="backBtn">返回</el-button>
             <span v-auth="'biz.pb|func.review,biz.cb|func.review,biz.rb|func.review'" v-if="this.$route.params.review">
                 <el-button :disabled="isReview"  @click="rejectIsShow = true">驳回</el-button>
                 <el-button type="primary" :disabled="isReview" @click="review">审核通过</el-button>
             </span>
          </div>
        </div>
    </div>
</template>



<script>
import { reviewPass, reviewReject } from "api/sub/work";
import popupBody from 'components/popup/popupdata';
import {reviewTab,reviewTabOpen,getOptType} from "views/sub/info/infoFieldChange.js";
import entityPatrolRecordList from 'views/patrol/record/entityPatrolRecord';
import entityPunishRecordList from 'views/enforce/entityPunishRecord';

export default {
    components:{
        popupBody,
        entityPatrolRecordList,
        entityPunishRecordList
    },
    mounted() {
      let workType = this.$route.params.type;
      this.optType = getOptType(this.$route.path);
      this.lists = reviewTab(workType,this.$route.params.review,this.optType);
      switch (this.$route.name){
        case this.optType + '_changeInfo':
          this.defaultIndex = 0;
          break;
        case this.optType + '_entityInfo':
          this.defaultIndex = 1;
          break;
        case this.optType + '_record':
          this.defaultIndex = 2;
          break;
        case this.optType + '_workInfo':
          this.defaultIndex = 0;
          break;
      }
      if(this.$route.path == '/sub/work/'+ this.$route.params.entityType +'/review'
         || this.$route.path == '/mywork/mywork/info'){
        this.$router.push({name:reviewTabOpen(workType,this.optType) ,params:this.$route.params});
      }
    },
  watch: {
    $route(to, from) {
      switch(to.name){
        case this.optType + '_changeInfo' || this.optType + '_workInfo' :
          this.defaultIndex = 0;
          break;
        case this.optType + '_entityInfo':
          this.defaultIndex = 1;
          break;
        case this.optType + '_record':
          this.defaultIndex = 2;
          break;
        default:
          this.defaultIndex = 0;
      }
      this.lists = reviewTab(this.$route.params.type,this.$route.params.review,this.optType);
//      this.$router.push({name:reviewTabOpen(this.$route.params.type,this.optType) ,params:this.$route.params});
    }
  },
    methods: {
        backBtn(){
            this.$router.push({path:this.$route.params.resultRouter,query:{tag:"back"}});
        },
        checkLen() {
            var maxChars = 100;//最多字符数
            if (this.remark.length > maxChars) this.remark = this.remark.substring(0,maxChars);
            this.curr = maxChars - this.remark.length;
        },
        liClick(e) {   //点击导航切换样式
            var me = this;
            me.defaultIndex = e.target.dataset.index;
            me.currentInfo = me.lists[me.defaultIndex].name;
            if ((me.$route.params.type === 'FIRST' && me.defaultIndex < 1) || (me.$route.params.type === 'CHANGE' && me.defaultIndex < 3)) {
              me.$router.push({name:me.lists[me.defaultIndex].name ,params:me.$route.params});
            }
        },
        reject(){
          const $this = this;
          let param = {
            workId: $this.$route.params.id,
            remark:this.remark,
          };
          reviewReject(param).then((result) => {
            if(!result.status){
              this.$message({
                message: result.message,
                type: result.level
              });
              return;
            }
                $this.$message({
                  message: '驳回成功',
                  type: 'success'
                });
                $this.rejectIsShow = false;
                $this.isReview = true;

                setTimeout(() => {
                  this.backBtn();
                }, 2000);

          });
        },
        review() {
          const $this = this;
          this.$confirm('是否确认审核通过?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
            reviewPass($this.$route.params.id).then((result) => {
                  if(!result.status){
                    this.$message({
                      message: result.message,
                      type: result.level
                    });
                    return;
                  }
                  $this.$message({
                    message: '审核通过成功',
                    type: 'success'
                  });
                  $this.isReview = true;
                  setTimeout(() => {
                    this.backBtn();
                  }, 2000);
                });
              }).catch(_ => {});
        },

    },
    data() {
        return {
            rejectIsShow:false,
            isReview: false,
            optType:'review',
            remark:"",
            curr:100,
            lists: [],
            defaultIndex: 0,		//控制tab导航样式
            currentInfo: '' // 当前选中的选项卡
        }
    }
}
</script>


<style scoped lang="scss">
.tab-box {
    width: 100%;
    display: flex;
    position: relative;
}

.tab-box li {
    width: 110px;
    height: 50px;
    line-height: 50px;
    margin-right: 30px;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #9A9A9A;
    text-align: center;
}

.tab-box .li-bott {
    border-bottom: 2px solid #0DB5EF;
    z-index: 666;
    position: relative;
}

.li-bott span {
    color: #393939;
}

.tab-box .tab-bott {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 2px;
    background: #EBF1F5;
}



/* 切换页面下面的内容 */

.main-body {
    margin-top: 20px;
    margin-bottom: 430px;
    padding-left: 230px;
    position: relative;
    .router-btn {
        margin: 0 5px;
    }
}
.active {
    .el-button {
        background: #0db5ef;
        color: #fff;
    }
}
</style>

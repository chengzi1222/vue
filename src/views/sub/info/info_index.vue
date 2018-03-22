<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>
        {{info.entityType}}
      </span>
    </div>
    <div style="margin-top:20px;">
      <span style="font-size:20px;margin-right:1px;">{{info.entityName}}</span>
      <span style="color:#A2AAB6;margin-right:20px;">
        <qrcode v-if="shows" :url="this.entityUrl" :backImg="this.backImg" v-on:refreshbizlines="downloadImage" :datas="this.info"></qrcode>
      </span>
      <span style="color:#A2AAB6">证照类型：{{info.natureType}}</span>
    </div>
    <!--<ul class="tab-box">
      <li v-for="item,index in lists" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
        <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>-->

    <ul class="tab-box">
      <li v-for="(item,index) in lists" :key="item.tabName" @click="liClick(index)"
          :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <span>{{item.tabName}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>

    <div class="main-body">
      <router-view v-if="defaultIndex<2"></router-view>
      <entity-patrol-record-list v-if="currentInfo == 'entityPatrolRecord'" :entityId="$route.params.entityId"></entity-patrol-record-list>
      <entity-punish-record-list v-if="currentInfo == 'entityPunishRecord'" :entityId="$route.params.entityId"></entity-punish-record-list>
    </div>
    <!-- 底部按钮背景 -->
    <!-- 底部按钮 -->
    <div class="foot-btn" style="z-index:1">
      <div>
        <el-button style="width:120px;" @click="backBtn">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import entityPatrolRecordList from 'views/patrol/record/entityPatrolRecord';
  import entityPunishRecordList from 'views/enforce/entityPunishRecord';
  import qrcode from 'components/QRcode.vue';
  export default {
    components: {
      entityPatrolRecordList,
      entityPunishRecordList,
      qrcode
    },
    async mounted(){
      const entityType = this.$route.params.entityType;
      switch (this.$route.path){
        case "/sub/"+ entityType +"/info/index":
          this.$router.push({name:"entityInfo",params:this.$route.params});
          break;
        case "/sub/"+ entityType +"/info/index/entity":
          this.defaultIndex = 0;
          break;
        case "/sub/"+ entityType +"/info/index/record":
          this.defaultIndex = 1;
          break;
      }
      if (!this.$route.params.entityId ){
        this.$route.params.entityId = this.$route.query.id;
        this.$route.params.resultRouter = '/sub/' + this.$route.params.entityType;
      }
      this.entityUrl = `${window._base.baseUrl}/qrcode/entity/`+this.$route.params.entityId;
      this.backImg = require('assets/img/codeBack.png');
      this.shows = true;
    },
    methods: {
      getInfoData(data){
        this.info = data;
      },
      backBtn(){
        //this.$router.push({path:this.$route.params.resultRouter,query:{tag:"back"}});
        this.$router.push({
          path:this.$route.params.resultRouter,
          query:{
            recordId:this.$route.params.recordId,
            patrolType:this.$route.params.patrolType
          }});
      },
      liClick(index) {   //点击导航切换样式
        this.defaultIndex = index;
        this.currentInfo = this.lists[this.defaultIndex].name;
        if (this.defaultIndex < 2) {
          console.log(this.defaultIndex)
          this.$router.push({name:this.lists[index].name ,params:this.$route.params});
        }
      },
      downloadImage(){
//      downQR(this.entityId);
      }
    },
    data() {
      return {
        lists: [
          { tabName: '主体信息',name:'entityInfo'},
          { tabName: '备案变动记录',name:'entityInfo_record'},
          { tabName: '巡查记录',name:'entityPatrolRecord'},
          { tabName: '处罚记录',name:'entityPunishRecord'},
        ],
        defaultIndex: 0,		//控制tab导航样式
        currentInfo: '',
        entityUrl : '',
        entityId:'',
        shows:false,
        backImg:"",
      }
    },
    computed:{
      ...mapGetters({info:'sub/info'})
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
    height: calc(100% - 220px);
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

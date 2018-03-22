<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>{{entity.entityName}}  {{showName}}</span>
      <el-button v-auth="'peri.camera|func.add'" type="default" @click="goEdit()">编辑</el-button>
    </div>

    <div class="main-body  video-box">
      <div class="left">
        <div class="shuidi-ctn" style="width:100%;height:100%;position:relative;" id="player">
        </div>
      </div>
      <div class="right" ref="right">
        <p class="title">{{entity.entityName}}</p>
        <div class="content">
          <p><span>所属辖区：</span><span>{{entity.deptName}}</span></p>
          <p><span>地址：</span><span>{{entity.address}}</span></p>
          <p><span>法人：</span><span>{{entity.corpName}}</span></p>
          <p><span>联系方式：</span><span>{{entity.mobile}}</span></p>
        </div>
        <p class="title">直播频道：</p>
        <div v-for="(item,index) in cameraList" :key="index" @click="showNow(item,index);" style="cursor: pointer;" :class="{'video-item-active ':index===defaultIndex}" class="video-item clearfix">
          <div class="video-item-pic floatL">
            <div style="width:100%;position:relative;">
              <img :src="item.imgAddr" style="width:100%;height:110px"/>
              <div class="shade">
                  <img style="top: 65%;" :src="require('assets/img/play_icon.png')" class="movePoin">
              </div>
            </div>
          </div>
          <p class="floatL video-item-title">{{item.name}}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getEntity, getCameraListByEntityId } from 'api/peri/camera'


  export default {
    async mounted() {
      this.entityId = this.$route.query.id;
      //主体信息
      let resultData = await getEntity(this.entityId);
      this.entity = resultData.data;

      await this.getCameraListByEntityIdForDetail(); //摄像头列表

      if(this.cameraList.length > 0) {
        this.showName = this.cameraList[0].name;
        this.playerAddr = this.cameraList[0].playerAddr;

      }
      //是否自动播放
      const autostart = true;
      this.playFlow(autostart);

    },
    components:{

    },
    methods: {
      goEdit() {
        this.$router.push({name: "camera.manage.edit", query: {id: this.entityId}});
      },

      async getCameraListByEntityIdForDetail() {
        let result = await getCameraListByEntityId(this.entityId, "detail");
        this.cameraList = result.data;
      },
      showNow(item,index) {
        this.showName = item.name;
        this.cameraId = item.id;
        this.playFlow(true);
        this.defaultIndex = index
      },
      playFlow(autostart){
        document.getElementById("player").innerHTML="";
        const $script = document.createElement('script');
        document.getElementById("player").appendChild($script);
        var videoObject = {"container": '#player',"variable": 'player',"autoplay":autostart,"live":true,"html5m3u8":true,"video":this.playerAddr};
        var player= new ckplayer(videoObject);
        $script.src = player;
      }
    },
    data() {
      return {
        defaultIndex:0,
        entityId: "",
        entity: {},
        cameraList: [],

        showNo: "",
        showName: "",
        playerAddr:"",
      };
    }
  };
</script>

<style scoped='scss'>
  .page-tilt {
    padding-top: 15px;
  }

  .page-tilt .el-button{width: 100px;}


  .video-box{
    margin-top: 30px;
    display: flex;
    flex-wrap: nowrap;
  }
  .video-box .left,.video-box .right{
    /* height: 560px; */
    box-sizing: border-box;
  }
  .video-box .left{
    flex: 1;
    /* background: black; */
  }
  .video-box .right{
    /* width: 450px; */
    background: #394145;
    overflow-y: auto;
    padding: 20px 30px;
  }

  .video-box .title{
    font-size: 16px;
    color: #FFFFFF;
    margin-bottom: 10px;
  }
  .video-box .content{
    font-size: 14px;
    color: #A2AAB6;
    line-height: 26px;
    margin-bottom: 20px;
  }
  .video-box .video-item{
    font-size: 16px;
    color: #A2AAB6;
    margin-bottom: 20px;
  }
  .video-box .video-item .video-item-pic{
    width: 242px;
    height: 111px;
    box-sizing: border-box;
    margin-right: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  .video-box .video-item .video-item-pic img{
    width: 100%;
    height: 100%;
  }
  .video-box .video-item .video-item-title{
    margin-top: 38px;
    width: 111px;
    word-break: break-all;
  }
  /* 激活的时候 */
  .video-box .video-item-active .video-item-pic{
    border: 3px solid #0DB5EF;
    border-radius: 5px;
  }
  .video-box .video-item-active .video-item-title{
    color:  #0DB5EF;
  }

  .video-box .video-item .shade{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 6px;
    border-radius: 8px;
    right: 0;
    background: rgba(9,9,9,0);
    transition: all .5s;
    opacity: 0;
  }
  .video-box .video-item:hover .shade{
    background: rgba(9,9,9,.35);
    opacity: 1;
  }
  .video-box .video-item .shade p{
    color: #fff;
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  .video-box .video-item .shade img{
    width: 44px;
    height: 44px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -38px;
    margin-left: -22px;
  }
</style>

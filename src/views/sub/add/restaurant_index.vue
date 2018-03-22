<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>{{entityName}}主体录入</span>
    </div>
    <ul class="tab-box">
      <li v-for="(item,index) in lists" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
        <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>


    <div class="main-body no-star">
      <div class="form-item">今日已提交{{entityName}}主体数:
                <span style="margin-left:10px;">{{count}}</span>
      </div>
      <div class="form-item">主体类型:
                <router-link to="yzyz" class="router-btn" active-class="active">
        <el-button>有证有照</el-button>
      </router-link>
        <router-link to="yzwz" class="router-btn" active-class="active">
          <el-button>有照无证</el-button>
        </router-link>
        <router-link to="wzwz" class="router-btn" active-class="active">
          <el-button>无证无照</el-button>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
    <!-- 底部按钮背景 -->
    <div class="foot-btn"></div>
  </div>
</template>

<script>
  import{getBackupCount,getToDayCnt} from "api/sub/add.js";

  export default {
    mounted(){
      this.routeChange();
    },
    methods: {
      liClick(e) {   //点击导航切换样式
        var me = this;
        if (me.defaultIndex != e.target.dataset.index){
          this.$router.push("back")
        }
      },routeChange(){
        let path = this.$route.path;
        let paths = path.split("/");
        this.entityType = paths[paths.length - 2];
        getToDayCnt(this.entityType).then((r) => {
          this.count = r.data;
        });
        getBackupCount(this.entityType).then((r) => {
          this.lists[1].num = r.data;
        });
      }

    },
    data() {
      return {
        count:0,
        lists: [
          { tabName: '信息录入' },
          { tabName: '草稿箱', num: 0 },
        ],
        defaultIndex: 0,		//控制tab导航样式
        entityType:''
      }
    },computed : {
      entityName : function() {
        return this.entityType == 'product'?'生产':this.entityType == 'circulation'?'流通':'餐饮';
      }
    },watch: {
      // 如果路由有变化，会再次执行该方法
      $route: 'routeChange'
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

<template>
    <div class="user-box">
        <div class="page-tilt">
            <b></b>
            <span>变动-{{this.$route.params.type}}</span>
        </div>
        <div class="typeName">
        	<span>主体名称：{{this.$route.params.entityName}}</span>
        	<span>证照类型：{{this.$route.params.natureTypeLabel}}</span>
        </div>
        <ul class="tab-box">
            <li v-for="(item,index) in lists" :key="item.tabName" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
                <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
            </li>
            <li class="tab-bott"></li>
        </ul>
        <div class="main-body no-star">
            <router-view v-if="defaultIndex<3"></router-view>
            <entity-patrol-record-list v-if="currentInfo == 'entityPatrolRecord'" :entityId="$route.params.entityId"></entity-patrol-record-list>
            <entity-punish-record-list v-if="currentInfo == 'entityPunishRecord'" :entityId="$route.params.entityId"></entity-punish-record-list>
        </div>
        <!-- 底部按钮背景 -->
        <div class="foot-btn" style="z-index:0">
            <div>
                <el-button style="width:120px;" @click="backBtn">返回</el-button>
            </div>
        </div>
    </div>
</template>



<script>
import entityPatrolRecordList from 'views/patrol/record/entityPatrolRecord';
import entityPunishRecordList from 'views/enforce/entityPunishRecord';
export default {
    components: {
      entityPatrolRecordList,
      entityPunishRecordList
    },
    mounted(){
      let natureType = this.$route.params.natureType;
        let routerName = '';
        switch(natureType){
          case 'YZYZ' :
            routerName = 'change_yzyz';
            break;
          case 'YZWZ' :
            routerName = 'change_yzwz';
            break;
          case 'WZWZ' :
            routerName = 'change_wzwz';
            break;
        }

        const entityType = this.$route.params.entityType;

        switch (this.$route.path){
          case "/sub/"+ entityType +"/change/"+ entityType :
            this.$router.push({name:routerName,params:this.$route.params});
            break;
          case "/sub/"+ entityType +"/change/"+ entityType +"/entity":
            this.defaultIndex = 1;
            break;
          case "/sub/"+ entityType +"/change/"+ entityType +"/record":
            this.defaultIndex = 2;
            break;
        }

        this.lists.push({ tabName: '变动申请',routerName:routerName});
        this.lists.push({ tabName: '主体信息',routerName:'change_entityInfo'},
           { tabName: '备案变动记录',routerName:'change_record'},
           { tabName: '巡查记录',routerName:'entityPatrolRecord'},
           { tabName: '处罚记录',routerName:'entityPunishRecord'});
    },
    methods: {
        backBtn(){
            this.$router.push({path:this.$route.params.resultRouter});
        },
        liClick(e) {   //点击导航切换样式
            let me = this;
            me.defaultIndex = e.target.dataset.index;
            me.currentInfo = me.lists[me.defaultIndex].routerName;
            if (me.defaultIndex < 3) {
              console.log(this.defaultIndex)
              me.$router.push({name:me.lists[me.defaultIndex].routerName ,params:this.$route.params});
            }
        },
    },
    data() {
        return {
            lists: [],
            defaultIndex: 0,		//控制tab导航样式
            currentInfo: ''
        }
    },
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
.tab-box a{
	color: #9A9A9A;
	width: 100%;
	height: 100%;
	display: inline-block;
}


.tab-box .li-bott {
    border-bottom: 2px solid #0DB5EF;
    z-index: 666;
    position: relative;
}

.li-bott a{
	color: #393939;
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

.typeName {
	margin-top: 24px;
    margin-left: 20px;
}

.typeName span:first-child{
	font-size: 15px;
	color: #393939;
}
.typeName span:last-child{
	font-size: 15px;
	color: #A2AAB6;
	margin-left: 20px;
}
</style>

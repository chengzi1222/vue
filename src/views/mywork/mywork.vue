<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>我的工单</span>
    </div>

    <div class="main-body no-star">
      <div class="form-item">主体类型:
        <router-link :to="{name: 'mywork.cfda'}" class="router-btn" active-class="active" v-auth="'biz.cfda|func.add'">
          <el-button>三小管理</el-button>
        </router-link>
        <router-link :to="{name: 'mywork.sub', params: {entityType: 'product'}}" class="router-btn" active-class="active" v-auth="'biz.pb|func.add'">
          <el-button>生产主体管理</el-button>
        </router-link>
        <router-link :to="{name: 'mywork.sub', params: {entityType: 'circulation'}}" class="router-btn" active-class="active" v-auth="'biz.cb|func.add'">
          <el-button>流通主体管理</el-button>
        </router-link>
        <router-link :to="{name: 'mywork.sub', params: {entityType: 'restaurant'}}" class="router-btn" active-class="active" v-auth="'biz.rb|func.add'">
          <el-button>餐饮主体管理</el-button>
        </router-link>
      </div>
      <router-view style="height: calc(100% - 60px)"></router-view>
    </div>

  </div>
</template>

<script>
import { listDictUserItemByDictCode } from 'api/common';
import store from "../../store";

export default {
  mounted() {
    this.goPageByAuth();
  },
  methods: {
    goPageByAuth() {
      //
      const tag = this.$route.query.tag;
      if (tag === undefined && this.$route.name === 'mywork') {
        const auths = store.getters.auths;
        const to = [];
        for (let i = 0, len = auths.length; i < len; i++) {
          // biz.rb|func.add,biz.pb|func.add,biz.cb|func.add,biz.cfda|func.add
          if (auths[i] === 'biz.cfda|func.add') {
            to[0] = { name: 'mywork.cfda' };
            // this.$router.push({ name: 'mywork.cfda' });
          } else if (auths[i] === 'biz.pb|func.add') {
            to[1] = { name: 'mywork.sub', params: { entityType: 'product' } }
          } else if (auths[i] === 'biz.cb|func.add') {
            to[2] = { name: 'mywork.sub', params: { entityType: 'circulation' } }
          } else if (auths[i] === 'biz.rb|func.add') {
            to[3] = { name: 'mywork.sub', params: { entityType: 'restaurant' } }
          }
        }
        for (let i = 0, len = to.length; i < len; i++) {
          if (to[i]) {
            this.$router.push(to[i]);
            break;
          }
        }
      }
    }
  },
  components: {},
  data() {
    return {
    }
  }
}
</script>


<style scoped lang="scss">
.main-body {
  height: calc(100% - 60px);
  margin-top: 20px;
  /*margin-bottom: 430px;*/
  position: relative;
  .router-btn {
    margin: 0 5px;
  }
}

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

  font-size: 15px;
  color: #9a9a9a;
  text-align: center;
}

.li-bott span {
  color: #393939;
}

.tab-box .tab-bott {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #ebf1f5;
}

.ipt-btn-box {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.pagination-box {
  text-align: right;
  margin-top: 20px;
}

.table-div {
  width: 100%;
  text-align: center;
}

.operate-a {
  color: #1787ad;
}

table tr td:last-child .cell a {
  border-right: 1px solid #ccc;
  padding-right: 5px;
}
table tr td:last-child .cell a:last-child {
  border-right: none;
  padding-right: 0px;
}

.active {
  .el-button {
    background: #0db5ef;
    color: #fff;
  }
}
</style>

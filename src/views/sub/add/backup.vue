<template>
  <div>
    <div class="page-tilt">
      <b></b>
      <span>主体录入</span>
    </div>
    <ul class="tab-box">
      <li v-for="(item,index) in lists" @click="liClick" :data-index='index' :class="index == defaultIndex? 'li-bott':''">
        <span @click="liClick" :data-index='index'>{{item.tabName}}</span>
        <span v-if="item.num" style="margin-left:20px;">{{item.num}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>
    <div class="tabOffTop120">
      <el-table :data="backups" style="width: 100%;margin:20px 0">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column label="主体名称" prop="entityName" width="150" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="证照类型" prop="natureTypeStr" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="负责人" prop="corpName" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="统一信用编码" prop="creditCode" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="完成度" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.percentageNumber}}%
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="createData" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span  @click="editClick(scope.row)">编辑</span>
            <span  @click="removeBackup(scope.row.backupId)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box" style="text-align:right">
        <el-pagination background :page-sizes="[5,8,10,15,20,25,30]" :page-size="page.pageSize" :current-page="page.pageNum" :total="page.total" layout="total, sizes, prev, pager, next, jumper" @current-change="pagecCurrentChange" @size-change="pageSizeChange"></el-pagination>
      </div>
    </div>
  </div>
</template>


<script>

  import { getBackupPage,removeBackup} from "api/sub/add.js";
  export default {
    mounted() {
      let path = this.$route.path;
      let paths = path.split("/");
      this.entityType = paths[paths.length - 2];
      this.tableSearch();
    },
    methods: {
      pagecCurrentChange(num) {
        this.tableSearch(num);
      },
      pageSizeChange(size) {
        this.page.pageSize = size;
        this.tableSearch();
      },

      tableSearch(num = 1) {
        getBackupPage(this.entityType,num, this.page.pageSize).then((r) => {
          this.backups = r.data.list;
          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.lists[1].num = r.data.total;
        })
      },

      liClick(e) {   //点击导航切换样式
        var me = this;
        if (me.defaultIndex != e.target.dataset.index) {
          this.$router.push("yzyz")
        }
      },
      removeBackup(bid) {
        removeBackup(bid).then((r) => {
          this.$message({
            message: '刪除草稿成功!',
            type: 'success'
          });
          this.tableSearch();
        });
      },
      editClick(row) {
        let et =  this.entityType == 'product'?'生产':this.entityType == 'circulation'?'流通':'餐饮';
        let nt = row.natureType == 'yzyz'?'有证有照':row.natureType == 'yzwz'?'有照无证':'无照无证';
        let routername = et + '主体录入_'+ nt;
        this.$router.push({
            name: routername,
            params: {
              backupId: row.backupId
            }
        });
      }

    },
    data() {
      return {
        entityType:'',
        page: {
          pageSize: 8,
          pageNum: 1,
          total: 0
        },
        backups: [],
        defaultIndex: 1,
        lists: [
          { tabName: '信息录入' },
          { tabName: '草稿箱', num: 0 },
        ]
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

<template>
  <!-- 备案变动记录-->

  <div class="table-content">

    <div class="ipt-btn-box" style="justify-content: end;margin-left: -20px;">
      <el-select class="selectHeight" v-model="condition.workTypes" multiple collapse-tags placeholder="业务类型" @change="tabSearch">
        <el-option v-for="item in bizWorkTypesOptions" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>
    </div>
    <div class="tabOffTop50">
      <el-table :data="tableData" class="table-div">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workTypeStr" min-width="100" label="变动类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="createUser" min-width="90" label="操作员"></el-table-column>
        <el-table-column show-overflow-tooltip prop="reviewUser" min-width="120" label="审核员"></el-table-column>
        <el-table-column show-overflow-tooltip prop="updateTime" min-width="100" label="审核时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="viewClick(scope.row)" class="operate-a">详情</a>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-box">
        <el-pagination background @size-change="pageSizeChange" @current-change="pagecCurrentChange" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 40,50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import { listWorkType, getPageByBizEntity } from "api/sub/work";
import { getOptType, reviewTabOpen } from "views/sub/info/infoFieldChange";
export default {
  mounted() {
    this.condition.bizEntityId = this.$route.params.entityId
    this.tabSearch();
    listWorkType().then((result) => {
      this.bizWorkTypesOptions = result.data;
    });
  },
  methods: {
    async searchPage(num = 1) {
      let params = this.condition;
      var formData = {
        params: params,
        num: this.page.pageNum,
        size: this.page.pageSize
      };
      getPageByBizEntity(formData).then((result) => {
        result.data.pageNum = result.data.pageNum == 0 ? 1 : result.data.pageNum;
        this.page = result.data;
        this.tableData = result.data.list;
      });

    },
    pagecCurrentChange(num) {
      this.page.pageNum = num;
      this.searchPage(num);
    },
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.searchPage();
    },
    tabSearch() {
      this.page.pageNum = 1;
      this.searchPage();
    },
    viewClick(row) {
      let optType = getOptType(this.$route.path);
      console.log(optType)
      console.log(reviewTabOpen(row.workType, optType))
      this.$router.push({
        name: reviewTabOpen(row.workType, optType),
        params: {
          id: row.id,
          entityId: row.entityId,
          natureType: row.natureTypeLabel,
          entityName: row.entityName,
          workType: row.workTypeStr,
          type: row.workType,
          review: false,
          resultRouter: this.$route.params.resultRouter
        }
      });
    }
  },
  components: {},
  data() {
    return {
      a: false,
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      bizWorkTypesOptions: [],
      condition: {
        //主体状态
        workTypes: [],
        bizEntityId: ''
      }
    }
  }
}
</script>


<style scoped>
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

.table-content {
  margin-left: -227px;
  height: 100%;
}
</style>

<template>
  <div>
    <div class="ipt-btn-box" style="justify-content: end;">
      <el-input placeholder="备案号、名称、工单号" class="w250 seekIpt" v-model="condition.search" @keyup.enter.native="handleIconClick">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
      </el-input>

      <enum-select v-model="condition.natureType" enum="com.ybveg.govx.enums.sub.NatureTypeEnum" placeholder="证照类型" @change="searchTab"></enum-select>
      <!-- <el-select clearable class="selectHeight" v-model="condition.natureType" placeholder="证照类型" @change="searchTab">
        <el-option v-for="item in natureTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select> -->
      <enum-select v-model="condition.workType" enum="com.ybveg.govx.enums.sub.SubWorkTypeEnum" placeholder="业务类型" @change="searchTab"></enum-select>
      <!-- <el-select clearable class="selectHeight" v-model="condition.workType" placeholder="业务类型" @change="searchTab">
        <el-option v-for="item in workTypeList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select> -->
      <enum-select v-model="condition.workState" enum="com.ybveg.govx.enums.WorkStateEnum" placeholder="工单状态" @change="searchTab"></enum-select>
      <!-- <el-select clearable class="selectHeight" v-model="condition.workState" placeholder="工单状态" @change="searchTab">
        <el-option v-for="item in workStateList" :key="item.key" :label="item.name" :value="item.key">
        </el-option>
      </el-select>
      -->

    </div>
    <div class="tabOffTop50">
      <el-table :data="tableData" @sort-change="sortChange" class="table-div">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workNo" min-width="100" label="工单号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="entityName" min-width="90" label="主体名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workNo" min-width="120" label="许可证号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="natureTypeLabel" min-width="100" label="证照类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="updateTime" min-width="110" label="更新时间" sortable='custom'></el-table-column>
        <el-table-column show-overflow-tooltip prop="workTypeLabel" min-width="70" label="业务类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="workStateLabel" min-width="70" label="工单状态"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <a href="javascript:;" @click="viewClick(scope.row)"  class="operate-a">详情</a>
            <a href="javascript:;" v-if="scope.row.state == 'PEND_REVIEW'" @click="workRevoke(scope.row)"  class="operate-a">撤销</a>
            <a href="javascript:;" v-if="(scope.row.state == 'ALREADY_REJECT' ||
            scope.row.state == 'ALREADY_REVOKE') && (scope.row.bizState == 'ALREADY_FILE' ||  scope.row.bizState == 'FIRST')"
               @click="reapply(scope.row)" class="operate-a">重新申请</a>

              <a v-if="scope.row.state == 'ALREADY_REVOKE'" href="javascript:;" @click="workDel(scope.row)" class="operate-a">删除</a>
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
import { pageMywork, del, revoke } from "api/sub/work";
import EnumSelect from 'components/common/EnumSelect'
import { reviewTabOpen } from "views/sub/info/infoFieldChange";


export default {
  beforeRouteUpdate(to, from, next) {
    this.entityType = to.params.entityType;
    this.searchTab();
    next();
  },

  mounted() {
    this.entityType = this.$route.params.entityType;
    this.searchTab();
  },
  methods: {
    sortChange(column) {
      if (column.order == 'ascending') {
        this.condition.sort = 'ASC';
      }
      if (column.order == 'descending') {
        this.condition.sort = 'DESC'
      }
      this.searchTab();
    },
    workRevoke(row) {
      revoke(row.id).then((result) => {
        this.$message({
          message: '撤销成功!',
          type: 'success'
        });
        this.searchTab();
      });
    },
    workDel(row) {
      const $this = this;
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(row.id).then((result) => {
          this.$message({
            message: '删除成功!',
            type: 'success'
          });
          this.searchTab();
        });
      });
    },
    reapply(row) {
      let routerName = '';
      switch (row.type) {
        case 'CHANGE':
          routerName = 'reapply_change';
          break;
        case 'FIRST':
          routerName = 'reapply_first';
      }
      this.$router.push({        name: routerName, params: {
          workId: row.id,
          entityId: row.entityId,
          type: row.entityTypeLabel,
          workType: row.type,
          entityName: row.entityName,
          natureType: row.natureType,
          natureTypeLabel: row.natureTypeLabel,
          resultRouter:'/mywork/' + this.entityType,
        }});
      },
      viewClick(row){
        this.$router.push({name: "mywork_info",params:{
          id: row.id,
          entityId: row.entityId,
          natureType: row.natureTypeLabel,
          entityName: row.entityName,
          entityType: row.entityType.toLowerCase(),
          workType: row.workTypeLabel,
          type: row.type,
          review: false,
          resultRouter: '/mywork/' + this.entityType
        }      });
    },
    handleIconClick() { //搜索框按钮点击搜索
      this.a = !this.a;
      this.searchTab();
    },
    async searchPage() {
      let params = this.condition;
      var formData = {
        entityType: this.entityType,
        params: params,
        num: this.page.pageNum,
        size: this.page.pageSize
      };
      pageMywork(formData).then((result) => {
        result.data.pageNum = result.data.pageNum == 0 ? 1 : result.data.pageNum;
        this.page = result.data;
        this.tableData = result.data.list;
      });

    },
    searchTab() {
      this.page.pageNum = 1;
      this.searchPage();
    },
    pagecCurrentChange(num) {
      this.page.pageNum = num;
      this.searchPage();
    },
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.searchPage();
    },
  },
  components: { EnumSelect },
  data() {
    return {
      a: false,
      tableData: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },

      condition: {
        //主体状态
        workState: "",
        //主体类型
        natureType: "",
        //工单类型
        workType: "",
        //搜索
        search: "",
        sort: "DESC"
      },
      dictTypeData: {}
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

table tr td:last-child .cell a {
  border-right: 1px solid #ccc;
  padding-right: 5px;
}
table tr td:last-child .cell a:last-child {
  border-right: none;
  padding-right: 0px;
}
</style>

<template>
  <div class="user-box">
    <div class="page-tilt">
      <b></b>
      <span>用户管理</span>
    </div>
    <ul class="tab-box">
      <li v-for="item,index in userType" @click="liClick" :data-index='index'
          :class="index == defaultIndex? 'li-bott':''" :key="item.key">
        <span @click="liClick" :data-index='index'>{{item.name}}</span>
      </li>
      <li class="tab-bott"></li>
    </ul>
    <div class="ipt-btn-box">
      <div>

        <template>
          <el-select style="vertical-align: top;" class="w125" v-model="searchStatus" placeholder="请选择状态"
                     @change="handleIconClick">
            <el-option
              v-for="item in selectStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>

        <el-input style="width: 300px;vertical-align: top;" placeholder="搜索内容" v-model="searchValue" >
          <el-select v-model="searchOptions" class="w100" slot="prepend" placeholder="搜索条件">
            <el-option label="全部条件" value="all"></el-option>
            <el-option label="姓    名" value="real_name"></el-option>
            <el-option label="用 户 名" value="user_name"></el-option>
            <el-option label="手 机 号" value="phone_number"></el-option>
            <el-option label="部门名称" value="dept_name"></el-option>
          </el-select>
          <el-button  slot="append" type="primary" suffix-icon="el-icon-search" @click="handleIconClick"></el-button>
        </el-input>
        <el-button slot="append"  @click="clearSearchValueAndReLoad">清空
        </el-button>



      </div>
      <div>

        <!--
          <el-button type="primary" class="w76"><i class="el-icon-upload el-icon--left"></i>上传
          </el-button>
          <el-button type="primary"><i class="el-icon-plus el-icon--left"></i>用户添加</el-button>
          -->
      </div>
    </div>
    <el-table :data="tableData" class="table-div">
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <el-table-column label="真实姓名">

        <template slot-scope="scope">
          {{scope.row.realName}}
        </template>

      </el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="userTypeStr" label="用户类型"></el-table-column>
      <el-table-column label="手机号码">
        <template slot-scope="scope">
          {{scope.row.phoneNumber}}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱">
        <template slot-scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="所属部门"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 'YES'">
            启用
          </span>
          <span v-else>
            禁用
          </span>
        </template>

      </el-table-column>
      <el-table-column label="操作" :width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 'YES'">
            <a href="javascript:;" @click="disabledUser(scope.row)" class="operate-a">
              禁用
            </a>
          </span>
          <span v-else>
            <a href="javascript:;" @click="enableUser(scope.row)" class="operate-a">
              启用
            </a>
          </span>
          <a href="javascript:;" @click="deleteUser(scope.row)" class="operate-a">
            删除用户
          </a>
          <a href="javascript:;" @click="resetPassword(scope.row.id)" class="operate-a">
            重置密码
          </a>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination background :page-sizes="[10, 20, 30, 40,50]" :page-size="page.pageSize"
                     :current-page="page.pageNum" :total="page.total"
                     layout="total, sizes, prev, pager, next, jumper"
                     @current-change="pagecCurrentChange"
                     @size-change="pageSizeChange"></el-pagination>
    </div>

    <transition name="dialog-edit-user">
      <popupBody class="popup-body" v-if="isShowUser">
        <!-- 功能模块添加到这一区域 -->
        <i class="popup-hide movePoin el-dialog__close el-icon el-icon-close"
           @click="isShowUser = false"></i>
        <div class="form-item">
          <span class="input-t">用户名:</span>
          <el-input placeholder="请输入用户名" :disabled="true" v-model="userData.userName"
                    class="w200"></el-input>
        </div>
        <div class="form-item">
          <span class="input-t">真实姓名:</span>
          <el-input placeholder="请输入真实姓名" v-model="userData.realName" class="w200"></el-input>
        </div>
        <div class="form-item">
          <span class="input-t">手机号:</span>
          <el-input placeholder="请输入手机号" v-model="userData.phoneNumber" class="w200"></el-input>
        </div>
        <div class="form-item">
          <span class="input-t">邮箱:</span>
          <el-input placeholder="请输入邮箱" v-model="userData.email" class="w200"></el-input>
        </div>
        <div class="form-btn">
          <el-button type="primary" @click="updateUser">保存</el-button>
        </div>
      </popupBody>
    </transition>
  </div>
</template>

<style scoped>
  .popup-hide {
    position: absolute;
    top: 10px;
    right: 20px;
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
    color: #9A9A9A;
    text-align: center;
  }

  .tab-box .li-bott {
    border-bottom: 2px solid #0DB5EF;
    z-index: 1;
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

  .ipt-btn-box {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .typeWidth {
    width: 150px;
    margin-right: 20px;
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
    color: #1787AD;
  }

  .center-border {
    display: inline-block;
    width: 3px;
    border-right: 1px solid #ccc;
    height: 12px;
    margin: 0 8px 0 5px;
  }
  .el-button--primary{
    background: #0DB5EF !important;
    color: #fff !important;
  }
</style>

<script>
  import popupBody from 'components/popup/popupdata';
  import {updateUser,updateDept,restPwd,getSubPartsPage,deleteUserById} from  'api/support/organize';
  export default {
    mounted() {
      this.page.pageNum = 1;
      this.tableSearch();
    },
    methods: {
      liClick(e) {   //点击导航切换样式
        var me = this;
        if (me.defaultIndex == e.target.dataset.index) {
          return;
        }
        me.defaultIndex = e.target.dataset.index;
        this.clearSearchValueAndReLoad();
      },
      clearSearchValueAndReLoad() {// search option and values init
        this.searchValue = '';
        this.searchOptions = 'all';
        this.searchStatus = '';
        this.handleIconClick();
      }
      ,
      handleIconClick() {	//搜索框按钮点击搜索
        this.a = !this.a;
        this.tableSearch();
      },
      async tableSearch(num = 1) {
        let params = {
          userType: this.userType[this.defaultIndex].key,
          status: this.searchStatus,
          searchOptions: this.searchOptions,
          searchValue: this.searchValue,
        };
        var formData ={
          params: params,
          num: num,
          size: this.page.pageSize
        };
        getSubPartsPage(formData).then((result)=>{
          this.page = result.data;
          this.tableData = result.data.list;
        });

      },
      pagecCurrentChange(num) {
        this.tableSearch(num);
      },
      pageSizeChange() {
        this.tableSearch();
      },
      updateUserApi(userData) {

        updateUser(userData).then((result)=>{
          if (result || result.status) {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            });
            this.isShowUser = false;
            this.userData = {};
            this.tableSearch();
          }
        });
      },
      deleteUser(userData) {
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserById(userData).then((result)=>{
            if (result || result.status) {
              this.$message({
                message: '删除用户成功',
                type: 'success'
              });
              this.tableSearch();
            }
          });

        });

      }
      ,
      updateUser(userData = this.userData) {
        this.updateUserApi(userData);
      },
      enableUser(userData) {
        userData.enable = 'YES';
        this.updateUserApi(userData);
      },
      disabledUser(userData) {
        userData.enable = 'NO';
        this.updateUserApi(userData);
      },
      resetPassword(userId) {
        restPwd(userId).then((result)=>{
          if (result || result.status) {
            this.$message({
              message: '重置密码成功',
              type: 'success'
            });
            this.isShowUser = false;
            this.userData = {};
            this.tableSearch();
          }
        });
      }
    },
    components: {
      popupBody
    },
    data() {
      return {
        uploadType: "DEPT",
        percentage: 0,
        percentageType: "",
        a: false,
        userType: [
          {key: 'ADMIN', name: '人员列表'}
        ],
        currentUserType: '',
        toSubmit: 27,
        defaultIndex: 0,		//控制tab导航样式
        value: '',
        tableData: [],
        searchStatus: '',
        searchOptions: 'all',
        searchValue: '',
        selectStatusOptions: [
          {
            value: "",
            label: "状态:全部"
          }, {
            value: "YES",
            label: "状态:启用"
          },
          {
            value: "NO",
            label: "状态:禁用"
          }
        ],
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        userData: {},
        isShowUser: false
      }
    }
  }
</script>

<template>
  <div class="user-box" style="margin-bottom: 200px;">
    <div class="page-tilt">
      <b></b>
      <span>编辑设备</span>
      <Back></Back>
    </div>
    <toggle-form title="主体信息">
      <div class="form-box">
        <el-form label-width="100px" class="demo-ruleForm">

          <el-form-item label="主体名称:" prop="name">
            <!--<span class="w200" @click="goEntity();">{{entity.entityName}}</span>-->
            <span class="w200">{{entity.entityName}}</span>
          </el-form-item>
          <el-form-item label="分管网格:" prop="code">
            <span class="w200">{{entity.deptName}}</span>
          </el-form-item>
          <el-form-item label="经营者:" prop="type">
            <span class="w200">{{entity.corpName}}</span>
          </el-form-item>
          <el-form-item label="联系方式:" prop="remark">
            <span class="w200">{{entity.mobile}}</span>
          </el-form-item>
          <el-form-item label="经营地址:" prop="remark">
            <span class="w200">{{entity.address}}</span>
          </el-form-item>

        </el-form>
      </div>
    </toggle-form>

    <toggle-form title="设备信息">
      <div style="margin: 20px; margin-bottom: 200px;">
        <div class="ipt-btn-box" style="margin-bottom: 15px; float: right;">
          <el-button v-auth="'peri.camera|func.add'" type="primary" icon="plus" slot="append" @click="addCamera(cameraList)" style="padding-top: 9px;">添加
          </el-button>
        </div>
        <el-table :data="cameraList" class="table-div">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="直播点名称" :width="140" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-input size="small" style="width: 120px" v-if="scope.row.isEdit" v-model="scope.row.name"></el-input>
              <el-tooltip v-if="nameIsNull" class="item" effect="dark" :content="scope.row.nameIsNull" placement="top-end">
                <div style="color: #ff4949;width: 180px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.nameIsNull}}</div>
              </el-tooltip>
              <span v-if="!(scope.row.isEdit)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="摄像头编号">
            <template slot-scope="scope">
              <el-input size="small" style="width: 120px" v-if="scope.row.isCreate" v-model="scope.row.no"></el-input>
              <span style="color: #ff4949" v-if="noIsNull">{{scope.row.noIsNull}}</span>
              <span v-if="!(scope.row.isCreate)">{{scope.row.no}}</span>
            </template>
          </el-table-column>
          <el-table-column label="摄像头类型">
            <template slot-scope="scope">
              <enum-select v-if="scope.row.isEdit" v-model="scope.row.type" enum="com.ybveg.govx.enums.CameraTypeEnum" :multiple="false" :clearable="false" placeholder="请选择类型">
              </enum-select>
              <span v-else>{{scope.row.typeLabel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="摄像头地址" :width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-input size="small" style="width: 120px" v-if="scope.row.isEdit" v-model="scope.row.playerAddr"></el-input>
              <span style="color: #ff4949" v-if="playerAddrIsNull">{{scope.row.playerAddr}}</span>
              <el-tooltip v-if="!(scope.row.isEdit)" class="item" effect="dark" :content="scope.row.playerAddr" placement="top-end">
                <div style="width: 180px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{scope.row.playerAddr}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="摄像头编号" :width="150">
            <template slot-scope="scope">
              <el-input size="small" style="width: 120px" v-if="scope.row.isEdit" v-model="scope.row.imgAddr"></el-input>
              <el-tooltip v-if="!(scope.row.isEdit)" class="item" effect="dark" :content="scope.row.imgAddr" placement="top-end">
                <div style="width: 180px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" >{{scope.row.imgAddr}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.enableLabel}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" :width="200">
            <template slot-scope="scope">
              <a v-if="!scope.row.isEdit" href="javascript:;" v-auth="'peri.camera|func.add'" @click="showEditCamera(cameraList, scope.row)" class="operate-a">编辑</a>

              <a v-if="!scope.row.isEdit" href="javascript:;" v-auth="'peri.camera|func.add'" @click="delCamera(scope.row)" class="operate-a">删除</a>

              <a v-if="!scope.row.isEdit && scope.row.enable == 'YES'" href="javascript:;" v-auth="'peri.camera|func.add'" @click="enableCamera('NO', scope.row)" class="operate-a">禁用</a>

              <a v-if="!scope.row.isEdit && scope.row.enable == 'NO'" href="javascript:;" v-auth="'peri.camera|func.add'" @click="enableCamera('YES', scope.row)" class="operate-a">启用</a>

              <a v-if="scope.row.isEdit" href="javascript:;" v-auth="'peri.camera|func.add'" @click="cancel(cameraList, scope.row);" class="operate-a">取消</a>

              <a v-if="scope.row.isEdit" href="javascript:;" v-auth="'peri.camera|func.add'" @click="sumbitCamera(scope.row)" class="operate-a">保存</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </toggle-form>

    <div class="foot-btn">
      <div>
        <el-button @click="$router.go(-1);">返回</el-button>
      </div>
    </div>

  </div>
</template>

<script>

  import Back from 'utils/back.vue';		//返回上一个页面按钮
  import ToggleForm from 'components/ToggleForm';  //列表块
  import popupBody from 'components/popup/popupdata';
  import EnumSelect from 'components/common/EnumSelect';
  import { getEntity, updateCamera, getCameraListByEntityId, delCamera } from 'api/peri/camera'
  // import { listCaremaType } from 'api/common'

  export default {
    async mounted() {
      this.entityId = this.$route.query.id;

      //主体信息
      let resultData = await getEntity(this.entityId);
      this.entity = resultData.data;

      this.getCameraListByEntityId(); //摄像头列表
    },
    methods: {
      async getCameraListByEntityId() {
        let result = await getCameraListByEntityId(this.entityId, "edit");
        this.cameraList = result.data;
      },
      goEntity() {
        let type = this.entity.type;
        if (type == 'ENTITY') {
          this.$router.push({ name: 'entityId', params: { entityId: this.entityId } });
        } else if (type == 'CFDA') {
          this.$router.push({ name: '三小基本信息', params: { cfda: this.entityId } })
        }
      },

      addCamera(cameraList) {
        let stopCount = 0;
        cameraList.forEach(data => {
          if (data.isEdit || data.isCreate) {
            stopCount++;
          }
        })
        if (stopCount > 0) {
          this.$message({
            message: '请完成之前的保存.',
            type: 'error'
          });
          return false;
        }

        cameraList.unshift({
          isEdit: true,
          isCreate: true,
          enable: 'YES',
          entityId: this.entityId

        });
      },

      showEditCamera(cameraList, row) {
        let stopCount = 0;
        cameraList.forEach(data => {
          if (data.isEdit || data.isCreate) {
            stopCount++;
          }
        })
        if (stopCount > 0) {
          this.$message({
            message: '请完成之前的操作.',
            type: 'error'
          });
          return false;
        }
        this.$set(row, "isEdit", true);
      },
      cancel(cameraList, row) {
        if (row.isEdit && row.isCreate) {
          cameraList.shift();
          row.isEdit = false;
          row.isCreate = false;
        } else {
          row.isEdit = false;
        }
      },

      enableCamera(enable, row) {
        row.enable = enable;

        updateCamera(row).then((result) => {
          if (result.status) {
            let enableStr = '';
            if (enable == 'YES') {
              enableStr = '启用';
            } else {
              enableStr = '禁用';
            }
            this.$message({
              message: enableStr + '成功',
              type: 'success'
            });

            this.getCameraListByEntityId();
          }
        });
      },
      sumbitCamera(row) {
        if (!row.name) {
          this.nameIsNull = true;
          row.nameIsNull = '请输入名称';
          return false;
        }
        if (!row.no) {
          this.noIsNull = true;
          row.noIsNull = '请输入编码';
          return false;
        }
        if (!row.playerAddr) {
          this.playerAddrIsNull = true;
          row.playerAddrIsNull = '请输入直播地址';
          return false;
        }
//      if (!row.imgAddr) {
//        this.imgAddrIsNull = true;
//        row.imgAddrIsNull = '请输入图片地址';
//        return false;
//      }

        updateCamera(row).then((result) => {
          if (result.status) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            row.isEdit = false;
            row.isCreate = false;

            this.getCameraListByEntityId();
          }
        });
      },

      delCamera(row) {
        this.$confirm('是否确认删除该设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCamera(row).then((result) => {
            if (result.status) {
              this.$message({
                message: '成功删除设备.',
                type: 'success'
              });
            }
            this.getCameraListByEntityId();
          })
        });

      }

    },
    data() {
      return {
        entity: {},
        cameraList: [],
        cameraTypeList: [],
        nameIsNull: false,
        noIsNull: false,
        playerAddrIsNull:false,
//      imgAddrIsNull:false
      }
    },
    components: {
      Back, ToggleForm, popupBody, EnumSelect
    }
  }
</script>

<style lang="scss" scoped>
  .user-box {
    overflow: hidden;
    position: relative;
  }

  .form-box {
    width: 460px;
    margin: 0 auto 40px;
    overflow: hidden;
  }

  .table-div {
    width: 100%;
    text-align: center;
  }

  .operate-a {
    color: #1787ad;
  }
</style>

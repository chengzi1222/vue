<template>
  <div class="small-body">
    <h2>小组件使用例子</h2>
    <div>
      <el-button @click="clear">清空</el-button>
      <br />
      <div>
        <div>
          <h3>所属区域/分管网格</h3>
          <select-area-grid v-model="selectAreaGridData" placeholder="选择分管网格" @change="selectAreaGrid"></select-area-grid>
          <span>
            <label>选择结果</label>
            {{ selectAreaGridData }}
          </span>
        </div>
        <div>
          <h1>参数说明</h1>
          <el-table :data="selectAreaGridParam">
            <el-table-column prop="param" label="参数"></el-table-column>
            <el-table-column prop="desc" label="说明"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="optional" label="可选值"></el-table-column>
            <el-table-column prop="default" label="默认值"></el-table-column>
          </el-table>
        </div>
        <div>
          <h1>事件说明</h1>
          <el-table :data="selectAreaGridEvent">
            <el-table-column prop="event" label="参数"></el-table-column>
            <el-table-column prop="desc" label="说明"></el-table-column>
            <el-table-column prop="param" label="类型"></el-table-column>
          </el-table>
        </div>
        <div>
          对应组件:
          <a href="http://element-cn.eleme.io/#/zh-CN/component/cascader" target="_blank">http://element-cn.eleme.io/#/zh-CN/component/cascader</a>
        </div>
      </div>
      <div>
        <div>
          <div style="float:left; width:40%;">
            <h3>字典选择器</h3>
            <dict-select v-model="dictSelectData" dict="CB_SUB" multiple placeholder="字典选择"></dict-select>
            <span>
              <label>选择结果</label>
              {{ dictSelectData }}
            </span>
          </div>
          <div style="float:left;">
            <h3>枚举选择器</h3>
            <enum-select v-model="enumSelectData" enum="com.ybveg.govx.enums.cfda.CfdaTypeEnum,com.ybveg.govx.enums.FileEnum" placeholder="字典选择"></enum-select>
            <span>
              <label>选择结果</label>
              {{ enumSelectData }}
            </span>
          </div>
          <div style="clear:both;"></div>
        </div>

        <div>
          <h1>参数说明</h1>
          <el-table :data="dictSelectDesc">
            <el-table-column prop="param" label="参数"></el-table-column>
            <el-table-column prop="desc" label="说明"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="optional" label="可选值"></el-table-column>
            <el-table-column prop="default" label="默认值"></el-table-column>
          </el-table>
        </div>
        <div>
          <h1>事件说明</h1>
          <el-table :data="dictSelectEvent">
            <el-table-column prop="event" label="参数"></el-table-column>
            <el-table-column prop="desc" label="说明"></el-table-column>
            <el-table-column prop="param" label="类型"></el-table-column>
          </el-table>
        </div>
        <div>
          对应组件:
          <a href="http://element-cn.eleme.io/#/zh-CN/component/select" target="_blank">http://element-cn.eleme.io/#/zh-CN/component/select</a>
        </div>
      </div>

    </div>
    <div>
      <h3>文件上传</h3>
      <el-upload action="/api/upload" :data="{type:'TEMPLATE'}" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SelectAreaGrid from 'components/common/SelectAreaGrid'
import DictSelect from 'components/common/DictSelect'
import EnumSelect from 'components/common/EnumSelect'
export default {
  data() {
    return {
      selectAreaGridData: [],
      dictSelectData: [],
      enumSelectData: 'WORKSHOP',
      selectAreaGridParam: [
        { param: 'value', desc: '选中项绑定值', type: 'array', optional: "—", default: '—' },
        { param: 'separator', desc: '选项分隔符', type: 'string', optional: "—", default: '斜杠' / '' },
        { param: 'placeholder', desc: '	占位符', type: 'string', optional: "—", default: '请选择' },
        { param: 'disabled', desc: '是否禁用', type: 'boolean', optional: "—", default: 'false' },
        { param: 'clearable', desc: '单选时是否可以清空选项', type: 'boolean', optional: "—", default: 'true' },
        { param: 'expand-trigger', desc: '次级菜单的展开方式', type: 'string', optional: "click / hover", default: 'click' },
        { param: 'show-all-levels', desc: '输入框中是否显示选中值的完整路径', type: 'boolean', optional: "—", default: 'false' },
        { param: 'change-on-select', desc: '是否允许选择任意一级的选项', type: 'boolean', optional: "—", default: 'true' },
      ],
      selectAreaGridEvent: [
        { event: 'change', desc: '选中值发生变化时触发', param: '目前的选中值' },
      ],
      dictSelectDesc: [
        { param: 'dict(仅字典选择器)', desc: '字典Code', type: 'string', optional: "—", default: '—' },
        { param: 'enum(仅枚举选择器)', desc: '枚举类,支持多个 ","分割', type: 'string', optional: "—", default: '—' },
        { param: 'name', desc: 'select input 的 name 属性', type: 'string', optional: "—", default: '—' },
        { param: 'multiple', desc: '是否多选', type: 'boolean', optional: "—", default: 'false' },
        { param: 'clearable', desc: '单选时是否可以清空选项', type: 'boolean', optional: "—", default: 'true' },
        { param: 'collapse-tags', desc: '多选时是否将选中值按文字的形式展示', type: 'boolean', optional: "—", default: 'true' },
        { param: 'placeholder', desc: '	占位符', type: 'string', optional: "—", default: '请选择' },
      ],
      dictSelectEvent: [
        { event: 'change', desc: '选中值发生变化时触发', param: '目前的选中值' },
        { event: 'focus', desc: '	当 input 获得焦点时触发', param: '(event: Event)' },
        { event: 'blur', desc: '	当 input 失去焦点时触发', param: '(event: Event)' },
        { event: 'source-change', desc: '此事件自定义 当数据源发送变化触发', param: '数据源' },
      ],

      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    clear() {
      this.selectAreaGridData.splice(0, this.selectAreaGridData.length);
      this.dictSelectData.splice(0, this.dictSelectData.length);
      this.enumSelectData.splice(0, this.enumSelectData.length);
      console.log("clear");
    },
    selectAreaGrid(value) {
      this.enumSelectData = 'SALE';
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  components: { SelectAreaGrid, DictSelect, EnumSelect }
}
</script>

<style scoped>
.small-body {
  padding: 10px 10%;
}
.small-body div {
  margin-top: 10px;
}
.small-body h3 {
  font-weight: 400;
  font-size: 24px;
}
.small-body h2 {
  font-weight: 400;
  font-size: 29px;
  text-align: center;
}
.small-body p {
  padding: 10px;
}
.small-body a {
  color: blue;
}
</style>

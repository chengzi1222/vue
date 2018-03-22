<template>
  <el-select class="selectHeight" v-model="currentValue" :name="name" :multiple="multiple" :clearable="clearable" :collapse-tags="collapseTags" :placeholder="placeholder"  @change="change" @blur="blur" @focus="focus">
    <el-option v-for="item in options" :key="item.key" :label="item.name" :value="item.key">
    </el-option>
  </el-select>
</template>

<script>

import * as common from 'api/common';

export default {
  props: {
    name: String,
    multiple: Boolean,
    enum: {
      required: true,
      type: String,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    collapseTags: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      required: true,
    },
  },
  mounted() {
    if (this.enum) {
      const enmus = this.enum.split(',');
      common.getEnums(enmus).then((data) => {
        if (data.status) {
          this.options = data.data || [];
        }
      })
    }
  },
  data() {
    return {
      options: [],
      currentValue: this.value
    }
  },
  methods: {
    change(value) {
      this.currentValue = value;
      this.$emit('input', value);
      this.$emit('change', value);
    },
    focus(event) {
      this.$emit('focus', event);
    },
    blur(event) {
      this.$emit('blur', event);
    },
  },
  watch:{
    options() {
      this.$emit("source-change",this.options);
    },
    value(){
      this.currentValue = this.value;
    }
  }
};
</script>

<style scoped>
.selectHeight .el-form-item__content {
  line-height: 0px;
}
</style>

<template>
  <div>
    <pic-index v-if="isGrid === 1"></pic-index>
    <chart-index v-if="isGrid === 2"></chart-index>
  </div>
</template>

<script>
import ChartIndex from './ChartIndex.vue';
import PicIndex from '../PicIndex.vue'
export default {
  mounted() {
    if (this.$store.getters.user.areaCode.length === 14 || this.$store.getters.user.areaCode === '') {
      this.isGrid = 1;
    } else {
      this.isGrid = 2
    }
  },
  data() {
    return {
      isGrid: 0,
    }
  },
  components: {
    ChartIndex,
    PicIndex
  }
}
</script>


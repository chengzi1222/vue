<template>
  <div>
    <food-dashboard v-if="label== 'FOOD'"></food-dashboard>
    <system-dashboard v-if="label== 'SYSTEM'"></system-dashboard>
  </div>
</template>

<script>

import * as storage from "utils/sessionStorage";

import FoodDashboard from './food';
import SystemDashboard from './system';

export default {
  mounted() {
    this.label = storage.getData('system');
  },
  data() {
    return {
      label: ""
    }
  },
  components: {
    FoodDashboard,
    SystemDashboard
  }
}
</script>


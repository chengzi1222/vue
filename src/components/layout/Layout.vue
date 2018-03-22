<template>
  <div class="app-wrapper">
    <header-page key="app-header-page"></header-page>
    <main-page></main-page>
  </div>
</template>

<script>

import HeaderPage from './Header';
import MainPage from './Main';

export default {
  components: {
    HeaderPage, MainPage
  }
}
</script>

<style scoped>
.app-wrapper {
  position: fixed;
  width: 100%;
}
</style>


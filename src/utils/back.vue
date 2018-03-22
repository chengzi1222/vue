<template>
  <div class="back" @click="goBack"><i class="icon iconfont icon-back"></i></div>
</template>

<script>
  export default{
    methods:{
      goBack(){
        console.log("back")                     
        history.back();
      }
    }
  }
</script>

<style scoped>
  .back{
    cursor: pointer; 
    display: inline-block;
    color: #606979;
    height: 22px;
    width: 22px;
    line-height: 22px;
  }
  .back i{
    font-size: 22px !important;
  }
</style>
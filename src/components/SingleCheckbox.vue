<template>
  <div class="single-checkbox">
    <div class="one" :class="{oneActive:oneActive}" @click="handleClick('YES')">是</div>
    <div class="two" :class="{twoActive:twoActive}" @click="handleClick('NO')">否</div>
  </div>
</template>

<script>
  export  default  {
    props:{
      currentResult:{
        type:String,
        default:function () {
          return ''
        }
      },
      currentTableIndex:{
        type:Number,
        default:function () {
          return -1
        }
      },
      //当前行的数据
      currentRowData:{
        default:function (){
          return {}
        }
      }
    },
    data(){
      return {
        result:''
      }
    },
    computed:{
      oneActive(){
        return this.result == 'YES'?true:false;
      },
      twoActive(){
        return this.result == 'NO'?true:false;
      }
    },
    methods:{
      handleClick(val){
        if(val === this.result){
          this.result = ""
        }else{
          this.result = val;
        }
        this.$emit('singlecheckboxchange',{result:this.result,index:this.currentTableIndex,row:this.currentRowData});
      }
    },
    watch:{
      currentResult(val){
        this.result = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .single-checkbox{
    display: inline-block;
    .one,.two{
      background: #EBEFF2;
      font-size:14px;
      color: #6D7787;
      width:56px;
      height: 34px;
      line-height: 34px;
      display: inline-block;
      text-align: center;
      margin: 0 2px;
      cursor: pointer;
    }
    .oneActive{
      background: #0DB5EF;
      color: #fff;
    }
    .twoActive{
      background: #FA503B;
      color: #fff;
    }
  }
</style>

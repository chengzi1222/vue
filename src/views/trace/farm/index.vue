<template>
    <div>
    <router-view></router-view>
    </div>
</template>

<script>

export default {
    methods: {
    },
    data() {
        return {
           
        };
    },
    mounted(){
        //判断角色进入页面
         this.$store.dispatch("getInfo").then((r)=>{
            let area=this.$store.state.common.user.regionCode;
            switch(area.length)
                {
                case 2://省和直辖市
                console.log("省和直辖市");
                break;
                case 4://市
                this.$router.push({name:"yb.farmCityChart"});
                break;
                case 6://区县
                this.$router.push({name:"yb.farmAreaChart"});
                break;
                case 10://街道
                this.$router.push({name:"yb.farmStreetChart"});
                break;
                case 14://网格社区
                this.$router.push({name:"yb.farmMarketChart"});
                break;
                default:
                //0是中国
                console.log("中国");
                }
         });
       
    },
}
</script>

<style scoped>
</style>

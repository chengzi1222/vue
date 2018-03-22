<template>
    <div class="bigbox">
    	<div class="page-tilt">
    	    <b></b><span>来源检测</span><Back></Back>
    	</div>
        <div class="sourceBox">
            <ul class="lisBox">
                <li v-for="item in dataLis" :class="item.guid == orderDetailGuid?'li':''" @click="lisClick(item.guid)">
                    {{item.pdtName}}
                </li>
            </ul>
            <div v-if="!dataIs" style="text-align: center;padding-top: 50px;width: 100%;">
                暂无数据
            </div>
            <div class="sourceSmallBox" v-if="dataPage!=null && dataIs">
                <div class="titImg">
                    <img :src="dataPage.syInfo.pdtImg" alt="">
                    <h3>{{dataPage.syInfo.pdtName}}</h3>
                </div>
                <div class="borBox">
                    <div class="qq"></div>
                    <h2>采购环节</h2>
                    <div class="contBox">
                        <p><span>单位名称：</span>{{dataPage.syInfo.buyerName}}</p>
                        <p><span>单位地址：</span>{{dataPage.syInfo.buyerAddr}}</p>
                        <p><span>下单时间：</span>{{dataPage.syInfo.buyTime}}</p>
                        <p><span>收货时间：</span>{{dataPage.order.dates}}</p>
                    </div>
                </div>
                <div class="borBox">
                    <div class="qq"></div>
                    <h2>配送环节</h2>
                    <div class="contBox">
                        <p><span>单位名称：</span>{{dataPage.syInfo.sellerName}}</p>
                        <p><span>单位地址：</span>{{dataPage.syInfo.sellerName}}</p>
                        <p><span>配送时间：</span>{{dataPage.syInfo.orderTime}}</p>
                        <p><span>配送人：</span>{{dataPage.order.realName}}</p>
                        <!-- <p><span>配送车辆：</span>yInfo.}}</span>-->
                    </div>
                </div>
                <div class="borBox">
                    <div class="qq"></div>
                    <h2>来源环节</h2>
                    <div class="contBox">
                        <p><span>来源类型：</span>{{dataPage.syInfo.sourceType_}}</p>
                        <p><span>来源名称：</span>{{dataPage.syInfo.sourceName}}</p>
                        <p><span>来源区域：</span><span v-if="dataPage.syInfo.areaName">{{dataPage.syInfo.areaName}}</span><span v-if="!dataPage.syInfo.areaName">--</span></p>
                        <p><span>来源地址：</span>{{dataPage.syInfo.sourceAddr}}</p>
                    </div>
                </div>
                <div class="borBox">
                    <div class="qq"></div>
                    <h2>检测环节</h2>
                    <div class="contBox">
                        <p><span>检测类型：</span><span v-if="dataPage.detectionInfo.detecItem">{{dataPage.detectionInfo.detecItem}}</span><span v-if="!dataPage.detectionInfo.detecItem">--</span></p>
                        <p><span>检测项目：</span><span v-if="dataPage.detectionInfo.detecItem">{{dataPage.detectionInfo.detecItem}}</span><span v-if="!dataPage.detectionInfo.detecItem">--</span></p>
                        <p><span>标准值：</span><span v-if="dataPage.detectionInfo.standardVal">{{dataPage.detectionInfo.standardVal}}%</span><span v-if="!dataPage.detectionInfo.standardVal">--</span></p>
                        <p><span>实测值：</span><span v-if="dataPage.detectionInfo.actualVal">{{dataPage.detectionInfo.actualVal}}%</span><span v-if="!dataPage.detectionInfo.actualVal">--</span></p>
                        <p><span>检测结果：</span><span v-if="dataPage.detectionInfo.detecResult">{{dataPage.detectionInfo.detecResult}}</span><span v-if="!dataPage.detectionInfo.detecResult">--</span></p>
                        <p><span>检测时间：</span><span v-if="dataPage.detectionInfo.uploadTime">{{dataPage.detectionInfo.uploadTime}}</span><span v-if="!dataPage.detectionInfo.uploadTime">--</span></p>
                        <p><span>检测人：</span><span v-if="dataPage.detectionInfo.detecPerson">{{dataPage.detectionInfo.detecPerson}}</span><span v-if="!dataPage.detectionInfo.detecPerson">--</span></p>
                        <p><span>检测单位：</span><span v-if="dataPage.detectionInfo.sellerName">{{dataPage.detectionInfo.sellerName}}</span><span v-if="!dataPage.detectionInfo.sellerName">--</span></p>
                    </div>
                </div>
                <div class="borBox borNone">
                    <div class="qq" style="left: -7px;"></div>
                    <h2>检测报告</h2>
                    <div class="contBox">
                        <img v-if="false">
                        <span v-if="true">暂无数据</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as plan from "api/trace/supervise"
import Back from 'utils/back.vue'       //返回上一个页面按钮
export default {
    methods: {
        getLisData(){
            let form = new FormData();
            form.append('guid',this.guid);//'00040F3BAD3043D4AC444A536BC4D1A1');
            plan.postOdlist(form).then(d => {
                if(d.data){
                    this.dataLis = d.data;
                }
            })
        },
        getSourceData(){
            let form = new FormData();
            form.append('guid',this.guid);//'E6C750EBAED34F059AFB057C9237F257');
            form.append('orderDetailGuid',this.orderDetailGuid);//'1B5E9EE0DBE34A768E72C1B879F27360');
            plan.postSuy(form).then(d => {
                if (JSON.stringify(d.data.syInfo) != '{}') {
                    this.dataIs = true;
                }else{
                    this.dataIs = false;
                }
                if(d.data){
                    this.dataPage = d.data;
                }
            })
        },
        lisClick(guid){
            this.orderDetailGuid = guid;
            this.getSourceData();
        }
    },
    mounted() {//async
        this.guid = this.$route.query.Orderguid;
        this.orderDetailGuid = this.$route.query.DetailGuid;
        // debugger
        this.getLisData();
        this.getSourceData();
    },
    data() {
        return {
            dataIs:true,
            dataLis:null,
            dataPage:null,
            subName:'',
            guid:'',
            orderDetailGuid:''
        };
    },
    components: {
        Back
    }
}
</script>

<style scoped>
    .bigbox{
        height: auto;
        margin-bottom: 20px;
    }
    .sourceBox{
        height: calc(100% - 80px);
        min-height: 500px;
        border: 1px solid #C2CAD2;
        display: flex;
        margin-top: 20px;
    }
    .lisBox{
        width: 220px;
        border-right: 1px solid #ccc;
    }
    .lisBox li{
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #393939;
    }
    .lisBox .li{
        background: #DFE7F0;
    }
    .sourceSmallBox{
        width: calc(100% - 250px);
        border-left: 1px solid #C2CAD2;
        height: 100%;
        padding-left: 30px;
    }
    .titImg{
        display: flex;
        margin: 20px 0;
    }
    .titImg img{
        width: 70px;
        height: 70px;
        vertical-align: middle;
    }
    .titImg h3{
        font-size: 20px;
        color: #393939;
        margin-left: 20px;
        margin-top: 20px;
    }
    .borBox{
        margin-left: 7px;
        padding-left: 27px;
        border-left: 4px solid #0DB5EF;
        position: relative;
        float: left;
        width: 51%;
    }
    .borNone{
        border: none;
    }
    .borBox .qq{
        border: 4px solid #0DB5EF;
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        box-sizing: border-box;
        left: -11px;
        background: #fff;
    }
    .borBox h2{
        font-size: 18px;
        color: #393939;
    }
    .contBox{
        font-size: 14px;
        color: #6D7787;
        line-height: 24px;
        margin:8px 0 20px;
    }
    .contBox img{
        width: 260px;
        height: 160px;
        border-radius: 7px;
    }
</style>

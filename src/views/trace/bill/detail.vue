<template>
<div class="panel panel-default bigbox bill-detail" ng-controller="cfdaMainCtrl">
  <div class="page-tilt">
    	    <b></b><span>{{buyerName}}账单明细</span>
            <div class="floatR">
                <el-date-picker
                    @change="dateChange"
                    class="w140"
                    v-model="date"
                    type="month"
                    placeholder="选择月份">
                 </el-date-picker>
            </div>      
    </div>
  <div  class="bill" style="margin-top:20px;">
     <h4>{{buyerName}}&emsp;<span>{{(params && params.date)?params.date.substr(-2,2):""}}</span>月账单汇总</h4>
       
     <div class="content-box" style="width:100%">
        <!--点击前  -->
         <div class="left floatL hide" style="min-width:690px;width:60%" v-show="clickTag">
             <p class="title">消费占比</p>
             <p class="count" style="color: #A2AAB6;">品种数:<span style="margin-left:5px;">{{order?order.pdtNum:""}}</span></p>
             <div style="height:222px;width:690px;padding-right:10px;margin:0 auto" id="pie" > 
                 <!-- 放图表 -->
             </div>
         </div>

        <!--点击后  -->
        <div class="left floatL click-after clearfix " style="width:59%;border:1px solid #cbcbcb;" v-show="!clickTag">
            <div class="line3"></div>
            <div class="head">
                <strong style="margin-right:5px;">{{pieData.name}}</strong><span>(共计<span>{{pieData.value}}</span>元)</span>
                <i class="el-icon-close close" @click="clickTag=true"></i>
            </div>
            <ul class="body-left floatL" style="margin-top:30px;">
                <li class="body-item" v-for="(item,index) in list" :key=""index>
                    <span class="rangenum">{{index+1}}.</span>
                    <span class="pd-name">{{item.pdtName}}</span>
                    <span class="price">{{item.price}}<span>元</span></span>
                </li>
               
            </ul>
         </div>

             <!--分割线  -->
        <!--   <div class="linetwo"></div> --> 
        <div class="line"></div>
         

        <div class="right floatR text-center" style="width:39%;">
            <p style="margin-top:96px;"><span style="color:#1f7fe0;font-size:18px;margin-right:5px;">{{order?order.amount:""}}</span>元</p>
            <p>月总支出</p>
        </div>
     </div>
    
     <div class="content-box" style="width:61%;">
         <div class="clearfix">
            <p class="title floatL"><span>7</span>月消费趋势<span>（万元）</span></p>
            <el-select v-model="lineType" placeholder="请选择" @change="drawLine" class="w120 floatR">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </div>
        
         <div style="height:255px;width:100%;" id="lineEchart">
               <!-- 放图表 -->
         </div>
     </div>

     <div class="content-box floatR" style="width:35%;margin-left:4%;">
        <p class="title">消费分析</p>
        <div style="padding-left:50px;margin-top:30px;">
            <p>月消费<span class="red">{{order?((order.amount)/10000).toFixed(4):""}}</span>万,环比上月增长<span class="red">{{lastMonth}}</span></p>
            <p style="margin-bottom:20px;">学校消费能力在该辖区排名第<span class="red">{{rank}}</span>名。</p>
            <p>学校总人数:<span>{{peopelNum?peopelNum:'0'}}</span>人</p>
            <p>人均日消费:<span>{{(order && peopelNum)?(order.amount/peopelNum/30).toFixed(2):"--"}}</span>元</p>

            <a v-if="show" @click="show=false" style="height:30px;display:block;text-align:center;width:120px;line-height:30px;margin-top:20px;border:1px solid #0DB5EF ;color:#0DB5EF ;border-radius:5px;" href="javascript:;" class="btn">设置学校总人数</a>
            <div v-else style="margin-top:20px;">
                <el-input @blur="show=true" style="width:120px;" v-model="peopelNum" placeholder="请输入学校人数" @keyup.enter.native="handleKeyUp"></el-input>
            </div>

        </div>
        
     </div>

     <div class="content-box clearfix" style="width:100%">
        <div class="floatL flexbox left" style="width:70%;border-right:1px solid #cbcbcb;">
            <div class="text-center flexbox-item">
                <p><span class="bold">{{order?((order.amount)/10000).toFixed(4):""}}</span>万</p>
                <p class="name">月消费金额</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{lastYear}}</span></p>
                <p class="name">同比增长率</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{lastMonth}}</span></p>
                <p class="name">环比增长率</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{order?order.orderNum:""}}</span>单</p>
                <p class="name">订单总数</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{order?order.pdtNum:""}}</span>种</p>
                <p class="name">品种数</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{order?order.dlrNum:""}}</span>家</p>
                <p class="name">供应商数量</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{rate}}%</span></p>
                <p class="name">使用率</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{(order && peopelNum)?(order.amount/peopelNum).toFixed(2):"--"}}</span>元</p>
                <p class="name">人均月消费</p>
            </div>
            <div class="text-center flexbox-item">
                <p><span class="bold">{{(order && peopelNum)?(order.amount/peopelNum/30).toFixed(2):"--"}}</span>元</p>
                <p class="name">人均日消费</p>
            </div>
        </div>
         <div class="right floatR text-center" style="width:29%">
            <p  class="red" style="margin-top:96px;font-size:30px;">{{status}}</p>
            <p class="name">使用情况</p>
        </div>
     </div>
    <div style="clear:both;"></div> 
    
    <h4 style="margin:20px 0;">账单明细</h4>
     <el-table :data="dataPage" class="table-div">
            <el-table-column :show-overflow-tooltip=true show-overflow-tooltip prop="pdtName" min-width="250" align="center" label="商品名"></el-table-column>
            <el-table-column show-overflow-tooltip  min-width="100" label="订单单价" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.orderPrice}}/{{scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip  min-width="120" align="center" label="订单数量">
                <template slot-scope="scope">
                    <span>{{scope.row.orderWeight}}{{scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip  min-width="120" align="center" label="订单总价">
                 <template slot-scope="scope">
                    <span>{{scope.row.orderAmount}}元</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="100" align="center" label="实际单价">
                 <template slot-scope="scope">
                    <span>{{scope.row.reportPrice}}/{{scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip  min-width="120" align="center" label="实际数量">
                 <template slot-scope="scope">
                    <span>{{scope.row.reportWeight}}{{scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip  min-width="120" align="center" label="实际总价">
                <template slot-scope="scope">
                    <span>{{scope.row.reportAmount}}元</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="date" min-width="120" align="center" label="到货日期"></el-table-column>
        </el-table>
        <div class="pagination-box pull-right" style="margin:30px 0">
          <el-pagination background :current-page="page.pageNum"
                         :page-sizes="[10, 20, 30, 40,50]"
                         :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                         :total="page.total"
                         @size-change="pageSizeChange"
                         @current-change="pagecCurrentChange">
          </el-pagination>
        </div>
  </div>


</div>

</template>

<script>
import * as billAPI from "api/trace/bill.js"
import pieCharts from './pie_echarts';
import lineChars from './line_echarts.js';
import Back from 'utils/back.vue'       //返回上一个页面按钮

export default {
    mounted(){
      
       this.params = this.$route.query;       
       this.buyerName =  this.params.buyerName
       this.date = this.params.date
       this.draw()
       this.getPageData();
    },
    data(){
        return {
            date:"",
            options: [{
                value: 'month',
                label: '按月统计'
                }, {
                value: 'day',
                label: '按天统计'
            }],
            lineType:'month',
            pieData:{},
            buyerName:"",
            clickTag:true,
            lastYear:'--',
            lastMonth:'--',
            params:null,
            order:null,
            rate:0,
            rank:0,
            peopelNum:null,
            show:true,
            dataPage:[],
            page: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            list:[]
        }
    },
    computed:{
        status(){
            if(this.rate>=90) return '优'
            if(this.rate>=80 && this.rate<90) return '良'
            if(this.rate>=70 && this.rate<80) return '中'
            if(this.rate<70) return '差'
        }
    },
    methods:{
         //  获取时间，默认为当前时间
        getdate(date) {
            let dates =null;
            if(date == undefined || date == 'undefined'){
                dates =  new Date();
            }else{
                dates =  date;
            }
            let mon = dates.getMonth()  + 1;         //getMonth()返回的是0-11，则需要加1
            if(mon <=9){                                     //如果小于9的话，则需要加上0
                mon = "0" + mon;
            }
            this.params.date = dates.getFullYear() + "-" + mon;
        },
        dateChange(){
            this.getdate.call(this,this.date);
            this.draw();
        },          
        handleKeyUp(){
            this.peopelNum =  this.peopelNum.replace(/^0|\D+/,'');
        },
          //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('guid',this.params.guid);
            form.append('date',this.params.date);
            form.append('pageSize',this.page.pageSize);
            form.append('pageNumber',this.page.pageNum);
            billAPI.odpage(form).then(d => {
                this.dataPage = d.data;
                this.page.total = d.pageObj.totalRecords;
            })
        },
        //页数改变
        pagecCurrentChange(num) {
            this.page.pageNum = num;
            this.getPageData();
        },
        //每页数量改变
        pageSizeChange(size) {
            this.page.pageSize = size;
            this.getPageData();
        },
        //渲染页面ehcarts
        draw(){
            let form = new FormData();
            for(let key in this.params){
                let item = this.params[key];
                form.append(key,item);
            }
            billAPI.postDetail(form).then(res=>{
                this.order = res.data.order;
                this.rate = res.data.rate;
                this.rank = res.data.rank;
                this.lastYear = res.data.lastYear?res.data.lastYear:'--';
                this.lastMonth = res.data.lastMonth?res.data.lastMonth:'--';

                let bChart = res.data.bChart;
                let arr = [];
                let nameArr = [];
                bChart.forEach(item=>{
                    arr.push(Object.assign({},{
                        "name":(item['typeName']+" "+item['price']+"元 "+item["per"]+"%"),
                        "value":item['price'],
                        "typeCode":item['typeCode']
                    }));
                    nameArr.push(item['typeName']+" "+item["price"]+"元 "+item["per"]+"%")
                });
                
                pieCharts('pie',nameArr,arr,(a,b)=>{
                    let form = new FormData();
                    form.append('guid',this.params.guid);
                    form.append('date',this.params.date);
                    form.append('typeCode',a.data.typeCode);
                    this.pieData = a.data;
                    
                    billAPI.pdtlist(form).then(d => {
                        this.list = d.data;
                        this.clickTag = false
                    })
                    
                });
            })

            this.drawLine();

        },
        drawLine(){
            let form = new FormData();
            form.append('guid',this.params.guid);
            form.append('date',this.params.date);
            form.append('type',this.lineType);
           
            billAPI.line(form).then(d =>{
                let lChart = d.data;
                let arr2 = [];
                let nameArr2 = [];  
                lChart.forEach(item=>{
                    arr2.push(item["amount"]);
                    nameArr2.push(item['date'])
                });
                lineChars('lineEchart','订单总金额',nameArr2,arr2,(date)=>{
                    this.params.date = date;
                    this.getPageData();
                    this.drawLine();
                });
            })
            
        }
    },
    components: {
      Back
    }
}
    
</script>
<style>
.bill-detail  .el-input__icon{
    width: 0px !important;
}
.bill-detail .el-input__suffix{
    width: 30px;
    height: 26px;
}
</style>

<style lang="scss" scoped>
    .bigbox{
        position: relative;
    }
    .dateBox{
        position: absolute;
        top: 15px;
        right: 0;
        z-index: 666;
    }
    h4{
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    color: #393939;
}

.bill{
    &:after{
        content: "";
        clear: both;
        overflow: hidden;
    }
    .content-box{

        .red{
            color: red;
        }
        position: relative;
        padding: 10px;
        color:#5a5a5a;
        margin: 10px 0;
        float: left;
        height: 300px;
        border: 1px solid #cbcbcb;
        box-sizing: border-box;
        .title{
            font-size: 16px;
            color: #393939;
        }
        .line{
            height: 240px;
            width: 1px;
            position: absolute;
            left: 61%;
            top:33px;
            background: #cbcbcb;
        }
        .linetwo{
            height: 177px;
            width: 1px;
            position: absolute;
            left: 30%;
            top:61px;
            background: #cbcbcb;
        }
        .click-after{
            position:relative;
            .line3{
                position:absolute;
                left:50%;
                top:50px;
                background:#ccc;
                width:1px;
                height:228px;
            }
            .head{
                height: 50px;
                line-height: 50px;
                background-color: #e7ebee;
                padding: 0 20px;
                border-bottom:1px solid #cbcbcb;
                position:relative;
                >.close{
                    position:absolute;
                    right:20px;
                    top:20px;
                    cursor:pointer;
                    &:hover{
                        opacity:0.5;
                    }
                }
            }
            ul{
                box-sizing: border-box;
                padding: 0 20px;
                list-style:none;
                width: 100%;
                color: #A2AAB6;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                height: 198px;
            }
            .body-item{
                box-sizing:border-box;
                width: 50%;
                padding: 0 20px;
                height: 35px;
                line-height: 35px;
                .price{
                    float: right;
                }
                .rangenum{
                    margin-right: 10px;
                }
            }
        }
    }
    .left,.right{
        height: 100%;
    }
    .flexbox{
        display: flex;
        flex-wrap: wrap;
        .flexbox-item{
            width: 160px;
            margin:10px;
        }
    }
    .bold{
        font-size: 28px;
        color: #393939;
    }
}
.name{
    font-size: 14px;
    color: #A2AAB6;
}
</style>
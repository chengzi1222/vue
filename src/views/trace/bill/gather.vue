<template>
    <div class="bigbox">
    	<div class="page-tilt">
    	    <b></b><span>账单汇总</span>
    	</div>
        <div class="dateBox">
            <span class="demonstration"></span>
            <el-select class="w130" style="margin-right: 10px;" v-model="transferData.type" @change="sx" placeholder="请选择">
                <el-option
                    v-for="item in patternLis"
                    :key="item.type"
                    class="w140"
                    :label="item.type"
                    :value="item.key">
                </el-option>
            </el-select>
                <el-date-picker
                    v-model="seldate"
                    type="month"
                    class="w140"
                    @change="singleDate()"
                    placeholder="选择月份">
                </el-date-picker>
        </div>
        <div class="dataBox">
            <div class="collect" @click="getPageDataSingle('allSchool')">
                <h3>{{this.dataLis.all}}<span style="font-size:14px;color:#A2AAB6;">万</span></h3>
                <p>总金额</p>
            </div>
            <div class="dining" >
                <div @click="getPageDataSingle('zhongXue')">
                    <h3>{{this.dataLis.zx}}<span style="font-size:14px;color:#A2AAB6;">万</span></h3>
                    <p>中学</p>
                </div>
                <div @click="getPageDataSingle('xiaoXue')">
                    <h3>{{this.dataLis.xx}}<span style="font-size:14px;color:#A2AAB6;">万</span></h3>
                    <p>小学</p>
                </div>
                <div @click="getPageDataSingle('yey')">
                    <h3>{{this.dataLis.yey}}<span style="font-size:14px;color:#A2AAB6;">万</span></h3>
                    <p>幼儿园</p>
                </div>
            </div>
        </div>
        
        <div>
            <el-select v-model="type" placeholder="请选择"  @change="handleChange">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
               >
                </el-option>
            </el-select>
            <el-input style="margin-left: 20px;vertical-align: middle;" placeholder="请输入学校"  class="w260 seekIpt"  v-model="subName" @keyup.enter.native ="seekEnter()">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
            </el-input>
        </div>
        <el-table :data="dataPage" class="table-div">
            <el-table-column show-overflow-tooltip prop="buyerName" min-width="200" label="学校名称"  align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="buyerType" min-width="100" label="学校类型"  align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="areaName" min-width="120" label="区域"></el-table-column>
            <el-table-column show-overflow-tooltip prop="address" min-width="200" align="left" label="地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="orderNum" min-width="120" label="账单数"></el-table-column>
            <el-table-column show-overflow-tooltip  min-width="80" label="操作">
                <template slot-scope="scope">
                    <a style="color: #1787AD;cursor:pointer" @click="go(scope.row)">账单明细</a>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box">
          <el-pagination background :current-page="page.pageNum"
                         :page-sizes="[10, 20, 30, 40,50]"
                         :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
                         :total="page.total"
                         @size-change="pageSizeChange"
                         @current-change="pagecCurrentChange">
          </el-pagination>
        </div>
    </div>
</template>

<script>
import * as billAPI from "api/trace/bill.js"

export default {
    methods: {
        sx(){
            this.gettransferData();
            this.getPageData();
        },
        //  获取时间，默认为当前时间
        getdate(date) {
            let dates =date || new Date();
            let mon = dates.getMonth()  + 1;         //getMonth()返回的是0-11，则需要加1
            if(mon <=9){                                     //如果小于9的话，则需要加上0
                mon = "0" + mon;
            }
            this.transferData.date = dates.getFullYear() + "-" + mon;
        },
        //转换参数类型，请求数据
        gettransferData(){
            let form = new FormData();
            form.append('areaId',this.transferData.areaId);
            form.append('type',this.transferData.type);
            form.append('date',this.transferData.date);
            billAPI.postMain(form).then(d => {
                this.dataLis = d.data;
            })
        },
        //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('scType',this.transferData.type);
            form.append('subName',this.subName);
            form.append('type',this.type);
            form.append('date',this.transferData.date);
            form.append('areaId',this.transferData.areaId);
            form.append('pageSize',this.page.pageSize);
            form.append('pageNumber',this.page.pageNum);
            billAPI.postPage(form).then(d => {
                this.dataPage = d.data;
                this.page.total = d.pageObj.totalRecords;
            })
        },
        //点击查询
        getPageDataSingle(type){
            this.type = type;
            this.getPageData();
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
       
        //改变日期
        singleDate(){
            this.getdate(this.seldate);
            this.gettransferData();
            this.getPageData();
        },
        //下拉改变
        handleChange(){
            this.getPageData();
        },
        //搜索框搜索
        seekEnter(){
            this.getPageData();
        },
         //搜索框搜索
        handleIconClick(){
             this.getPageData();
        },
        //进入二级页面
        go(rowData){
            let {guid,buyerName} = rowData;
            let { date,areaId }=this.transferData;
            sessionStorage.setItem('billGatherDate', date);
            this.$router.push("/yb/bill/detail/?guid="+guid+"&date="+date+"&areaId="+areaId+"&buyerName="+buyerName);
        },
    },
    mounted() {
        if(this.count.length >= 6){
            this.transferData.areaId = this.count.slice(0,6);
        } else {
            this.transferData.areaId = this.count;
        }
        if (sessionStorage.getItem('billGatherDate')) {
            this.seldate = sessionStorage.getItem('billGatherDate');
            this.transferData.date = sessionStorage.getItem('billGatherDate');
        } else{
            this.getdate();
            this.seldate = this.transferData.date;            
        }
        this.gettransferData();
        this.getPageData();
    },
    computed:{
        count () {
          return this.$store.state.common.user.regionCode
        }
    },
    data() {
        return {
            seldate:null,
            patternLis:[{
                    type:'全部办学类型',
                    key:''
                },{
                    type:'公立',
                    key:'PUBLIC'
                },{
                    type:'私立',
                    key:'PRIVATE'
            }],
            options: [{
                value: 'allSchool',
                label: '全部'
                }, {
                value: 'yey',
                label: '幼儿园'
                }, {
                value: 'xiaoXue',
                label: '小学'
                }, {
                value: 'zhongXue',
                label: '中学'
                }, {
                value: 'daXue',
                label: '大学'
            },{
                value: 'other',
                label: '其他学校'
            }],
            type:'allSchool',

            page: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            transferData:{
                areaId:'',
                date:null,
                type:'',
            },
            dataLis:{},
            dataPage:[],
            subName:'',
           
        };
    },
    components: {
      
    }
}
</script>

<style scoped>
    .bigbox{
        position: relative;
    }
    .dateBox{
        position: absolute;
        top: 15px;
        right: 0;
        z-index: 666;
    }
    .tab-box {
        width: 100%;
        display: flex;
        position: relative;
    }
    .tab-box .tabLi {
        width: 110px;
        height: 50px;
        line-height: 50px;
        margin-right: 30px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #9A9A9A;
        text-align: center;
    }
    .tab-box .li-bott {
        border-bottom: 2px solid #0DB5EF;
        z-index: 666;
        position: relative;
    }
    .dataBox{
        display: flex;
        margin:60px 0 20px;
        justify-content: space-between;
    }
    .dataBox div{
        height: 90px;
        text-align: center;
        border: 1px solid #C2CAD2;
        cursor: pointer;
    }
    .dataBox h3{
        font-size: 28px;
        color: #3B3B3B;
        margin-top: 14px;
        line-height: 35px;
    }
    .dataBox p{
        font-size: 14px;
        color: #A2AAB6;
    }
    .collect{
        width: 18%;
    }
    .dining{
        width: 80%;
        display: flex;
        justify-content: space-between;
    }
    .dining div{
        border: none;
        width: 33.33%;
    }
    .dc{
        float: right;
    }
    .table-div{
        margin: 20px 0;
        text-align: center;
    }
    .pagination-box {
        text-align: right;
        margin-top: 20px;
    }
    .dining .riBorder{
        border-right: 1px solid #C2CAD2;
    }
</style>

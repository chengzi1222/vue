<template>
    <div class="bigbox">
        <div class="page-tilt">
            <b></b><span>主体监控</span>
        </div>
        <div class="dateBox">
            <el-date-picker
              v-model="seldate"
              type="date"
              class="w140"
              @change="singleDate()"
              placeholder="选择日期">
            </el-date-picker>
        </div>
        <ul class="tab-box">
            <li class="tabLi" v-for="(item,index) in patternLis" :data-index="index"
                :class="index==mess.choose?'li-bott':''" @click="choose(index,item.key)">
                <div :data-index='index'>{{item.type}}</div>
            </li>
            <li class="tab-bott"></li>
        </ul>
        <div class="dataBox">
            <div class="collect">
                <h3>{{this.dataLis.all}}</h3>
                <p v-if="this.transferData.type == 'normal'" @click="getPageDataSingle('all')">主体汇总</p>
                <p v-if="this.transferData.type != 'normal'" @click="getPageDataSingle('allSchool')">学校汇总</p>
            </div>
            <div class="dining" v-if="this.transferData.type != 'normal'">
                <div @click="getPageDataSingle('zhongXue')">
                    <h3>{{this.dataLis.zhongXue}}</h3>
                    <p>中学食堂</p>
                </div>
                <div @click="getPageDataSingle('xiaoXue')">
                    <h3>{{this.dataLis.xiaoXue}}</h3>
                    <p>小学食堂</p>
                </div>
                <div @click="getPageDataSingle('yey')">
                    <h3>{{this.dataLis.yey}}</h3>
                    <p>幼儿园食堂</p>
                </div>
            </div>
            <div class="dining" v-if="this.transferData.type == 'normal'">
                <div class="riBorder" @click="getPageDataSingle('dinning')">
                    <h3>{{this.dataLis.shiTan}}</h3>
                    <p>食堂监管总数</p>
                </div>
                <div @click="getPageDataSingle('restaurant')">
                    <h3>{{this.dataLis.canYin}}</h3>
                    <p>餐饮监管总数</p>
                </div>
                <div @click="getPageDataSingle('other')">
                    <h3>{{this.dataLis.other}}</h3>
                    <p>其他类型总数</p>
                </div>
            </div>
            <div class="collect" @click="getPageDataSingle('dlr')">
                <h3>{{this.dataLis.dlrNum}}</h3>
                <p v-if="this.transferData.type != 'normal'">配送商</p>
                <p v-if="this.transferData.type == 'normal'">配送商监管总数</p>
            </div>
        </div>
        <div>
            <el-input placeholder="请输入主体名称" class="w260 seekIpt" v-model="subName" @keyup.enter.native ="seekEnter()">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getPageData"></i>
            </el-input>
            <el-button class="w100 dc" type="primary">导出</el-button>
            <a href="http://172.16.4.24:8081/govapi/sub/exportSub">aa</a>
        </div>
        <el-table :data="dataPage" class="table-div etable pointerTab" @row-click="go" :key="typeName">
            <el-table-column show-overflow-tooltip prop="subName" min-width="200" label="主体名称" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="address" min-width="200" label="地址" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="typeName" min-width="120" label="类型"></el-table-column>
            <el-table-column show-overflow-tooltip prop="legalPerson" min-width="120" label="责任人"></el-table-column>
            <el-table-column show-overflow-tooltip prop="tel" min-width="80" label="手机号"></el-table-column>
            <el-table-column show-overflow-tooltip min-width="80" label="配送商数" v-if="this.Single != 'dlr' || this.typeName == 1" @cell-click="">
                <template slot-scope="scope">
                    <span @click.stop="goTwo(scope)" style="width: 100%;display: inline-block;">{{scope.row.num}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="80" label="学校数" v-if="this.Single == 'dlr'  || this.typeName == 0" @cell-click="">
                <template slot-scope="scope">
                    <span @click.stop="goSchool(scope)" style="width: 100%;display: inline-block;">{{scope.row.num}}</span>
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
import {exportFile,exportTitleGenerate} from 'api/statistics/statistics';
import * as plan from "api/trace/supervise"
export default {
    methods: {
        //切换导航样式
        choose(index,key) {
            this.mess.choose = index;
            this.transferData.type = key;
            this.Single = key;
            this.isSeller = 'FALSE';
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
            let day = dates.getDate();                   //getdate()返回的是1-31，则不需要加1
            if(day <=9){                                     //如果小于9的话，则需要加上0
                day = "0" + day;
            }
            this.transferData.date = dates.getFullYear() + "-" + mon + "-" +  day;
        },
        //转换参数类型，请求数据
        gettransferData(){
            let form = new FormData();
            form.append('areaId',this.transferData.areaId);
            form.append('type',this.transferData.type);
            form.append('date',this.transferData.date);
            plan.postMain(form).then(d => {
                this.dataLis = d.data;
            })
        },
        //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('subName',this.subName);
            form.append('state',this.Single);
            form.append('date',this.transferData.date);
            form.append('areaId',this.transferData.areaId);
            form.append('type',this.transferData.type);
            form.append('pageSize',this.page.pageSize);
            form.append('pageNumber',this.page.pageNum);
            form.append('isSeller',this.isSeller);
            plan.postPage(form).then(d => {
                this.dataPage = d.data;
                this.page.total = d.pageObj.totalRecords;
                if(d.data[0].typeName!= "配送商"){
                    this.typeName = 1
                } else{
                    this.typeName = 0
                }
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
        //点击模式分属性
        getPageDataSingle(type){
            this.Single = type;
            if (type == 'dlr') {
                this.isSeller = 'TRUE';
            }else{
                this.isSeller = 'FALSE';
            }
            this.getPageData();
        },
        //改变日期
        singleDate(){
            this.getdate(this.seldate);
            this.gettransferData();
            this.getPageData();
        },
        //搜索框搜索
        seekEnter(){
            this.getPageData();
        },
        go(row){
            if(row.typeName != "配送商"){
                sessionStorage.setItem('monitDate', this.transferData.date);
                this.$router.push({
                    name: 'yb.orderlis',
                    query:{
                        guid:row.guid,
                        date:this.transferData.date
                    }
                })
            }else{
                return false;
            }
        },
        goTwo(scope){
            // if(scope.row.typeName != "配送商"){
                sessionStorage.setItem('monitDate', this.transferData.date);
                this.$router.push({
                    name: 'yb.supplierlis',
                    query:{
                        guid:scope.row.guid
                    }
                })
            // }else{
            //     return false;
            // }
        },
        goSchool(scope){
            // if(scope.row.typeName != "配送商"){
                sessionStorage.setItem('monitDate', this.transferData.date);
                this.$router.push({
                    name: 'yb.schoollis',
                    query:{
                        guid:scope.row.guid
                    }
                })
            // }else{
            //     return false;
            // }
        },
        down(){
            // let form = new FormData();
            // form.append('state',this.Single);
            // form.append('date',this.transferData.date);
            // form.append('areaId',this.transferData.areaId);
            // form.append('type',this.transferData.type);
            // form.append('isSeller',this.isSeller);
            // plan.down(form).then(d => {
            //     debugger
            // })
            var a = 'http://172.16.4.24:8081/govapi/sub/exportSub?state=' + this.Single + '&date=' + this.transferData.date + '&areaId=' + this.transferData.areaId + '&type=' + this.transferData.type + '&isSeller=' + this.isSeller
            // debugger
        }
    },
    mounted() {
        console.log(this.$store.state.common)
        if(this.count.length >= 6){
            this.transferData.areaId = this.count.slice(0,6);
        } else {
            this.transferData.areaId = this.count;
        }

        if (sessionStorage.getItem('monitDate')) {
            this.seldate = sessionStorage.getItem('monitDate');
            this.transferData.date = sessionStorage.getItem('monitDate');
        } else{
            this.getdate();
            this.seldate = this.transferData.date;            
        }
        this.gettransferData();
        this.getPageData();
        this.down();
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
                type:'普通模式',
                key:'normal'
            },{
                type:'学校模式',
                key:'allSchool'
            }],
            typeName:0,
            mess:{
                choose:0
            },
            page: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            transferData:{
                areaId:'510',
                type:'normal',
                date:null
            },
            dataLis:{},
            dataPage:[],
            subName:'',
            Single:'all',
            isSeller:'FALSE'
        };
    },
    components: {

    }
}
</script>

<style scoped>
    .bigbox{
        position: relative;
        height: 100%;
    }
    .dateBox{
        position: absolute;
        top: 43px;
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
        margin: 20px 0;
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
        width: 60%;
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
    .etable tr td:first-child{
        text-align: left;
    }
</style>

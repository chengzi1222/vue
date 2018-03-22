<template>
    <div class="bigbox">
    	<div class="page-tilt">
    	    <b></b><span>检测汇总</span>
    	</div>
        <div class="dateBox">
            <el-select class="w130" style="margin-right: 10px;" v-model="transferData.pattern" @change="pattern" placeholder="请选择">
                <el-option
                  v-for="item in peisong"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                </el-option>
            </el-select>
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
                :class="index==mess.choose?'li-bott':''" @click="choose(index,item.type)">
                <div :data-index='index'><span :class="index==mess.choose?'li-span':''">{{item.name}}</span><span>{{item.num}}</span></div>
            </li>
            <li class="tab-bott"></li>
        </ul>
        <div>
            <el-input placeholder="请输入配送商" class="w260 seekIpt" v-model="subName" @keyup.enter.native ="seekEnter()">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getPageData"></i>
            </el-input>
            <el-button class="w100 dc" type="primary">导出</el-button>
        </div>
        <el-table :data="dataPage" class="table-div">
            <el-table-column show-overflow-tooltip min-width='50' label="序号">
                <template slot-scope="scope">
                    {{(pageObj.pageSize * (pageObj.pageNumber - 1) + scope.$index + 1)}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width='250' prop="seller" label="配送商" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip label="检测日期">
                <template slot-scope="scope">
                    {{transferData.date}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="allNum" v-if="this.transferData.type == 'all'" label="检测批次"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="this.transferData.type == 'pass' || this.transferData.type == 'all'" label="合格批次" key="as">
                <template slot-scope="scope">
                    <span class="movePoin" style="color: #66d6a2;" @click="go(scope.row,$event)">{{scope.row.pass}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-if="this.transferData.type == 'unPass' || this.transferData.type == 'all'" label="不合格批次" key="ad">
                <template slot-scope="scope">
                    <span class="movePoin" style="color: #fa503b;" @click="go(scope.row,$event)">{{scope.row.unPass}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="result" v-if="this.way" label="检测结果"></el-table-column>
            <el-table-column show-overflow-tooltip prop="way" v-if="this.way" label="处理结果"></el-table-column>
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
import * as plan from "api/trace/supervise"
export default {
    methods: {
        //切换导航样式
        choose(index,type) {
            this.mess.choose = index;
            this.transferData.type = type;
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
            form.append('date',this.transferData.date);
            form.append('isSeller',this.transferData.pattern);
            plan.postSum(form).then(d => {
                let numDatas = JSON.stringify(d.data).substring(1,JSON.stringify(d.data).length -1).split(',');//JSON对象转数组
                for(let i = 0; i<numDatas.length;i++){
                    if(numDatas[i].split(':')[1] == 'null'){
                        this.patternLis[i].num = 0;
                    }else{
                        this.patternLis[i].num = numDatas[i].split(':')[1];
                    }
                }
            })
        },
        //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('sellerName',this.subName);
            form.append('areaId',this.transferData.areaId);
            form.append('date',this.transferData.date);
            form.append('pageNumber',this.page.pageNum);
            form.append('pageSize',this.page.pageSize);
            form.append('type',this.transferData.type);
            form.append('isSeller',this.transferData.pattern);
            plan.postDspage(form).then(d => {
                if (d.data.length != 0 && d.data[0].way) {
                    this.way = true;
                } else {
                    this.way = false;
                }
                this.dataPage = d.data;
                this.page.total = d.pageObj.totalRecords;
                this.pageObj = d.pageObj;
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
        //改变日期
        singleDate(){
            this.getdate(this.seldate);
            this.gettransferData();
            this.getPageData();
        },
        //改变模式
        pattern(){
            this.gettransferData();
            this.getPageData();
        },
        //搜索框搜索
        seekEnter(){
            this.getPageData();
        },
        go(row,e){
            let num = 0,
                _type = '';
            if (this.transferData.type == 'pass') {
                num = row.pass;
                _type = 'pass';
            } else if(this.transferData.type == 'unPass'){
                num = row.unPass;
                _type = 'unPass';
            } else if (this.transferData.type == 'all') {
                debugger
                num = e.target.textContent - 0;
                if(row.pass == num){
                    _type = 'pass';           
                }else if(row.unPass == num){
                    _type = 'unPass';             
                }
            }
            sessionStorage.setItem('gatherDate', this.transferData.date);
            this.$router.push({
                name:'yb.pass',
                query:{
                    name:row.seller,
                    sellerCode:row.sellerCode,
                    type:_type,
                    date:this.transferData.date,
                    num:num,
                    isSeller:this.transferData.pattern
                }
            })
        }
    },
    mounted() {
        if(this.count.length >= 6){
            this.transferData.areaId = this.count.slice(0,6);
        } else {
            this.transferData.areaId = this.count;
        }
        if (sessionStorage.getItem('gatherDate')) {
            this.seldate = sessionStorage.getItem('gatherDate');
            this.transferData.date = sessionStorage.getItem('gatherDate');
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
            way:false,
            seldate:null,
            patternLis:[{
                name:'检测批次',
                type:'all',
                num:0
            },{
                name:'合格批次',
                type:'pass',
                num:0
            },{
                name:'不合格批次',
                type:'unPass',
                num:0
            }],
            peisong:[{
                name:'配送商模式',
                type:'TRUE'
            },{
                name:'采购商模式',
                type:'FALSE'
            }],
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
                type:'all',
                date:null,
                pattern:'TRUE'
            },
            dataPage:null,
            subName:'',
            pageObj:null
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
        top: 43px;
        right: 0;
        z-index: 666;
    }
    .tab-box {
        width: 100%;
        display: flex;
        position: relative;
        margin-bottom: 20px;
    }
    .tab-box .tabLi {
        width: 128px;
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
    .tab-box .li-span{
        color: #393939;
    }
    .tab-box span:first-child{
        margin-right: 10px;
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
    }  border-right: 1px solid #C2CAD2;
</style>

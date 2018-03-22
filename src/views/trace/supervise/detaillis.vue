<template>
    <div class="bigbox">
        <div class="page-tilt">
            <b></b><span>订单明细</span><Back></Back>
        </div>
        <div style="margin-top: 30px;">
            <el-input placeholder="请输入配送商、订单编号" class="w260 seekIpt" v-model="subName" @keyup.enter.native ="seekEnter()">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getPageData"></i>
            </el-input>
            <el-button class="w100 dc" type="primary">导出</el-button>
        </div>
        <el-table :data="dataPage" class="table-div pointerTab" @row-click="go">
            <el-table-column show-overflow-tooltip prop="pdtName" min-width="100" label="品种" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip min-width="100" label="数量">
                <template slot-scope="scope">
                    {{scope.row.orderWeight}}{{scope.row.unit}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="120" label="来源" align="left">
                <template slot-scope="scope">
                    <span v-if="scope.row.sourceName == null">未填写</span>
                    <span v-if="scope.row.sourceName != null">{{scope.row.sourceName}}</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="detecResult" min-width="120" label="检测结果"></el-table-column>
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
import Back from 'utils/back.vue'       //返回上一个页面按钮
export default {
    methods: {
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
        //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('guid',this.guid);
            form.append('pdtName',this.subName);
            form.append('date',this.transferData.date);
            form.append('pageSize',this.page.pageSize);
            form.append('pageNumber',this.page.pageNum);
            plan.postOdpagePage(form).then(d => {
                this.dataPage = d.data;
                this.page.total = d.pageObj.totalRecords;
            });
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
            this.getPageData();
        },
        //搜索框搜索
        seekEnter(){
            this.getPageData();
        },
        go(row){
            this.$router.push({
                name: 'yb.source',
                query:{
                    Orderguid:this.guid,
                    DetailGuid:row.guid
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
        this.guid = this.$route.query.Orderguid;
        this.monguid = this.$route.query.guid;
        this.getdate();
        this.seldate = this.transferData.date;
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
            dataPage:[],
            subName:'',
            guid:'',
            monguid:''
        };
    },
    components: {
      Back
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

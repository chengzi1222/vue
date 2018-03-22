<template>
    <div class="bigbox">
        <div class="page-tilt">
            <b></b><span>学校列表</span><Back></Back>
        </div>
        <div>
            <el-input placeholder="请输入配送商名称" class="w260 seekIpt" v-model="subName" @keyup.enter.native ="seekEnter()">

                <i slot="suffix" class="el-input__icon el-icon-search" @click="getPageData"></i>
            </el-input>
            <el-button class="w100 dc" type="primary">导出</el-button>
        </div>
        <el-table :data="dataPage" class="table-div pointerTab">
            <el-table-column show-overflow-tooltip min-width="50" label="序号">
                <template slot-scope="scope">
                    {{(pageObj.pageSize * (pageObj.pageNumber - 1) + scope.$index + 1)}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="subName" min-width="150" label="配送商名称" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="address" min-width="150" label="地址" align="left"></el-table-column>
            <el-table-column show-overflow-tooltip prop="legalPerson" min-width="120" label="责任人"></el-table-column>
            <el-table-column show-overflow-tooltip prop="tel" min-width="120" label="手机号"></el-table-column>
            <el-table-column show-overflow-tooltip min-width="120" label="最近下单时间">
                <template slot-scope="scope">
                    <span v-if="scope.row.date != 'null'">{{scope.row.date}}</span>
                    <span v-else>--</span>
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
import * as plan from "api/trace/supervise"
import Back from 'utils/back.vue'       //返回上一个页面按钮
export default {
    methods: {
        //转换参数类型，请求分页数据
        getPageData(){
            let form = new FormData();
            form.append('guid',this.guid);
            form.append('type','deliver');
            form.append('subName',this.subName);
            form.append('pageSize',this.page.pageSize);
            form.append('pageNumber',this.page.pageNum);
            plan.postRelationpage(form).then(d => {
                console.log(d)
                if(d.data){
                    this.dataPage = d.data;
                    this.pageObj = d.pageObj;
                    this.page.total = d.pageObj.totalRecords;
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
        //搜索框搜索
        seekEnter(){
            this.getPageData();
        }
    },
    mounted() {
        this.guid = this.$route.query.guid;
        this.getPageData();
    },
    data() {
        return {
            page: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            },
            dataPage:null,
            subName:'',
            guid:'',
            pageObj:null,
        };
    },
    components: {
      Back
    }
}
</script>

<style scoped>
    .titName{
        font-size: 18px;
        color: #393939;
        margin-top: 20px;
    }
    .page-tilt{
        margin-bottom: 20px;
    }
    .fle{
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        box-sizing: border-box;
        border: 1px solid #C2CAD2;        
    }
    .variety{
        width: 63%;
    }
    .variety div{
        width: 25%;
        height: 50px;
    }
    .ordernum{
        width: 35%;
    }
    .ordernum div{
        width: 50%;
    }
    .dataBox{
        display: flex;
        margin: 20px 0 30px;
        justify-content: space-between;
        height: 90px;
    }
    .dataBox div{
        text-align: center;
    }
    .dataBox h3{
        font-size: 28px;
        color: #3B3B3B;
        line-height: 35px;
    }
    .dataBox p{
        font-size: 14px;
        color: #A2AAB6;
    }
    .dc{
        float: right;
    }
    .datebox{
        margin-right: 20px;
    }



    .bigbox{
        position: relative;
    }
    .tab-box {
        width: 100%;
        display: flex;
        position: relative;
    }
    .tab-box li {
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
    .dining{
        width: 60%;
        display: flex;
        justify-content: space-between;
    }
    .dining div{
        border: none;
        width: 33.33%;
    }
    .table-div{
        margin: 20px 0;
        text-align: center;
    }
    .pagination-box {
        text-align: right;
        margin-top: 20px;
    }
    .riBorder{
        border-right: 1px solid #C2CAD2;
    }
</style>
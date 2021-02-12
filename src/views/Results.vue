<template>
    <div id="app">
        <div class="table-header">

            <div class="table-search">
                <el-input
                        @change="searchUser"
                        v-model="search"
                        size="mini"
                        @input="searchInput"
                        placeholder="输入姓名搜索"/>
            </div>
        </div>
        <el-table
                :data="tableData"
                @sort-change="changeSort"
                style="width: 100%">
            <el-table-column
                    label="姓名"
                    width="100">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input

                                v-model="scope.row.name"
                                size="mini"
                                placeholder="输入姓名"/>
                    </div>

                </template>
            </el-table-column>
            <el-table-column
                    label="单杠"
                    prop="high_bar"
                    sortable="custom"
                    width="80">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.high_bar" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="双杠"
                    prop="parallel_bars"
                    sortable="custom"
                    width="80">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.parallel_bars" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="三公里"
                    prop="tree_kilometers"
                    sortable="custom"
                    width="100">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.tree_kilometers" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="枪械拆装"
                    prop="gun_dis"
                    sortable="custom"
                    width="100">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.gun_dis" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="快速装填子弹"
                    prop="rapid_reload"
                    sortable="custom"
                    width="130">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.rapid_reload" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="十秒防护"
                    prop="ten_protection"
                    sortable="custom"
                    width="100">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.ten_protection" size="mini"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="30×2折返跑"
                    prop="run"
                    sortable="custom"
                    width="130">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.run" size="mini"/>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    label="日期"
                    prop="date"
                    sortable="custom"
                    width="180">
                <template slot-scope="scope">
                    <div class="table-input">
                        <el-input v-model="scope.row.date" size="mini"/>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">保存
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @prev-click="currentChange"
                    @next-click="currentChange"
                    @current-change="currentChange"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page:1,
                count:0,
                search:"",
                searchData:[],
                searchCount:0,
                searchPage:1,
                isOrder:false,
                tableData: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            changeSort( column ){
                this.page = 1;
                if(column.order) {
                    this.isOrder=true
                    this.$http.get('/result/getResults',{params:{
                            page:this.page,
                            order:column.order,
                            prop:column.prop
                        }}).then((res)=>{
                        if(res.data.code==200){
                            this.tableData=res.data.data.list;
                            this.count=res.data.data.count;
                        }else{
                            this.$message({
                                message: '获取数据失败',
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    this.isOrder=false
                    this.getData();
                }
            },
            getData(){
                this.$http.get(`/result/getResults?page=${this.page}`).then((res)=>{
                    if(res.data.code==200){
                        this.tableData=res.data.data.list;
                        this.count=res.data.data.count;
                    }else{
                        this.$message({
                            message: '获取数据失败',
                            type: 'warning'
                        });
                    }
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$http.post('/result/addResult',row).then((res)=>{
                    if(res.data.code==200){
                        this.$message({
                            message: '提交成功',
                            type:"success"
                        });
                    }else{
                        this.$message({
                            message: '提交失败',
                            type: 'warning'
                        });
                    }
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$http.get(`/result/delResult?Id=${row['_id']}`).then((res)=>{
                    if(res.data.code==200){
                        this.tableData.splice(index,1);
                        this.$message({
                            message: '删除成功',
                            type:"success"
                        });
                    }else{
                        this.$message({
                            message: '获取数据失败',
                            type: 'warning'
                        });
                    }
                })
            },
            addResult(index, row){
                console.log(index,row)
                this.form.name=row.name;
                this.form._id=row._id;
                this.form.date=new Date().Format();
                this.dialogFormVisible=true;
            },
            // 搜索
            searchUser(value){
                if(value.length===0){
                    this.$message({
                        message:"空的怎么搜索呢",
                        type:"warning"
                    })
                    return ;
                }
                this.searchPage=this.page;
                this.page=1;
                this.$http.post('/result/searchResult',{"name":value,"page":this.page}).then((res)=>{
                    if(res.data.code==200){
                        this.searchData=this.tableData;
                        this.searchCount=this.count;
                        this.tableData=res.data.data.list;
                        this.count=res.data.data.count;
                        this.$message({
                            message: '搜索成功',
                            type:"success"
                        });
                    }else{
                        this.$message({
                            message: '获取数据失败',
                            type: 'warning'
                        });
                    }
                })
            },
            searchInput(e){
                if(e.length===0){
                    this.tableData=this.searchData;
                    this.count=this.searchCount;
                    this.page = this.searchPage;
                    this.searchData=[];
                    this.searchCount=0;
                    this.searchPage=1;
                }
            },
            currentChange(page){
                this.page=page;
                this.isOrder?this.changeSort():this.getData();
            }

        }
    }
</script>

<style scoped>
    .table-header{
        display: flex;
    }
    .table-search{
        width: 200px;
        height: 35px;
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    .table-search el-input{
        height: 100%;
        padding: 0;
    }
    .page{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }
    .table-input >>> .el-input__inner{
        border: 1px solid #fff!important;
    }
</style>

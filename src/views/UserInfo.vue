<template>
    <div id="app">
        <div class="table-header">
            <el-button size="mini" @click="addUser">添加成员</el-button>
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
<!--            <el-table-column-->
<!--                    label="测试次数"-->
<!--                    width="150">-->
<!--                <template slot-scope="scope">-->
<!--                    <div class="table-input">-->
<!--                        <el-input-->

<!--                                v-model="scope.row.times"-->
<!--                                size="mini"-->
<!--                                placeholder="输入测试次数"/>-->
<!--                    </div>-->
<!--                </template>-->
<!--            </el-table-column>-->

            <el-table-column
                    label="日期"
                    width="180">
                <template slot-scope="scope">
                    <div class="table-input">
                    <el-input

                            v-model="scope.row.date"
                            size="mini"
                            placeholder="输入日期"/>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="addResult(scope.$index, scope.row)">添加成绩
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">保存
                    </el-button>
                    <el-button
                            size="mini"
                            @click="passEdit(scope.$index, scope.row)">修改密码
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
        <el-dialog title="添加成绩" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="名字" :label-width="formLabelWidth" hidden>
                    <el-input v-model="form['_id']" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="名字" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="单杠" :label-width="formLabelWidth">
                    <el-input v-model="form.high_bar" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="双杠" :label-width="formLabelWidth">
                    <el-input v-model="form.parallel_bars" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="三公里" :label-width="formLabelWidth">
                    <el-input v-model="form.tree_kilometers" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="枪械拆装" :label-width="formLabelWidth">
                    <el-input v-model="form.gun_dis" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="快速装填子弹" :label-width="formLabelWidth">
                    <el-input v-model="form.rapid_reload" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="十秒防护" :label-width="formLabelWidth">
                    <el-input v-model="form.ten_protection" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="30×2折返跑" :label-width="formLabelWidth">
                    <el-input v-model="form.run" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendResult">确 定</el-button>
            </div>
        </el-dialog>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                search:"",
                page:1,
                count:0,
                dialogFormVisible:false,
                formLabelWidth:'120px',
                form:{
                    date: '',
                    name: '',
                    high_bar: '',    // 单杠
                    parallel_bars: '',   // 双杠
                    tree_kilometers: "", // 三公里
                    gun_dis: "",    // 枪械拆装
                    rapid_reload: "", // 快速装填子弹
                    ten_protection: "",    // 十秒防护
                    run: "",         // 30×2折返跑
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    times: 5,    // 测试次数
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    times: 5,    // 测试次数
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    times: 5,    // 测试次数
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    times: 5,    // 测试次数
                },{
                    date: '2016-05-02',
                    name: '王小虎',
                    times: 5,    // 测试次数
                }],
                searchData:[],
                searchCount:0,
                searchPage:1,
            }
        },
        computed:{

        },
        mounted() {
            this.getData();
        },
        methods: {
            passEdit(index, row){
                console.log(index, row);
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$http.post('/user/updatePass',{Id:row['_id'],password:value})
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            sendResult(){
                this.$http.post("/result/addResult",this.form).then((res)=>{
                    if(res.data.code==200){
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.dialogFormVisible=false;
                        for(let item in this.form){
                            this.form[item]='';
                        }
                    }else{
                        this.$message({
                            message: '获取数据失败',
                            type: 'warning'
                        });
                    }
                })
            },
            getData(){
                this.$http.get(`/user/getUser?page=${this.page}`).then((res)=>{
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
                this.$http.post('/user/addUser',row).then((res)=>{
                    if(res.data.code==200){
                        res.data.data['_id']?this.$set(this.tableData,index,res.data.data):'';
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
                this.$http.get(`/user/delUser?Id=${row['_id']}`).then((res)=>{
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
                this.form.date=new Date().Format();
                this.dialogFormVisible=true;
            },
            // 添加成员
            addUser(){
                this.tableData.unshift({
                    date: new Date().Format(),
                    name: '',
                    times: 0,    // 测试次数
                })
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
                this.$http.post('/user/searchUser',{"name":value,"page":this.page}).then((res)=>{
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
                this.getData();
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

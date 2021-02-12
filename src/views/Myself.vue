<template>
    <div id="app">
        <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <el-table-column
                    label="姓名"
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="单杠"
                    prop="high_bar"
                    sortable
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.high_bar }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="双杠"
                    prop="parallel_bars"
                    sortable
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.parallel_bars }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="三公里"
                    prop="tree_kilometers"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tree_kilometers }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="枪械拆装"
                    prop="gun_dis"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.gun_dis }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="快速装填子弹"
                    prop="rapid_reload"
                    sortable
                    width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.rapid_reload }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="十秒防护"
                    prop="ten_protection"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ten_protection }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="30×2折返跑"
                    prop="run"
                    sortable
                    width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.run }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                   >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search:"",
                tableData: []
            }
        },
        mounted() {
            this.getResults();
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            changeSort(column,prop,order ){
                console.log( column, prop, order )
            },
            getResults(){
                this.$http.get('/user/getResults').then((res)=>{
                  if(res.data.code==200){
                      this.tableData=res.data.data;
                  }else{
                      this.$message({
                          message: '获取失败',
                          type: 'error'
                      });
                  }
                })
            },
            // 添加成绩
            addResults(){

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
</style>

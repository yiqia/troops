<template>
    <div id="app">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="姓名"
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="单杠"
                    sortable
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.high_bar }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="双杠"
                    sortable
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.parallel_bars }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="三公里"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tree_kilometers }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="枪械拆装"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.gun_dis }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="快速装填子弹"
                    sortable
                    width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.rapid_reload }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="十秒防护"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ten_protection }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="30×2折返跑"
                    sortable
                    width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.run }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="日期"
                    sortable
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    high_bar: 20,    // 单杠
                    parallel_bars: 30,   // 双杠
                    tree_kilometers: "2:30", // 三公里
                    gun_dis: "2:30",    // 枪械拆装
                    rapid_reload: "2:12", // 快速装填子弹
                    ten_protection: "10",    // 十秒防护
                    run: "3:20",         // 30×2折返跑
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    high_bar: 20,    // 单杠
                    parallel_bars: 30,   // 双杠
                    tree_kilometers: "2:30", // 三公里
                    gun_dis: "2:30",    // 枪械拆装
                    rapid_reload: "2:12", // 快速装填子弹
                    ten_protection: "10",    // 十秒防护
                    run: "3:20",         // 30×2折返跑
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    high_bar: 20,    // 单杠
                    parallel_bars: 30,   // 双杠
                    tree_kilometers: "2:30", // 三公里
                    gun_dis: "2:30",    // 枪械拆装
                    rapid_reload: "2:12", // 快速装填子弹
                    ten_protection: "10",    // 十秒防护
                    run: "3:20",         // 30×2折返跑
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    high_bar: 20,    // 单杠
                    parallel_bars: 30,   // 双杠
                    tree_kilometers: "2:30", // 三公里
                    gun_dis: "2:30",    // 枪械拆装
                    rapid_reload: "2:12", // 快速装填子弹
                    ten_protection: "10",    // 十秒防护
                    run: "3:20",         // 30×2折返跑
                },]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
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

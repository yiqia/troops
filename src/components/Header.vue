<template>
    <div id="app">

            <div class="header-left">
                <img src="../assets/logo.jpg" alt="" style="">
                <h2>执勤十七中队训练成绩管理系统</h2>
            </div>
            <div>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px;color: #fff"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </div>

    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header-left{
        display: flex;
        align-items: center;
    }
    .header-left img{
        height: 100%;
    }
    #app{
        display: flex;
        justify-content: space-between;
    }
</style>

<template>
        <el-menu :default-openeds="['1', '2']" router>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>账号管理</template>
                <el-menu-item index="userInfo" route="/userInfo">个人信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>成绩管理</template>
                <el-menu-item index="/" route="/">个人成绩</el-menu-item>
                <el-menu-item index="results" route="/results">集体成绩</el-menu-item>
            </el-submenu>

        </el-menu>

</template>

<script>
    export default {
        name: "Nav",
    }
</script>

<style>

</style>

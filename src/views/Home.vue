<template>
    <el-container style=" border: 1px solid #eee">
        <el-header style="font-size: 12px">
            <Header></Header>
        </el-header>

        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <Nav></Nav>
            </el-aside>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Header from '../components/Header.vue'
    import Nav from '../components/Nav'
    export default {
        name:"App",
        data() {
            return {

            }
        },
        components:{
            Header,
            Nav
        }
    };
</script>
<style>
    #app{
        width: 100%;
        height: 100%;
    }

    .el-header {
        background-color: #ee1621;
        color: #fff;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>


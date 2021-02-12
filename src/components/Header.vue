<template>
    <div id="app">

            <div class="header-left">
                <img src="../assets/logo.jpg" alt="" style="">
                <h2>执勤十七中队训练成绩管理系统</h2>
            </div>
            <div>
                <el-dropdown  @command="outLogin">
                    <i class="el-icon-setting"  style="margin-right: 15px;color: #fff"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{userInfo.name}}</span>
            </div>

    </div>
</template>

<script>
    import router from "../router";
    export default {
        name: "Header",
        data(){
            return {
                userInfo:{}
            }
        },
        mounted() {
            this.userInfo=JSON.parse(localStorage.getItem('user'));
        },
        methods:{
            outLogin(e){
                console.log(e);
                localStorage.clear();
                router.push('/login')
            }
        }
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

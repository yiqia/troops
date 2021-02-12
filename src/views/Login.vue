<template>
    <div class="login-container">
        <el-form ref="form" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">管理系统</h2>
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import router from "../router";

    export default {
        data() {
            return {
                form: {
                    name: "",
                    password: ""
                }
            };
        },
        methods: {
            onSubmit() {
                this.$http.post('/admin/login',this.form).then((res)=>{
                  if(res.data.code===200){
                      this.$message({
                          message: '登录成功',
                          type:"success"
                      });

                      this.$cookie.set('token', res.data.data.token,7);
                      localStorage.setItem('user',JSON.stringify(res.data.data));
                      setTimeout(()=>{
                          if(res.data.data.power===1){
                              router.push("/userInfo")
                          }else{
                              router.push("/myself")
                          }
                      },1000)
                  }else{
                      this.$message({
                          message: res.data.msg,
                          type:"error"
                      });
                  }
                })
                console.log("submit!");
            }
        }
    };
</script>

<style scoped>
    .login-form {
        width: 350px;
        margin: 200px auto; /* 上下间距160px，左右自动居中*/
        background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
        padding: 30px;
        border-radius: 20px; /* 圆角 */
    }

    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../assets/bg.png");
        background-size: 100% 100%;
        background-repeat:no-repeat;
    }

    /* 标题 */
    .login-title {
        color: #303133;
        text-align: center;
    }
</style> -->

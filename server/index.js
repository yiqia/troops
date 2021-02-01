/*
    @author: 付伟琪
    @function：
    @date 2021-01-30 22:32
*/
const express = require('express');
const url  = require('url');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(require('cors')());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


const userRouter = require('./router/User')
const resultRouter = require('./router/Results')
const loginRouter = require('./router/Login')


app.use(
    session({
        secret: 'menghui', //字符串加密
        resave: false,
        name: 'MHBBSDATA' /*保存在本地cookie的一个名字 默认MHBBSDATA  可以不设置*/,
        cookie: { maxAge: 86400000, secure: false }, //过期时间
        saveUninitialized: true, //无论是否使用,都默认使用,强制将未初始化的 session 存储。  默认值是true  建议设置成true
        rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    })
);


app.use('/sigin',loginRouter)
app.use('/user',(req,res,next)=>{
    console.log(123)
    next()
    console.log(1)
})
app.use('/user',userRouter)
app.use('/result',resultRouter)




app.get('/',async (req,res)=>{
    res.send('hello')
})

app.listen(3001,()=>{
    console.log('http://localhost:3001/')
})

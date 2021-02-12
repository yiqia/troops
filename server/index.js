/*
    @author: 付伟琪
    @function：
    @date 2021-01-30 22:32
*/
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(require('cors')());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const adminRouter = require('./router/Admin')
const userRouter = require('./router/User')
const resultRouter = require('./router/Results')
const loginRouter = require('./router/Login')



app.use('/sign',loginRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/result',resultRouter)




app.get('/',async (req,res)=>{
    res.send('hello')
})

app.listen(3001,()=>{
    console.log('http://localhost:3001/')
})

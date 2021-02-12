/*
    @author: 付伟琪
    @function：
    @date 2021-02-01 10:02
*/
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const {User} = require('../db/User')

router.post('/login',async (req,res)=>{
    let md5 = crypto.createHash("md5"); // 创建 md5
    let md5Sum = md5.update(req.body.password); // update 加密
    let password = md5Sum.digest('hex'); // 获取加密后结果
    const data = await User.findOne({'name':req.body.name,'password':password},{password:0});
    console.log("查看"+JSON.stringify(req.session.user));
    if(data){
        req.session.user = {
            Id: data._id,
            name: data.name,
            power:data.power
        };
        console.log(req.session)
        console.log("设置"+JSON.stringify(req.session.user));
        res.json({
            code: 200,
            msg: 'ok',
            data: data,
        });
    }else{
        res.json({
            code: 400,
            msg: '密码或账号错误',
            data: null,
        });
    }

})


module.exports = router;

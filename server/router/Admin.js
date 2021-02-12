/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 11:42
*/
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const {User} = require('../db/User')

// 管理员操作 检测管理是否登录!
router.use(async (req, res, next) => {
    if(req.path==="/login"){
        next();
    }else{
        const user = await User.findOne({'token':req.cookies['token']});
        if (user) {
           if (user.power == 1) {
                next();
            } else {
                res.status(500).json({
                    code: 10001,
                    msg: '权限不足,无法访问!!',
                    data: null,
                });
            }
        } else {
            res.status(401).json({
                code: 10002,
                msg: '未登录,无法访问!!',
                data: null,
            });
        }
    }

});

router.post('/login',async (req,res)=>{
    let md5 = crypto.createHash("md5"); // 创建 md5
    let md5Sum = md5.update(req.body.password); // update 加密
    let password = md5Sum.digest('hex'); // 获取加密后结果
    const data = await User.findOne({'name':req.body.name,'password':password},{password:0});
    if(data){
        let tokenCreate = crypto.createHash("md5");
        let range = Math.random()*1000+(new Date).getTime()+data['_id'];
        let tokenMd5 = tokenCreate.update(range); // update 加密
        let token = tokenMd5.digest('hex');
        await User.updateOne({'_id':data['_id']},{'token':token});
        data.token = token;
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

router.post('/updatePass',async (req,res)=>{
    let md5 = crypto.createHash("md5"); // 创建 md5
    let md5Sum = md5.update(req.body.password); // update 加密
    let password = md5Sum.digest('hex'); // 获取加密后结果
    const result = await User.updateOne({'_id':req.body['Id']},{password:password});
    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });
})

router.post('/addUser',async (req,res)=>{
    let result = null;
    if(req.body['_id']){
        const Id = req.body['_id'];
        delete req.body['_id'];
        result = await User.updateOne({'_id':Id},req.body);
    }else{
        let md5 = crypto.createHash("md5"); // 创建 md5
        let md5Sum = md5.update("123456"); // update 加密
        let password = md5Sum.digest('hex'); // 获取加密后结果
        req.body.password=password;
        result = await User.create(req.body);
    }

    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });
})
router.get('/getUser',async (req,res)=>{
    console.log()
    const start = req.query.page>0?req.query.page-1:req.query.page;
    const result = await Promise.all([
        User.count(),
        User.find({},{password:0}).skip(start*10).limit(10)
    ]);
    res.json({
        code: 200,
        msg: 'ok',
        data: {
            count: result[0],
            list: result[1]
        },
    });
})
router.get('/delUser',async (req,res)=>{
    const Id = req.query['Id'];
    const result = await User.findOneAndDelete({'_id':Id})
    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });
})
router.post('/searchUser',async (req,res)=>{
    const start = req.body.page>0?req.body.page-1:req.body.page;
    const reg = new RegExp(req.body.name, 'i')
    const result = await Promise.all([
        User.find({'name':reg}).count(),
        User.find({'name':reg}).skip(start*10).limit(10)
    ]);
    res.json({
        code: 200,
        msg: 'ok',
        data: {
            count: result[0],
            list: result[1]
        }
    });
})



module.exports = router;

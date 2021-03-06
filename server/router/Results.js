/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 13:59
*/
const express = require('express');
const router = express.Router();
const {Results} = require('../db/Results')
const {User} = require('../db/User')

router.use(async (req, res, next) => {
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


});

router.post('/addResult',async (req,res)=>{
    let result = null;
    if(req.body['_id']){
        const Id = req.body['_id'];
        delete req.body['_id'];
        result = await Results.updateOne({'_id':Id},req.body);
    }else{
        result = await Results.create(req.body);
    }

    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });
})

router.get('/getResults',async (req,res)=>{
    const start = req.query.page>0?req.query.page-1:req.query.page;
    let result = null;
    let orderName = req.query.order!=='ascending'?"desc":"asc";
    let propName = req.query.prop;
    const ordRule={};
    ordRule[propName]=orderName;
    console.log(propName,orderName,ordRule)
    if( propName && orderName){
        result = await Promise.all([
            Results.count(),
            Results.find().sort(ordRule).skip(start*10).limit(10)
        ]);
    }else{
        result = await Promise.all([
            Results.count(),
            Results.find().skip(start*10).limit(10)
        ]);
    }

    res.json({
        code: 200,
        msg: 'ok',
        data: {
            count: result[0],
            list: result[1]
        },
    });
})

router.get('/delResult',async (req,res)=>{
    const Id = req.query['Id'];
    const result = await Results.findOneAndDelete({'_id':Id})
    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });
})
router.post('/searchResult',async (req,res)=>{
    const start = req.body.page>0?req.body.page-1:req.body.page;
    const reg = new RegExp(req.body.name, 'i')
    const result = await Promise.all([
        Results.find({
            $or : [ //多条件，数组
                {name : {$regex : reg}},
                {date : {$regex : reg}}
            ]
        }).count(),
        Results.find({
            $or : [ //多条件，数组
                {name : {$regex : reg}},
                {date : {$regex : reg}}
            ]
        }).skip(start*10).limit(10)
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

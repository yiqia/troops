/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 11:42
*/
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const {User} = require('../db/User')
const {Results} = require('../db/Results')


router.use(async (req, res, next) => {
    const user = await User.findOne({'token':req.cookies['token']});
    if (user) {
        next();
    } else {
        res.status(401).json({
            code: 10002,
            msg: '未登录,无法访问!!',
            data: null,
        });
    }
});

router.get('/getResults',async (req,res)=>{
    const user = await User.findOne({'token':req.cookies['token']});
    console.log(user)
    let result = await Results.find({"name":user['name']});
    res.json({
        code: 200,
        msg: 'ok',
        data: result,
    });

})






module.exports = router;

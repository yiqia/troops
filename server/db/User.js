/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 11:17
*/
const mongoose = require('mongoose')
const db = require('../config/mongodb');

const User = mongoose.model('User',new mongoose.Schema({
    name:{type:String},
    password:{type:String},
    times:{type:Number},
    power:{
        type:Number,
        default:0
    },
    date:{type:String},
    token:{type:String}
}))

module.exports={
    User
}

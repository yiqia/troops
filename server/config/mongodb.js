/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 11:40
*/
const mongoose = require('mongoose')
const query = mongoose.connect('mongodb://localhost:27017/troops',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
module.exports={
    query
}

/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 13:59
*/
const mongoose = require("mongoose");
require("../config/mongodb");
const Results = mongoose.model("Results", new mongoose.Schema({
    name: {type: String},
    high_bar: {type: String},
    parallel_bars: {type: String},
    tree_kilometers: {type: String},
    gun_dis: {type: String},
    rapid_reload: {type: String},
    ten_protection: {type: String},
    run: {type: String},
    date: {type: String}
}));

module.exports = {
    Results
};

var mongoose = require('mongoose');
var movieSchema  = require("../schemas/movie")
var Movie = mongoose.model('Movie', movieSchema);//根据模式来生成模型

module.exports = Movie;

var mongoose = require('mongoose');
var UserSchema  = require("../schemas/user")
var User = mongoose.model('User', UserSchema);//根据模式来生成模型

module.exports = User;

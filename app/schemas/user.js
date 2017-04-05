var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs')
var SALT_WORK_FACTOR=10;
var UserSchema = new mongoose.Schema({
    name: {
        unique:true,
        type: String
    },
    password: {
        type: String
    },
    //0:normal
    //1:verified user
    //2:professional user
    //>10:admin
    role:{
        type:Number,
        default:0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {//pre是一个中间件来的，当触发data事件时会执行该函数
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){//第一个参数计算强度
        if(err) return next(err)
        console.log("password"+user.password)
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err) return next(err)
        console.log("password"+hash)
            user.password=hash;
            next()
        })
    })
})


UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}

//静态方法在Model层就能使用
UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})//取出数据库的所有的数据
            .sort('meta.updateAt')//根据影片的更新时间来排序
            .exec(cb);//执行回调函数
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);//执行回调函数
    }
}

module.exports = UserSchema;





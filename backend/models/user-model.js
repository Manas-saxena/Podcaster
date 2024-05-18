const mongoose = require('mongoose')

const schema = mongoose.Schema;

const userSchema = new schema({
    phone:{type:String, required:true},
    activated:{type:Boolean , default:false,required:false},
    name:{type:String,required:false},
    avatar:{type:String,required:false}
},{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema, 'users')
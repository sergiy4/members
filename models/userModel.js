const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name:{
        type:String,
        minLength:1,
        maxLength:100,
        required:true,
    },
    last_name:{
        type:String,
        minLength:1,
        maxLength:100,
        required:true,
    },
    username:{
        type:String,
        minLength:1,
        maxLength:100,
        required:true,
    },
    password:{
        type:String,
        minLength:5,
        maxLength:100,
        required:true,
    },
    member:{
        type:Boolean,
        default:false,
        required:true,
    }
})

UserSchema.virtual('url').get(function(){
    return `/user/${this._id}`
})

const UserModel = mongoose.model('User',UserSchema)
module.exports = UserModel
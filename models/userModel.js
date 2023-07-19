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
    // Якби ми використовували іншу бібліотеку для хешуваання
    // то мали б зберігати ще й сіль , але якщоо
    // використовувати bcrypt в цьому нема потреби , бо сіль зберігається
    // в хеші
    hash:{
        type:String,
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
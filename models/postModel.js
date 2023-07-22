const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    header:{
        type:String,
        minLength:1,
        maxLength:50,
        required:true
    },
    text:{
        type:String,
        minLength:1,
        maxLength:300,
        required:true
    },
    date_publication:{
        type:Date,
        default: Date.now()

    }
})

PostSchema.virtual('url').get(function(){
    return `/post/${this._id}`
})

const PostModel = mongoose.model('Post',PostSchema)

module.exports = PostModel
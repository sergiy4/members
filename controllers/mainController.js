const express = require('express')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const Post = require('../models/postModel')

const get_main_page = asyncHandler(async(req,res,next)=>{

    const posts = await Post.find({}).populate('author').exec();
    
  

    res.render('index',{
        title:'Main page',
        user:req.user,
        posts
    })
})

module.exports = {get_main_page}
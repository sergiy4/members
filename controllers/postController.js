const express = require('express')
const asyncHandler = require('express-async-handler')

const {body, validationResult} = require('express-validator')

const Post = require('../models/postModel')

const getCurrentPost = asyncHandler(async(req,res,next)=>{
    console.log('here')
    const post  = await Post.findById(req.params.id).populate('author').exec()
    
    if(!post){

        res.send('Post does not exist').status(404)
        return;
    }

    res.render('post_detail',{
        title:`${post.header}`,
        post,
    })
})

const get_post_form = asyncHandler(async(req,res,next)=>{

    res.render('post_form',{
        title:'Create post'
    })
})

const post_post_form  =[
    body('header')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('header must be specified')
        .escape()
        .matches(/^[A-Za-z0-9_\s]+$/)
        .withMessage('invalid characters'),
    
    body('text')
        .trim()
        .isLength({min:1 , max:1000})
        .withMessage('text must be specified')
        .escape()
        .matches(/^[A-Za-z0-9_\s]+$/)
        .withMessage('invalid characters'),

    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)
        
        
        const post = new Post({
            author: req.user._id,
            header: req.body.header,
            text: req.body.text

        })

        if(!errors.isEmpty()){

            res.render('post_form',{
                title:'Create post',
                post,
                errors:errors.array()
            })
            return;

        } else {
            await post.save()
            res.redirect(post.url)
        }
    })
]

const get_update_post_form = asyncHandler(async(req,res,next)=>{

})

const post_update_post_form  = asyncHandler(async(req, res, next)=>{

})

const delete_post = asyncHandler(async(req,res,next)=>{
    console.log('HERE')
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
})

Object.assign(module.exports,{

    get_post_form,
    post_post_form,
    get_update_post_form,
    post_update_post_form,
    getCurrentPost,
    delete_post
})
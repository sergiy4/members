const express = require('express')
const asyncHandler = require('express-async-handler')
const {body,validationResult} = require('express-validator')
const User = require('../models/userModel')


const get_admin_form = asyncHandler(async(req, res, next)=>{

    res.render('become_a_admin',{
        title:'Become a admin'
    })
})

const post_admin_form = [
    body('secret')
        .trim()
        .isLength({min:1, max:30})
        .escape(),
    
    asyncHandler(async(req,res, next)=>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){

            res.render('become_a_admin',{
                title:'Become a admin',
                errors:errors.array()
            })
        } else {
            if(req.body.secret === process.env.SECRET_ADMIN_PASSWORD){

                const user = await User.findByIdAndUpdate(req.user._id, {admin:true} ).exec()
                res.redirect('/')

            } else {
                res.send('Wrong secret word')
            }

        }
    })

]

module.exports = {
    get_admin_form,
    post_admin_form 
}
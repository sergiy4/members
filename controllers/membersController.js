const { body, validationResult } = require('express-validator')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const get_members_form = asyncHandler(async(req, res, next)=>{

    res.render('become_a_member',{
        title:'Become a member'
    })
}) 

const post_members_form = [
    body('secret')
        .trim()
        .isLength({min:1, max:30})
        .escape(),

    asyncHandler(async(req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){

            
            res.render('become_a_member',{
                title:'Become a member',
                errors:errors.array()
            })
        } else {

            if(req.body.secret === process.env.SECRET_MEMBERS_PASSWORD){               
                
                const user = await User.findByIdAndUpdate(req.user._id, {member:true} ).exec()
               
                res.redirect('/')

            } else {
                res.send('Wrong secret word')
            }
        }
    })
]

module.exports = {
    get_members_form,
    post_members_form
}
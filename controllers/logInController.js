const UserModel = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')


const get_log_in = asyncHandler(async(req, res, next)=>{

    res.render('log_in_form',{
        title:'Log in'
    })
})

const post_log_in =[
    body('username')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('first name must be specified')
        .escape()
        .matches(/^[A-Za-z0-9_]+$/)
        .custom(async (value)=>{
            const user = await UserModel.findOne({ username: value });

            if (!user) {
                throw new Error('User does not exist');
            }
        }),

    body('password')
        .trim()
        .isLength({min:5 , max:100})
        .withMessage('password name must be specified')
        .escape()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/, 'g'),

    asyncHandler(async(req,res,next)=>{

        const errors = validationResult(req)

        const user = {
            username: req.body.username,
            password: req.body.password
        }

      
        if(!errors.isEmpty()){
            
            res.render('log_in_form',{
                title:'Log in',
                user,
                errors:errors.array()
            })
            
            return;
        } else {
            
            next()
        }
    })
] 

module.exports = {
    get_log_in,
    post_log_in
}


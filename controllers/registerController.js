const UserModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

const get_register_form = asyncHandler(async(req,res,next)=>{
    console.log('here')
    res.render('register_form',{
        title:'Sign up'
    })
})

const post_register_form = [
    body('first_name')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('first name must be specified')
        .escape()
        .matches(/^[A-Za-z]+$/, 'g'),

    body('last_name')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('last name must be specified')
        .escape()
        .matches(/^[A-Za-z]+$/, 'g'),
    
    body('username')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('first name must be specified')
        .escape()
        .matches(/^[A-Za-z0-9_]+$/)
        .custom(async (value)=>{
            const user = await UserModel.findOne({ username: value });
            if (user) {
                throw new Error('Username already in use');
            }
        }),
    
    body('password')
        .trim()
        .isLength({min:5 , max:100})
        .withMessage('password name must be specified')
        .escape()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/, 'g')
        ,
    
    body('passwordConfirmation')
        .trim()
        .isLength({min:5 , max:100})
        .withMessage('password name must be specified')
        .custom((value, {req})=>{
            return value === req.body.password
        })
        .escape(),

    asyncHandler(async(req,res,next)=>{
        
        const errors = validationResult(req)
        // console.log(errors)
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            member: req.body.member
        }

        console.log(errors)

        if(!errors.isEmpty()){

            res.render('register_form',{
                title:'Sign up',
                user,
                errors:errors.array()
            })
            return;

        } else {
            const hashPwd =await bcrypt.hash(req.body.password, 10);

            const newUser = new UserModel({
                ...user,
                hash:hashPwd,
            })

            await newUser.save();
            // Перевести до сторінки автентифікації

            res.redirect('/log-in')
        }
    
    })
]

module.exports = {
    get_register_form,
    post_register_form
}
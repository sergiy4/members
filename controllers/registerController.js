const UserModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')


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
        .escape(),

    body('last_name')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('first name must be specified')
        .escape(),
    
    body('username')
        .trim()
        .isLength({min:1 , max:100})
        .withMessage('first name must be specified')
        .escape()
        .custom(async (value)=>{

            const user = await UserModel({username: value})

            if(user){
                throw new Error('Username already in use')
            }
        })
        .custom((value)=>{
            const pattern = /^[A-Za-z0-9_]+$/

            const isValid = pattern.test(value)

            if(!isValid){
                throw new Error('invalid characters')
            }
        }),
    
    body('password')
        .trim()
        .isLength({min:5 , max:100})
        .withMessage('password name must be specified')
        .escape()
        .custom((val)=>{

            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/;

            const isValid = pattern.test(val)

            if(!isValid){
                throw new Error('Password must contain uppercase letters, lowercase letters, numbers and special characters')
            }
        }),
    
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

        const user = new UserModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            member: req.body.member
        })

        if(!errors.isEmpty()){

            res.render('register_form',{
                title:'Sign up',
                user
            })
            return;

        } else {
            await user.save();
            // Перевести до сторінки автентифікації
        }
    })
]

module.exports = {
    get_register_form,
    post_register_form
}
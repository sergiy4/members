
const asyncHandler = require('express-async-handler');


const log_out = asyncHandler(async(req,res,next)=>{

   req.logout(function(err){
        if(err) return next(err)
        res.redirect('/')
   })
})

module.exports = {log_out}
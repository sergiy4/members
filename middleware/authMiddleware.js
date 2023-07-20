
const isAuth = (req, res, next)=>{

    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({msg:'You are not authorized '})
    }
}

const isMember = (req, res, next)=>{
    if(req.user.member && req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({msg:'You are not authorized because you are not admin'})
    }
}

module.exports = {
    isAuth,
    isMember
}
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

async function authMiddleware(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            "res":"Unauthorised Access, login to continue"
    })
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        //it can return only 2 things if it is verified succesfully then the details with which token is made (here id) else if failed then error will be thrown and handled in catch part

        const user = await userModel.findOne({
            _id:decoded.id
        })

        
        req.user = user        
        next()

    }catch(err){
        return res.status(401).json({
            "res":"Token expired, login again to continue"
        })
    }
}



module.exports = authMiddleware


const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")

async function registerController(req,res){

    const {username,password} = req.body
    const userExist = await userModel.findOne({
        username
    })
    
    if(userExist){
        return res.status(409).json({
            "res":"User already exist with this username",
            userExist
        })
    }

   const user =  await userModel.create({
        username,
        password : await bcrypt.hash(password,10)
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    
    res.status(200).json({
        "message":"User created with given details below",
        user
    })
}

async function loginController(req,res){

    const {username,password} = req.body
    
    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(401).json({
            "message":"Invalid Username"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    

    if(!isPasswordValid){
         return res.status(400).json({
            "message":"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

      res.status(200).json({
        "message": `${user.username} logged in succesfully`
    })

}

module.exports = {registerController,loginController}
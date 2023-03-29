const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const tokenModel = require("../models/tokenModel")
const loginValidator = require("../middlewares/loginValidatorMW")
const jwt = require("jsonwebtoken")
const config = require("config")

router.post("/", loginValidator, async(req, res)=>{
    try{
        let user = await userModel.findOne({where:{username:req.body.username}})
        if(user === null) return res.status(404).json({
            message: "Invalid email or password..!"
        })

        bcrypt.compare(req.body.password, user.password, async(err, result)=>{
            if(err) return res.status(500).json({
                message: "bcrypt error: " + err
            })
            
            if(!result) return res.status(404).json({
                message: "Invalid email or password..!"
            })
            
            // let tokensOfUser = await tokenModel.findAndCountAll({where:{UserId:user.id}})
            // if(tokensOfUser.count >= user.devicesNumber) return res.status(400).json({
            //     message: "Sorry..! The allowed number of devices has been exceeded"
            // })

            const token = jwt.sign({user_id: user.username}, config.get("seckey"))
            await tokenModel.create({token:token, UserId:user.id}, { transaction: t })
            
            return res.status(200).json({
                message: "Login successfully..!",
                token
            })
        })
    }catch(err){
        return res.status(500).json({
            message: "Login Error: " + err
        })
    }
})

module.exports = router
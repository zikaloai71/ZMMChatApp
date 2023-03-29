const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const tokenModel = require("../models/tokenModel")
const registerValidator = require("../middlewares/createUserValidatorMW")
const jwt = require("jsonwebtoken")
const config = require("config")
const sequelize = require("../models/sequelize")
const encryptPassword = require("../middlewares/ecryptPasswordMW")
const confirmPassword = require("../middlewares/confirmPasswordMW")

router.post("/", registerValidator, confirmPassword, encryptPassword, async(req, res)=>{
    try{
        let user = await userModel.findOne({where: {username: req.body.username}}),
            token
        if(user !== null) return res.status(400).json({
            message: "Email is actually exist :("
        })

        await sequelize.transaction(async (t) => {
            user = await userModel.create(req.body, { transaction: t })
            token = jwt.sign({user_id: user.id, admin: user.admin}, config.get("seckey"))
            await tokenModel.create({token:token, UserId:user.id}, { transaction: t })
        })

        return res.status(200).json({
            message: "User Created Successfully :)",
            token,
        })
    }catch(err){
        return res.status(500).json({
            message: "Create User Error: " + err
        })
    }
})

module.exports = router
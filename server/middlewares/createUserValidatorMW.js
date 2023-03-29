const validator = require("../util/createUserValidator")
module.exports = (req, res, next)=>{
    if(validator(req.body)){
        req.valid = 1
        next()
    }else return res.status(403).json({
        message: "forbidden command"
    })
}
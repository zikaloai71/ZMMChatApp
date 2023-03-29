const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "username":{
            "type":"string",
            "nullable": false,
        },
        "password":{
            "type":"string",
            "nullable": false,
            "minLength":8
        },
        "confirmPassword":{
            "type":"string",
            "nullable": false,
            "minLength":8
        }
    },
    "required":["username", "password", "confirmPassword"]
}

module.exports = ajv.compile(schema)
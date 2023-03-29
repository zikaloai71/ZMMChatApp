const { Sequelize } = require("sequelize")
const config = require("config")
// const dbConfig = config.get("dbConfig")
const dbConfig = {
  database: "zmmchat",
  user:"root",
  password:"",
  host:"localhost",
  dialect:"mysql"
}
module.exports = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect
})
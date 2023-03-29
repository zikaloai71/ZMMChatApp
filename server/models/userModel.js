const { DataTypes } = require("sequelize")
const sequelize = require("./sequelize")

const User = sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

(async () => {
  await User.sync(/* {alter:true} */);
})();

module.exports = User
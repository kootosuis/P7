const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const User = sequelize.define("user", {
    // attributes
    USER_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    USER_name: { type: Sequelize.STRING, allowNull: false },
    USER_firstname: { type: Sequelize.STRING, allowNull: false },
    USER_email: { type: Sequelize.STRING, allowNull: false, unique: true },
    USER_departement: { type: Sequelize.STRING, allowNull: false },
    USER_role: { type: Sequelize.STRING },
    USER_password: { type: Sequelize.STRING, allowNull: false },
});

module.exports = User;

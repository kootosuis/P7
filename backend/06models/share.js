const sequelize = require("../01utils/DBconnect");
const Sequelize = require("sequelize");

const Share = sequelize.define("share", {
    // attributes
    ShareId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
    ShareText: { type: Sequelize.STRING(10000), allowNull: false},
    // options
});

module.exports = Share;

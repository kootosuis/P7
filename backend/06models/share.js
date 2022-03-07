const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Share = sequelize.define("share", {
    // attributes
    SHARE_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    SHARE_text: { type: Sequelize.STRING, allowNull: false },
    // options
});

module.exports = Share;

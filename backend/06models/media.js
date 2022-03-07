const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Media = sequelize.define("media", {
    // attributes
    MEDIA_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    MEDIA_name: { type: Sequelize.STRING(50), allowNull: false },
    MEDIA_type: { type: Sequelize.STRING(50), allowNull: false },
    MEDIA_size: { type: Sequelize.INTEGER, allowNull: false },
    MEDIA_description: { type: Sequelize.TEXT, allowNull: false },
    MEDIA_url: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Media;

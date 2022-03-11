const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Media = sequelize.define(
    "medium",
    {
        MEDIA_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        MEDIA_name: { type: Sequelize.STRING(50), allowNull: false },
        MEDIA_mimetype: { type: Sequelize.STRING(50), allowNull: false },
        MEDIA_size: { type: Sequelize.INTEGER, allowNull: true },
        MEDIA_description: { type: Sequelize.TEXT, allowNull: true },
        MEDIA_url: { type: Sequelize.STRING, allowNull: true },
    },
    {
        tableName: "media",
    }
);

module.exports = Media;

const Sequelize = require("sequelize");
const sequelize = require("../01utils/DBconnect");

const Media = sequelize.define(
    "medium",
    {
        MediaId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
        MediaName: { type: Sequelize.STRING(50), allowNull: false },
        MediaMimetype: { type: Sequelize.STRING(50), allowNull: false },
        MediaSize: { type: Sequelize.INTEGER, allowNull: true },
        MediaDescription: { type: Sequelize.TEXT, allowNull: true },
        MediaUrl: { type: Sequelize.STRING, allowNull: true },
    },
    {
        tableName: "media",
    }
);

module.exports = Media;

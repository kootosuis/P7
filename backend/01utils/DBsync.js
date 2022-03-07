const sequelize = require("../01utils/DBconnect");

const User = require("../06models/user");
const Share = require("../06models/share");
const Comment = require("../06models/comment");
const Media = require("../06models/media");

User.hasMany(Comment);
User.hasMany(Share);
Share.hasMany(Comment);
Media.hasOne(Share);
Comment.hasMany(Comment);

// sequelize
//     //     .sync()
//     .sync({ force: true })
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports = sequelize.sync();

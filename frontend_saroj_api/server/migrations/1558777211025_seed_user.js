var bcrypt = require('bcrypt');
let hash = bcrypt.hashSync('Admin@123', 10);

module.exports = {
    "up": "INSERT INTO `user`(`Id`,`FullName`,`IsActive`,`PasswordHash`,`AccessFailedCount`,`EmailId`,`RoleId`) VALUES('4464950524184b7082b640e47b053c7c','Admin',1,'"+ hash +"',0,'admin@app.com','2998b1e357c840028236f2a930843af3');",
    "down": "DELETE FROM `user` WHERE `Id` = '4464950524184b7082b640e47b053c7c';"
}
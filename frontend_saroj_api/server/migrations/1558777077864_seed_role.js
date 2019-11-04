module.exports = {
    "up": "INSERT INTO `role`(`Id`,`Name`) VALUES('2998b1e357c840028236f2a930843af3','Admin');",
    "down": "DELETE FROM `user` WHERE `Id` = '2998b1e357c840028236f2a930843af3';"
}
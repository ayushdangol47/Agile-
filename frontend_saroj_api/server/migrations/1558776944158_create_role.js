module.exports = {
    "up": "CREATE TABLE `role` (`Id` varchar(64) NOT NULL,`Name` mediumtext NOT NULL,PRIMARY KEY (`Id`));",
    "down": "DROP TABLE `role`"
}
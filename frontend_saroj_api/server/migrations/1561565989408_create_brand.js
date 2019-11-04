module.exports = {
    "up": "CREATE TABLE `brand` (`Id` varchar(64) NOT NULL,`Name` mediumtext NOT NULL,`Image` varchar(255) NOT NULL,PRIMARY KEY (`Id`));",
    "down": "DROPT TABLE `brand`"
}
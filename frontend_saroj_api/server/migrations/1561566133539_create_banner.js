module.exports = {
    "up": "CREATE TABLE `banner` (`Id` varchar(64) NOT NULL,`Name` mediumtext NOT NULL,`Image` varchar(255) NOT NULL,`short_desc` text NOT NULL,`long_desc` text NOT NULL,`url` varchar(64) NOT NULL,PRIMARY KEY (`Id`));",
    "down": "DROPT TABLE `banner`"
}
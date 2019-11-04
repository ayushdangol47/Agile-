module.exports = {
    "up": "CREATE TABLE `user_contact` (`Id` varchar(64) NOT NULL,`IsSeen` integer(20) NOT NULL,`Userid` varchar(255) NOT NULL,`Subject` text NOT NULL,`Message` text NOT NULL,PRIMARY KEY (`Id`), UNIQUE KEY `Id` (`Id`),  KEY `UserId_idx` (`Userid`), CONSTRAINT `ContactUserid` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`));",
    "down": "DROP TABLE `user_contact`"
}
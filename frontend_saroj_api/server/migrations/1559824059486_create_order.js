module.exports = {
    "up": "CREATE TABLE `order` (`Id` varchar(64) NOT NULL,`Userid` varchar(64) NOT NULL,`Totalprice` varchar(64) NOT NULL,`IsActive` tinyint(1) NOT NULL,`Orderdate` datetime NOT NULL,`Deliverdate` datetime NOT NULL,`fullname` varchar(64) NOT NULL,`Deliverstatus` varchar(64) NOT NULL,`Address`longtext NOT NULL,`City`longtext NOT NULL,`Landmark`longtext NOT NULL,`Contact`varchar(64) NOT NULL, PRIMARY KEY (`Id`), UNIQUE KEY `Id` (`Id`));",
    "down": "DROP TABLE `order`"
}
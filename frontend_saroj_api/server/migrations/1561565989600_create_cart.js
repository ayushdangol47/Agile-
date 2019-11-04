module.exports = {
    "up": "CREATE TABLE `cart` (`Id` varchar(64) NOT NULL,`Userid` varchar(64) NOT NULL,`Productid` varchar(64) NOT NULL,`IsActive` tinyint(1) NOT NULL,`Quantity` varchar(64) NOT NULL,`Price` varchar(64) NOT NULL,`TotalPrice` varchar(64) NOT NULL,`Ischeckout` varchar(64) NOT NULL, PRIMARY KEY (`Id`), UNIQUE KEY `Id` (`Id`),  KEY `Productid_idx` (`Productid`), CONSTRAINT `ProductCartId` FOREIGN KEY (`Productid`) REFERENCES `products` (`id`));",
    "down": "DROP TABLE `cart`"
}
module.exports = {
    "up": "CREATE TABLE `order_items` (`Id` varchar(64) NOT NULL,`Orderid` varchar(64) NOT NULL,`Productid` varchar(64) NOT NULL,`IsActive` tinyint(1) NOT NULL,`Quantity` varchar(64) NOT NULL,`Price` varchar(64) NOT NULL, PRIMARY KEY (`Id`), UNIQUE KEY `Id` (`Id`));",
    "down": "DROP TABLE `order_items`"
}
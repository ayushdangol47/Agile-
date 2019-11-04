var mysql = require('mysql');
var migration = require('mysql-migrations');
var config = require('./shared/config');

var connection = mysql.createPool({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname,
    connectionLimit : 10
});

migration.init(connection, __dirname + '/migrations');
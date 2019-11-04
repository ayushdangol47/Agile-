var mysql = require('mysql');
var config = require('./config');

//local mysql db connection
var connection = mysql.createConnection({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
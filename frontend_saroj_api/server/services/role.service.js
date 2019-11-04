const sql = require('../shared/db');
module.exports = {
    getList
}
async function getList(result) {
    sql.query("select Id, Name from role", function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
}
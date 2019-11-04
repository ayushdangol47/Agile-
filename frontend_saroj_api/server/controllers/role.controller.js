const roleService = require("../services/role.service");

module.exports = {
    getList
};
function getList(req, res, next) {
    roleService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
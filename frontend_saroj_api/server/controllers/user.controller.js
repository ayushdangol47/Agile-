const userService = require("../services/user.service");

module.exports = {
    authenticate,
    create,
    getById,
    getPaginatedList,
    update,
    remove,
    upload,logout,contact,email,
    passwordUpdate
};

function authenticate(req, res, next) {
    userService.authenticate(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function create(req, res, next) {
    userService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function passwordUpdate(req, res, next) {
    userService.passwordUpdate(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function email(req, res, next) {
    userService.email(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function upload(req, res, next) {
    userService.uploadHandler(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function update(req, res, next) {
    userService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    userService.remove(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    userService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    userService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function logout(req, res, next) {
    userService.logout(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function contact(req, res, next) {
    userService.contact(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}

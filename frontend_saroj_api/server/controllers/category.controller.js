const categoryService = require("../services/category.service");

module.exports = {
    create,
    getById,
    getPaginatedList,
    update,
    remove,
    getList,getCount,
    upload
};
function getList(req, res, next) {
    categoryService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getCount(req, res, next) {
    categoryService.getCount(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function create(req, res, next) {
    categoryService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function update(req, res, next) {
    categoryService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    categoryService.remove(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    categoryService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    categoryService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function upload(req, res, next) {
    categoryService.uploadHandler(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
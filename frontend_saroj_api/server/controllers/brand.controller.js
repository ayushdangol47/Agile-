const brandService = require("../services/brand.service");

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
    brandService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getCount(req, res, next) {
    brandService.getCount(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function create(req, res, next) {
    brandService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function update(req, res, next) {
    brandService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    brandService.remove(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    brandService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    brandService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function upload(req, res, next) {
    brandService.uploadHandler(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
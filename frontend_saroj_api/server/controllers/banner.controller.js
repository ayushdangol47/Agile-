const bannerService = require("../services/banner.service");

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
    bannerService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getCount(req, res, next) {
    bannerService.getCount(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function create(req, res, next) {
    bannerService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function update(req, res, next) {
    bannerService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    bannerService.remove(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    bannerService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    bannerService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function upload(req, res, next) {
    bannerService.uploadHandler(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
const productService = require("../services/product.service");

module.exports = {
    create,
    getById,
    getByCat,
    getByBrand,
    getByName,
    getPaginatedList,
    update,
    remove,
    getList,
    getSearch,
    upload
 
};
function getList(req, res, next) {
    productService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function create(req, res, next) {
   // console.log(req.body)
    productService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getSearch(req, res, next) {
    // console.log(req.body)
     productService.getSearch(req,function(err,result){
         if(err)
             next(err);
         else 
             res.json(result);
     });
 }
function getByName(req, res, next) {
    //console.log(req.body);

    productService.getByName(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}

function update(req, res, next) {
    productService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    productService.remove(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    productService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    productService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
 
  function getByCat(req, res, next) {
    productService.getByCat(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }

  function getByBrand(req, res, next) {
    // console.log(req.body);
 
     productService.getByBrand(req.params.id,function(err,result){
         if(err)
             next(err);
         else 
             res.json(result);
     });
 }
 function upload(req, res, next) {
    productService.uploadHandler(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}

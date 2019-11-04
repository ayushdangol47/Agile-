const orderService = require("../services/order.service");

module.exports = {
    create,
    getById,
    getByUser,
    getPaginatedList,
    updatestatus,
    getList
};

function create(req, res, next) {
    orderService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function updatestatus(req, res, next) {
    orderService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}

function getPaginatedList(req, res, next) {
    orderService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getById(req, res, next) {
    orderService.getById(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function getByUser(req, res, next) {
    orderService.getByUser(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }

  function getList(req, res, next) {
    orderService.getList(function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
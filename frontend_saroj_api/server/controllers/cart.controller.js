const cartService = require("../services/cart.service");

module.exports = {
    create,
    getByUser,
    getPaginatedList,
    update,
    remove,
    removeall,
    getSum

};

function create(req, res, next) {
    cartService.create(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
    
    function getByUser(req, res, next) {
        cartService.getByUser(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
  }
  function getSum(req, res, next) {
    cartService.getSum(req.params.id,function(err,result){
    if(err)
        next(err);
    else 
        res.json(result);
});
}
function update(req, res, next) {
    cartService.update(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function remove(req, res, next) {
    cartService.remove(req.params.id,req.params.userid,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function removeall(req, res, next) {
    cartService.removeall(req.params.id,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}
function getPaginatedList(req, res, next) {
    cartService.getPaginatedList(req,function(err,result){
        if(err)
            next(err);
        else 
            res.json(result);
    });
}

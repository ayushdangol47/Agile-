const sql = require('../shared/db');
const uuidv1 = require('uuid/v1')
module.exports = {
    create,
    getByUser,
    getPaginatedList,
    update,
    remove,
    removeall,
    getSum
}
async function create(req,result){
    let cart = {Id: uuidv1(),Userid : req.body.Userid,Productid:req.body.Productid,IsActive:1,Quantity:req.body.Quantity,Price:req.body.Price,TotalPrice:req.body.Price*req.body.Quantity,Ischeckout:req.body.Ischeckout}
    sql.query("INSERT INTO `cart` SET ?", cart, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}

async function remove(id,userid,result) {
    
    sql.query("delete from cart where Productid = ? and Userid=? and Ischeckout=0 ", [id,userid], function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function removeall(id,result) {
    sql.query("delete from cart where Userid = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function update(req,result) {
    sql.query("update cart set Quantity=? where Id = ? ", [req.body.Quantity,req.body.Id], function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function getPaginatedList(req,result) {
    let pagesize = parseInt(req.query.pagesize),skip =parseInt(req.query.skip);
    sql.query("select SQL_CALC_FOUND_ROWS Id,  cart.Id,cart.Quantity,cart.Price,products.id as pid,products.Name from cart left join products on cart.Productid=products.id LIMIT ?, ?;SELECT FOUND_ROWS() as total;",[skip,pagesize],  function (err, response) {             

        if(err) {
            result(err, null);
        }
        else{
            result(null,{
                data : response[0],
                count : response[1][0].total
            });
        }
    });
}
async function getByUser(id,result) {
    sql.query("select cart.Id,cart.Productid,cart.Quantity as qty,sum(cart.Quantity) as Quantity,cart.Price,cart.TotalPrice,products.id as pid,products.Name as Name,products.Image from cart left join products on cart.Productid=products.id   where Ischeckout=0 and Userid = ? group by cart.Productid ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result(null,null);
            }
            else{   
                console.log(data);
                result(null,data);           
            }
        }
    });
}

async function getSum(id,result) {
    sql.query("select sum(TotalPrice) as sum from cart where Ischeckout=0 and Userid = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data[0].sum==null)  { 
                result(null,null);
            }
            else{   
                console.log(data);
                result(null,data[0]);           
            }
        }
    });
}
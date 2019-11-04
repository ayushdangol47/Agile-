const sql = require('../shared/db');
const uuidv1 = require('uuid/v1')
module.exports = {
    create,
    getById,
    getByUser,
    getPaginatedList,
    updatestatus,
    getList
}
async function create(req,result){
    console.log(req.body);
    sql.query("select cart.Id,cart.Userid,cart.Productid,cart.Quantity as qty,sum(cart.Quantity)as Quantity,cart.Price,cart.TotalPrice,products.id as pid,products.Name as pname,products.Quantity as Pqty,order_items.Id as oid,order_items.Productid as opid,IFNULL(order_items.Quantity,0) as oqty,(products.Quantity-IFNULL(order_items.Quantity,0)-sum(cart.Quantity)) as final from cart left join products on cart.Productid=products.id left join order_items on order_items.Productid=products.id where cart.Ischeckout= 0 and cart.Userid =? group by products.id" , [req.body.Userid], function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result(null,null);
            }
            else{   
                let Total =0;
                let Userid;
                let isvalid=true;
                //console.log(data);
                data.forEach(function(item,index){
                    Total +=parseInt(item.Price)*parseInt(item.qty);
                     Userid=item.Userid;
                     if(item.final < 0){
                         isvalid=false; 
                         return   

                     }
                     
                }); 
                if(!isvalid){
                    result("Update your cart !! ",null);
                    return;    

                }                
                //console.log(Total);
                let order = {Id: uuidv1(),Totalprice :Total,Userid:Userid,fullname:req.body.FullName,Address:req.body.Address,City:req.body.City,Landmark:req.body.Location,Contact:req.body.Contact,Deliverstatus:0,Orderdate:req.body.Orderdate}


                  sql.query("INSERT INTO `order` SET ?", order, function (err, orderdata) {             
                if(err) {
                    result(err, null);
                }
                else{
                    data.forEach(function(item,index){
                   
              
                        let order_items = {
                            Id: uuidv1(),
                            Orderid:order.Id,
                            Productid : item.Productid,
                            Quantity : item.qty,
                            Price : item.Price
        
                           
                        }
        
                        sql.query("INSERT INTO `order_items` SET ?", order_items, function (err, data) {
                            if(err) {
                                    result(err, null);
                                }
                                else{
                                    
                                sql.query("update cart set Ischeckout=1 where Userid = ? ", [req.body.Userid], function (err, data) {             
                                    if(err) {
                                        result(err, null);
                                    }
                                    else{
                                        result(null,{success:true});
                                    }
                                });

                                }
                                });     
                                
                            
                        });
                }
            });
                   
                
      

            }
        }
    });
   
    
    
   
}
async function getById(id,result) {
    sql.query("select order_items.*,`order`.id as oid,`order`.*,DATE_FORMAT(`order`.Orderdate, '%W, %M %e, %Y') as odate,products.id as Id,products.Name,products.Image from order_items left join products on products.Id=order_items.Productid left join `order` on order_items.Orderid=`order`.Id  where order_items.Orderid = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result(null,null);
            }
            else{   
                result(null,data);           
            }
        }
    });
}
async function getByUser(id,result) {
    sql.query("select `order`.*,DATE_FORMAT(order.Orderdate, '%W, %M %e, %Y') as odate,DATE_FORMAT(order.Deliverdate, '%W, %M %e, %Y') as ddate from `order`  where Userid = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result(null,null);
            }
            else{   
                result(null,data);           
            }
        }
    });
}


async function updatestatus(req,result) {
    sql.query("update order set Deliverstatus=? where Id = ? ", [req.body.Deliverstatus,req.body.Id], function (err, data) {             
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

    sql.query("select SQL_CALC_FOUND_ROWS Id, `order`.*,DATE_FORMAT(order.Orderdate, '%W, %M %e, %Y') as odate,DATE_FORMAT(order.Deliverdate, '%W, %M %e, %Y') as ddate from `order` LIMIT ?, ?;SELECT FOUND_ROWS() as total;",[skip,pagesize],  function (err, response) {             
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

async function getList(result) {
    sql.query("select `order`.*,DATE_FORMAT(order.Orderdate, '%W, %M %e, %Y') as odate,DATE_FORMAT(order.Deliverdate, '%W, %M %e, %Y') as ddate from `order`", function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
}




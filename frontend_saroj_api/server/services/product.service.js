const sql = require('../shared/db');
const uuidv1 = require('uuid/v1')
const multer = require('multer');
const path =require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/product/')
    },
    filename: (req, file, cb) => {
      // console.log(file.originalname);
      // console.log(file.fieldname);
      let ext=path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({storage: storage}).single('imageFile');
module.exports = {
    create,
    getById,
    getByCat,
    getByName,
    getByBrand,
    getPaginatedList,
    update,
    remove,
    uploadHandler,
    getList,
    getSearch
  
}
async function create(req,result){
    console.log(req.body);
    let product = {Id: uuidv1(),Name : req.body.Name,Code : req.body.Code,IsActive : 1,Description : req.body.Description,Description : req.body.Description,Long_Description:req.body.Long_Description,T_Description:req.body.T_Description,CategoryId : req.body.CategoryId,BrandId : req.body.Brand_id,Quantity:req.body.Quantity,Image:req.body.Image,Price:req.body.Price}
    sql.query("INSERT INTO `products` SET ?", product, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function getById(id,result) {
    sql.query("select products.*,category.Id as cid,category.Name as Catname,brand.Id as bid,brand.Name as Brandname,order_items.id as oid,order_items.Productid as opd,products.Quantity-IFNULL(sum(order_items.Quantity), 0) as OQuantity from products left join category on products.CategoryId=category.id left join brand on products.BrandId=brand.id left join order_items on products.id=order_items.Productid where products.Id = ? and products.IsActive=1", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result(null,null);
            }
            else{   
                result(null,data[0]);           
            }
        }
    });
}
async function getByCat(id,result) {
    console.log(id);
    sql.query("select products.*,category.Id as cid,category.Name as CategoryId,order_items.id as oid,order_items.Productid as opd,IFNULL(sum(order_items.Quantity), 0) as OQuantity from products left join category on products.CategoryId=category.id left join order_items on products.id=order_items.Productid where products.CategoryId = ?  and products.IsActive=1 group by products.Id", id, function (err, data) {             
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

async function getByBrand(id,result) {
    console.log(id);
    sql.query("select products.*,brand.Id as bid,brand.Name as BrandId,order_items.id as oid,order_items.Productid as opd,IFNULL(sum(order_items.Quantity), 0) as OQuantity from products left join brand on products.BrandId=brand.id left join order_items on products.id=order_items.Productid where products.BrandId = ?  and products.IsActive=1 group by products.Id", id, function (err, data) {             
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


async function getByName(req,result) {
   
    sql.query("select p.Id, p.Name,p.Code,p.Image,p.Price,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where p.Name like ? and  IsActive=1 ",["%"+req.body.name+"%"], function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
    
   
}
async function remove(id,result) {
    sql.query("update products set IsActive=0 where id = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function update(req,result) {
    sql.query("update products set Name=?,Code=?,Description=?,CategoryId=?,BrandId=?,Long_Description=?,T_Description=?,Quantity=?,Image=?,Price=? where Id = ? ", [req.body.Name,req.body.Code,req.body.Description,req.body.CategoryId,req.body.Brand_id,req.body.Long_Description,req.body.T_Description,req.body.Quantity,req.body.Image,req.body.Price,req.body.Id], function (err, data) {             
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

    sql.query("select SQL_CALC_FOUND_ROWS Id,  p.Id, p.Name,p.Code,p.Image,p.Price,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where IsActive=1 LIMIT ?, ?;SELECT FOUND_ROWS() as total;",[skip,pagesize],  function (err, response) {             
      
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
    sql.query("select p.Id, p.Name,p.Code,p.Image,p.Price,p.Description,p.Quantity,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where IsActive=1", function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
}
async function getSearch(req,result){
   if(req.body.brandid==""){
        sql.query("select p.Id, p.Name,p.Code,p.Image,p.Price,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where p.CategoryId =?  and p.Price >=? and p.Price <=? and  IsActive=1 ",[req.body.catid,req.body.min,req.body.max], function (err, response) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null,response);
            }
        });

    } else if(req.body.catid==""){
        sql.query("select p.Id, p.Name,p.Code,p.Image,p.Price,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where  p.BrandId =? and p.Price >=? and p.Price <=? and  IsActive=1 ",[req.body.brandid,req.body.min,req.body.max], function (err, response) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null,response);
            }
        });

    }
    else{
        sql.query("select p.Id, p.Name,p.Code,p.Image,p.Price,c.Name as Category from products p inner join Category c on c.Id = p.CategoryId where  p.Price >=? and p.Price <=? and  IsActive=1 ",[req.body.min,req.body.max], function (err, response) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null,response);
            }
        });

    }
   
}
function uploadHandler(req,result){
    upload(req,result,function(err) {
        if(err) {
            return result(err,"Error uploading file.");
        }
        console.log(req.file);
        result(null,req.file);

      
    });

}

const sql = require('../shared/db');
const uuidv1 = require('uuid/v1')
const multer = require('multer');
const path =require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/brand/')
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
    getPaginatedList,
    update,
    remove,
    uploadHandler,
    getList,
    getCount
}
async function create(req,result){
    let brand = {Id: uuidv1(),Name : req.body.Name,Image:req.body.Image}
    sql.query("INSERT INTO `brand` SET ?", brand, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function getById(id,result) {
    sql.query("select Id,Name,Image from brand where id = ? ", id, function (err, data) {             
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
async function remove(id,result) {
    sql.query("delete from brand where id = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function update(req,result) {
    sql.query("update brand set Name=?,Image=? where Id = ? ", [req.body.Name,req.body.Image,req.body.Id], function (err, data) {             
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
    sql.query("select SQL_CALC_FOUND_ROWS Id,  Id, Name , Image from brand LIMIT ?, ?;SELECT FOUND_ROWS() as total;",[skip,pagesize],  function (err, response) {             

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
    sql.query("select Id, Name,Image from brand", function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
}
async function getCount(result) {
    sql.query("select count(id) as totalcount from brand", function (err, response) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,response);
        }
    });
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


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sql = require('../shared/db');
const config = require('../shared/config');
const uuidv1 = require('uuid/v1');
const multer = require('multer');
const path =require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/user')
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
    authenticate,
    create,
    getById,
    getPaginatedList,
    update,
    remove,
    uploadHandler,
    logout,contact,
    passwordUpdate
}
async function authenticate(req,result){
   // console.log(req.body);
    sql.query("select * from user where EmailId = ? ", req.body.email, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            if(data.length < 1)  { 
                result('Incorrect Email or password.',null); 
            }
            else{   
                if(bcrypt.compareSync(req.body.Password, data[0].PasswordHash)) {
                let token = jwt.sign({UserId: data[0].Id, EmailId : data[0].EmailId, RoleId : data[0].RoleId},
                    config.secret,
                    { expiresIn: '24h' // expires in 24 hours
                    }
                );
                let usertype="";
                if(data[0].RoleId=='2998b1e357c840028236f2a930843af3'){
                     usertype="admin";
                }else{
                    usertype="user";
                }
                
                // return the JWT token for the future API calls
                result(null,{
                    status: 200,
                    success:true,
                    token: token,
                    fullname : data[0].FullName,
                    userid:data[0].Id,
                    usertype : usertype
                });
                }     
                else {
                    result(null,{
                        status: 400,
                        success:false,
                        message:"Incorrect Username or Password"
                       
                    });
                }                 
            }
        }
    });
}
async function create(req,result){
   // console.log(req.body);
    let user = {Id: uuidv1(),FullName : req.body.FullName,IsActive : 1, PasswordHash : bcrypt.hashSync(req.body.Password, 10),AccessFailedCount: 0,EmailId:req.body.EmailId,Phone:req.body.Phone,Location:req.body.Location,RoleId:req.body.RoleId}
    sql.query("INSERT INTO `user` SET ?", user, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function getById(id,result) {
    sql.query("select * from user where id = ? ", id, function (err, data) {             
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
    sql.query("delete from user where id = ? ", id, function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}
async function update(req,result) {
if(!req.body.image){
    sql.query("update user set FullName=?,EmailId=?,Phone=?,Location=?,Country=?,City_shipping=?,State_shipping=?,City_billing=?,State_billing=? where Id = ? ", [req.body.FullName,req.body.Email,req.body.Phone,req.body.Location,req.body.Country,req.body.shipping_city,req.body.shipping_state,req.body.City_billing,req.body.State_billing,req.body.Userid], function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
} else{
    sql.query("update user set FullName=?,EmailId=?,Phone=?,Location=?,Image=? where Id = ? ", [req.body.FullName,req.body.EmailId,req.body.Phone,req.body.Location,req.body.image,req.body.id], function (err, data) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null,null);
        }
    });
}   

}
async function getPaginatedList(req,result) {
    let pagesize = parseInt(req.query.pagesize),skip =parseInt(req.query.skip);

    sql.query("select SQL_CALC_FOUND_ROWS Id,  Id, FullName, EmailId, IsActive from user LIMIT ?, ?;SELECT FOUND_ROWS() as total;",[skip,pagesize],  function (err, response) {             
      
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
function uploadHandler(req,result){
    upload(req,result,function(err) {
        if(err) {
            return result(err,"Error uploading file.");
        }
        console.log(req.file);
        result(null,req.file);

      
    });

}
async function logout(req,result) {

   

}
async function contact(req,result){
    // console.log(req.body);
     let user = {Id: uuidv1(),Userid : req.body.Userid,IsSeen : 0, Subject:req.body.Subject,Message:req.body.Message}
     sql.query("INSERT INTO `user_contact` SET ?", user, function (err, data) {             
         if(err) {
             result(err, null);
         }
         else{
             result(null,null);
         }
     });
 }

 async function passwordUpdate(req,result){
    // console.log(req.body);
     sql.query("update `user` SET PasswordHash =? where Id=?", [bcrypt.hashSync(req.body.Password, 10),req.body.Userid], function (err, data) {             
         if(err) {
             result(err, null);
         }
         else{
             result(null,null);
         }
     });
 }



var jwt = require('jsonwebtoken');
const config = require('../shared/config.js');
const userservice = require('../services/user.service.js');

var checkToken = (req, res, next) => {  
  if(req.url.indexOf('/api/') > -1 && req.url.indexOf('/api/account/') == -1){
    var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: 'Invalid Token'
          });
        } else {
          userservice.getById(decoded.UserId,function(err,result){
            if(result != null){
              req.decoded = decoded;
              next();
            }
            else{
              return res.status(401).json({
                message: 'Invalid Token'
              });
            }
          });          
        }
      });
    } else {
      return res.status(401).json({
        message: 'Invalid Token'
      });
    }
  }
  else
    next();
};

module.exports = {
  checkToken: checkToken
}


const userController = require("../controllers/user.controller");


module.exports = function(app) {
  app.post('/api/account/login',  userController.authenticate);
  app.post('/api/account/signup',  userController.create);
}

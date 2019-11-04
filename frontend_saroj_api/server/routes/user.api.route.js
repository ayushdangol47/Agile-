
const ControllerUser = require("../controllers/user.controller");

module.exports = function(app) {
  app.get('/api/v1/users', ControllerUser.getPaginatedList),
  app.post('/api/v1/users', ControllerUser.create),
  app.patch('/api/v1/users', ControllerUser.update),
  app.get('/api/v1/users/:id', ControllerUser.getById)
  app.delete('/api/v1/users/:id', ControllerUser.remove)



  app.post('/api/v1/users/upload', ControllerUser.upload),

  app.get('/api/user/logout', ControllerUser.logout)
  app.post('/api/v1/users/contact', ControllerUser.contact)
  app.post('/api/v1/users/change_password', ControllerUser.passwordUpdate)



}

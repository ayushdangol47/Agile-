
const ControllerCart = require("../controllers/cart.controller");



module.exports = function(app) {
  app.get('/api/v1/carts', ControllerCart.getPaginatedList),
  app.post('/api/v1/carts', ControllerCart.create),
  app.patch('/api/v1/carts', ControllerCart.update),


  app.delete('/api/v1/carts/delete/:id/:userid', ControllerCart.remove),
  app.delete('/api/v1/carts/all/delete/:id', ControllerCart.removeall),

  app.get('/api/v1/carts/atcheckout/:id',ControllerCart.getSum),

  app.get('/api/v1/carts/Byuser/:id',ControllerCart.getByUser)
}

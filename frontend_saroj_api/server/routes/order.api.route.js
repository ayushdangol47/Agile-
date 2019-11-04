
const ControllerOrder = require("../controllers/order.controller");



module.exports = function(app) {
  app.get('/api/v1/orders', ControllerOrder.getList),
  app.post('/api/v1/orders', ControllerOrder.create),
  app.get('/api/v1/orders/:id', ControllerOrder.getById),



  app.patch('/api/v1/orders/changestatus', ControllerOrder.updatestatus),

  app.get('/api/order/getByUser/:id', ControllerOrder.getByUser)
}

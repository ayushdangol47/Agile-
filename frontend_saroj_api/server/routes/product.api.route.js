
const ControllerProduct = require("../controllers/product.controller");


module.exports = function(app) {
  app.get('/api/v1/products', ControllerProduct.getList),
  app.post('/api/v1/products', ControllerProduct.create),
  app.put('/api/v1/products', ControllerProduct.update),
  app.get('/api/v1/products/:id', ControllerProduct.getById),
  app.delete('/api/v1/products/:id', ControllerProduct.remove),

  app.post('/api/v1/products/upload', ControllerProduct.upload)



  app.get('/api/v1/products/getByCat/:id', ControllerProduct.getByCat),
  app.post('/api/v1/products/getByName', ControllerProduct.getByName),
  app.get('/api/v1/products/getByBrand/:id', ControllerProduct.getByBrand)


}

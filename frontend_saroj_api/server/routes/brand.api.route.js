
const ControllerBrand = require("../controllers/brand.controller");



module.exports = function(app) {
  app.get('/api/v1/brands', ControllerBrand.getList),
  app.post('/api/v1/brands', ControllerBrand.create),
  app.put('/api/v1/brands', ControllerBrand.update),
  app.get('/api/v1/brands/:id', ControllerBrand.getById)
  app.delete('/api/v1/brands/:id', ControllerBrand.remove)

  app.post('/api/v1/brands/upload', ControllerBrand.upload)

}

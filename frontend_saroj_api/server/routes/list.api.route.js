const roleController = require("../controllers/role.controller");
const categoryController = require("../controllers/category.controller");
const productController = require("../controllers/product.controller");
const brandController = require("../controllers/brand.controller");
const bannerController = require("../controllers/banner.controller");





module.exports = function(app) {
  app.get('/api/account/list/role', roleController.getList),
  app.get('/api/account/list/category', categoryController.getPaginatedList),
  app.get('/api/account/list/product/getByCat/:id', productController.getByCat),

  app.get('/api/account/list/product', productController.getPaginatedList),
  app.post('/api/account/list/search/product', productController.getSearch),
  app.post('/api/account/list/search/product/getByName', productController.getByName),
  app.get('/api/account/list/product/get/:id', productController.getById),


  app.get('/api/account/list/brand', brandController.getPaginatedList),
  app.get('/api/account/list/product/getByBrand/:id', productController.getByBrand),

  app.get('/api/account/list/banner', bannerController.getPaginatedList)
  

}

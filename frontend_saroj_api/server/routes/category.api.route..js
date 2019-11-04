
const ControllerCategory = require("../controllers/category.controller");



module.exports = function(app) {
  app.get('/api/v1/categories', ControllerCategory.getList),
  app.post('/api/v1/categories', ControllerCategory.create),
  app.put('/api/v1/categories', ControllerCategory.update),
  app.get('/api/v1/categories/:id', ControllerCategory.getById)
  app.delete('/api/v1/categories/:id', ControllerCategory.remove)

  app.post('/api/v1/categories/upload', ControllerCategory.upload)

}

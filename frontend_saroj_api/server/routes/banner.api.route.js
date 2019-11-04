
const ControllerBanner = require("../controllers/banner.controller");



module.exports = function(app) {
  app.get('/api/v1/banners', ControllerBanner.getPaginatedList),
  app.post('/api/v1/banners', ControllerBanner.create),
  app.patch('/api/v1/banners', ControllerBanner.update),
  app.get('/api/v1/banners:id', ControllerBanner.getById)
  app.delete('/api/v1/banners/:id', ControllerBanner.remove)

  app.post('/api/v1/banners/upload', ControllerBanner.upload)

}

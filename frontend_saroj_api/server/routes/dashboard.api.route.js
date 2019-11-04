module.exports = function(app) {
  app.get('/api/dashboard', function(req, res, next) {
    return res.json({
      success: true,
      message: 'Dashboard'
    });
  });
}

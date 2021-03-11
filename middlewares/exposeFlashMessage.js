module.exports = function exposeFlashMessage(req, res, next) {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  res.locals.login_error = req.flash("login error");
  next(); // passe la main au prochain middleware (si défini), sinon passe la main au callback d'une route
};

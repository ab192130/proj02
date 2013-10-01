/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.auth) {
    return ok();
  }

  // User is not allowed
  else {
    sError.access_denied(res);
  }
};
/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

    console.log(req.target); //TODO: create additional policy for req.target
  // User is allowed, proceed to controller
  if (req.session.auth) {
    return ok();
  }

  // User is not allowed
  else {
    sError.access_denied(res);
  }
};
/**
 * Allow admins
 */

module.exports = function (req, res, ok) {

    // Admin is allowed, proceed to controller
    var uid = req.session.auth;
    sUser.getOne({id: uid}, function(user){
        if(user.role == 1){
            return ok();
        } else {
            res.view('error', {error: res.i18n('access_denied'), code: 403});
        }
    });
};
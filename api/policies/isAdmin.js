/**
 * Allow admins
 */

module.exports = function (req, res, ok) {

    // Admin is allowed, proceed to controller
    var uid = req.session.auth;
    sData.getOne(User, {id: uid}, function(user){
        if(user.role == 1){
            return ok();
        } else {
            sError.access_denied(res);
        }
    });
};
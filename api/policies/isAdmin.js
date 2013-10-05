/**
 * Allow admins
 */

module.exports = isAdmin = function (req, res, ok) {

    // Admin is allowed, proceed to controller
    var user = sUser.getCurrent(req);
    if(user){
        if(user.role == 1){
            return ok();
        } else {
            sError.access_denied(res);
        }
    } else {
        sError.access_denied(res);
    }

//    sData.getOne(User, {id: uid}, function(user){
//        if(user.role == 1){
//            return ok();
//        } else {
//            sError.access_denied(res);
//        }
//    });
};
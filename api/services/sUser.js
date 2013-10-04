model = User;

exports.gotoProfile = function(res){
    res.redirect('/user/me');
};

exports.getCurrent = function(req){
    return req.session.data;
};

exports.signOut = function(req){
    req.session.auth = null;
    req.session.data = null;
};

exports.canChange = function(user, item){
    if (item.author == user.id || user.role == 1) {
        return true;
    } else {
        return false;
    }
};
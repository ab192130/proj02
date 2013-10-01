model = User;

exports.gotoProfile = function(res){
    res.redirect('/user/me');
};
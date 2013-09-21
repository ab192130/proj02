model = User;

exports.gotoProfile = function(res){
    res.redirect('/user/me');
};

exports.getOne = function(args, callback){
    model.findOne(args).exec(function(err, user){
        if (err) throw err;
        callback(user);
    });
};

exports.get = function(args, callback){
    model.find(args).exec(function(err, users){
        if (err) throw err;
        callback(users);
    })
};

exports.delete = function(args, callback){
    model.destroy(args).exec(function(err){
        if (err) throw err;
        callback();
    });
};


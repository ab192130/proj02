var model = Comment;

exports.add = function(args, callback){
    model.create(args, function(err, comment){
        if (err) throw err;
        callback(comment);
    });
};

exports.get = function(args, callback){
    model.find(args).exec(function(err, comments){
        if (err) throw err;
        callback(comments);
    });
};

exports.delete = function(args, callback){
    model.destroy(args).exec(function(err){
        if(err) throw err;
        callback();
    });
};
var model = Blog;

exports.add = function(args, callback){
    model.create(args, function(err, blog){
        if (err) throw err;
        callback(blog);
    });
};

exports.getOne = function(args, callback){
    model.findOne(args).exec(function(err, blog){
        if (err) throw err;
        callback(blog);
    });
};

exports.get = function(args, callback){
    model.find(args).exec(function(err, blogs){
        if (err) throw err;
        callback(blogs);
    });
};

exports.delete = function(args, callback){
    model.destroy(args).exec(function(err){
        if (err) throw err;
        callback();
    });
};

    exports.add = function(model, args, callback){
        model.create(args, function(err, item){
            if(err) throw err;
            callback(item);
        });
    };

    exports.get = function(model, args, callback){
        model.find(args).exec(function(err, items){
            if(err) throw err;
            callback(items);
        });
    };

    exports.getOne = function(model, args, callback){
        model.findOne(args).exec(function(err, items){
            if(err) throw err;
            callback(items);
        });
    };

    exports.delete = function(model, args, callback){
        model.destroy(args, function(err){
            if(err) throw err;
            callback();
        });
    };
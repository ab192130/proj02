    var model = Setting;

    exports.getOne = function(type, callback){
        model.findOne({type: type}).exec(function(err, setting){
            if (err) throw err;
            callback(setting);
            return setting;
        });
    };
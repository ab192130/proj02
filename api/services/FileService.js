var fs = require('fs');

exports.get = function(path, callback){
    fs.readFile(path, function(err, data){
        if (err) throw err;
        callback(data);
    });
};

exports.create = function(file, data, callback){
    fs.writeFile(file, data, function(err){
        if(err) throw err;
        callback();
    });
};
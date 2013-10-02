var fs = require('fs');
//var formidable = require('./formidable');
//var form = new formidable.IncomingForm();
//form.encoding = 'utf-8';
//form.uploadDir = process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd();
//form.keepExtensions = true;


exports.get = function(path, callback){
    fs.readFile(path, function(err, data){
        if (err) throw err;
        callback(data);
    });
};

exports.create = function(path, data, callback){
    fs.writeFile(path, data, function(err){
        if(err) throw err;
        callback();
    });
};

exports.move = function(source, destination, callback){
    fs.rename(source, destination, function(err){
        if (err) throw err;
        fs.unlink(source, function(err) {
            if (err) throw err;
            callback();
        });
    });
};
var express = require('express');
// Put this in `config/express.js`
module.exports.express = {
    customMiddleware: function (app) {
        app.use(function(req, res, next) {
            var uid = req.session.auth;
            if (uid){
                sData.getOne(User, {id: uid}, function(user){
                    res.locals.userauth = user;
                });
            }

            sSetting.getOne('general', function(setting){
                res.locals.site = setting;
                res.setLocale(setting.language);
            });



            next();
        });

        app.use(express.bodyParser({
            uploadDir: __dirname + '../../apps/tmp',
            keepExtensions: true
        }));
        app.use(express.limit('5mb'));
    }
};
var express = require('express');
// Put this in `config/express.js`
module.exports.express = {
    customMiddleware: function (app) {
        app.use(function(req, res, next) {
            var uid = req.session.auth;
            if (uid){
                sData.getOne(User, {id: uid}, function(user){
                    res.locals.userauth = user;
                    req.userauth = user;
                    req.session.data = user;
                });
            }

            sSetting.getOne('general', function(setting){
                var defolt = {
                    site_name: 'MySite',
                    description: 'My simple application',
                    favicon: '',
                    language: 'en'
                };
                res.locals.site = setting || defolt;
//                res.setLocale(defolt.language);
            });

            next();
        });

        app.use(express.bodyParser({
            uploadDir: '/tmp',
            keepExtensions: true
        }));
        app.use(express.limit('5mb'));


    },

    bodyParser: function () {
        return require('express').bodyParser({
            uploadDir: './assets/images',
            limit: '1mb'
        })
    }

//    bodyParser: require ('file-parser'),
//
//    retryBodyParserWithJSON: false
};
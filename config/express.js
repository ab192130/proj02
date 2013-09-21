// Put this in `config/express.js`
module.exports.express = {
    customMiddleware: function (app) {
        app.use(function(req, res, next) {
            var uid = req.session.auth;
            if (uid){
                UserService.getOne({id: uid}, function(user){
                    res.locals.userauth = user;
                });
            }

            SettingService.getOne('general', function(setting){
                res.locals.site = setting;
            });

            next();
        });
    }
};
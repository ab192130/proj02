/**
 * SettingController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var c = 'admin'

  , r = {
        users: 'users',
        user: 'user',
        signup: 'signup'
    }

  , v = {
        error: 'error'
    }

  , l = {
        no_user_found: 'No user found',
        not_found: 'not_found',
        control_panel: 'control_panel',
        users: 'users',
        user: 'user'
    };

module.exports = {

    index: function(req, res){
        res.view(c + '/', {title: res.i18n(l.control_panel)});
    },

    users: function(req, res){
        UserService.get({}, function(users){
            if(users[0]){
                res.view(c + '/'+ r.users +'.index.ejs', {title: res.i18n(l.users), users: users});
            } else {
                req.session.auth = null;
                res.redirect('/'+ r.user +'/'+ r.signup);
            }
        });
    },

    user_get: function(req, res){
        var args = {id: req.params.id};

        UserService.getOne(args, function(user){
            if (user){
                res.view(c + '/'+ r.users +'.view.ejs', {user: user});
            } else {
                res.view(v.error, {error: res.i18n(l.not_found, res.i18n(l.user))});
            }
        });
    },

    user: function(req, res){
        var args = {id: req.params.id};

        UserService.getOne(args, function(user){
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.role = req.body.role;

            user.save(function(err){
                if (err) return res.send(err);
                res.redirect('back');
            });
        });
    },

    delete: function(req, res){
        var uid = req.session.auth;
        CommentService.delete({author: uid}, function(){});

        UserService.delete({id: req.params.id}, function(){
            res.redirect('/'+ c +'/' + r.users);
        });
    },

    comments: function(req, res){
        CommentService.get({}, function(comments){
            res.view(c +'/comments.index.ejs', {title: 'Comments', comments: comments});
        });
    },

    blogs: function(req, res){
        BlogService.get({}, function(blogs){
            res.view(c +'/blogs.index.ejs', {title: 'Blogs', blogs: blogs});
        });
    },

    general: function(req, res){
        res.view(c +'/general.index.ejs', {title: 'General'});
    }
};
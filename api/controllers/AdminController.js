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
        var uid = req.param('id');
        if(uid) {
            sData.getOne(User, {id: uid}, function(user){
                if (user){
                    res.view(c + '/'+ r.users +'.view.ejs', {user: user});
                } else {
                    sError.not_found(res, l.user);
                }
            });
        } else {
            sData.get(User, {}, function(users){
                if(users[0]){
                    res.view(c + '/'+ r.users +'.index.ejs', {title: res.i18n(l.users), users: users});
                } else {
                    req.session.auth = null;
                    res.redirect('/'+ r.user +'/'+ r.signup);
                }
            });
        }
    },

    user_get: function(req, res){
        var args = {id: req.params.id};

        sData.getOne(User, args, function(user){
            if (user){
                res.view(c + '/'+ r.users +'.view.ejs', {user: user});
            } else {
                sError.not_found(res, l.user);
            }
        });
    },

    user: function(req, res){
        var args = {id: req.params.id};

        sData.getOne(User, args, function(user){
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

//    delete: function(req, res){
//        var uid = req.session.auth;
//
////        sData.delete(Comment, {author: uid}, function(){});
//        sData.delete(Comment, {author: uid}, function(){});
//
//        sData.delete(User, {id: req.params.id}, function(){
//            res.redirect('/'+ c +'/' + r.users);
//        });
//    },

    comments: function(req, res){
        sData.get(Comment, {}, function(comments){
            res.view(c +'/comments.index.ejs', {title: res.i18n('comments'), comments: comments});
        });
    },

    blogs: function(req, res){
        sData.get(Blog, {}, function(blogs){
            res.view(c +'/blogs.index.ejs', {title: res.i18n('blogs'), blogs: blogs, cp: true});
        });
    },

    blog: function(req, res){
        var args = {id: req.params.id}
          , method = req.method
          , f = {
                title: req.body.title,
                content: req.body.content,
                privacy: req.body.privacy
            };


        sData.getOne(Blog, args, function(blog){
                if(method == 'POST'){
                    if (f.title && f.content) {
                        blog.title = req.body.title;
                        blog.content = req.body.content;
                        blog.privacy = req.body.privacy;

                        blog.save(function(err){
                            if (err) throw err;
                            res.view(c + '/blogs.edit.ejs', {title: res.i18n('edit_post'), blog: blog, message: 'Post saved!', cp:true});
                        });
                    } else {
                        sError.fill_in(res);
                    }
                } else if (req.method == 'GET') {
                    res.view(c + '/blogs.edit.ejs', {title: res.i18n('edit_post'), blog: blog, cp:true});
                } else {

                }
        });
    },

    general: function(req, res){
        res.view(c +'/general.index.ejs', {title: res.i18n('general')});
    },

    makeAdmin: function(req, res){
        var username = req.params.name;
        sData.getOne(User, {username: username}, function(user){
            user.role = 1;
            user.save(function(err){
                res.json(user);
            });

        })
    }
};
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

module.exports = cAdmin = {

    index: function(req, res){
        res.view(c + '/', {title: res.i18n(l.control_panel)});
    },

    users: function(req, res){
        var uid = req.param('id');
        var args = {id: uid};

        switch (req.method){
            case 'GET':
                if(uid) {
                    sData.getOne(User, args, function(user){
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
                break;

            case 'POST':
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
                break;

            default :
                res.send('other');
                break;

        }
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
        var bid = req.param('id');
        switch (req.method){
            case 'GET':

                if (bid){
                    sData.getOne(Blog, {id: bid}, function(blog){
                        if(blog){
                            res.view(c + '/blogs.edit.ejs', {title: res.i18n('edit_post'), blog: blog, cp:true});
                        } else {
                            sError.not_found(res, 'blog');
                        }
                    });
                } else {
                    sData.get(Blog, {}, function(blogs){
                        res.view(c +'/blogs.index.ejs', {title: res.i18n('blogs'), blogs: blogs, cp: true});
                    });
                }

                break;

            case 'POST':
                var f = {
                    title: req.body.title,
                    content: req.body.content,
                    privacy: req.body.privacy
                };

                sData.getOne(Blog, {id: bid}, function(blog){
                    if(f.title && f.content){
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

                });
                break;

            default :
                res.send('other');
                break;
        }
    },

//    blog: function(req, res){
//        var args = {id: req.params.id}
//          , method = req.method
//          , f = {
//                title: req.body.title,
//                content: req.body.content,
//                privacy: req.body.privacy
//            };
//
//
//        sData.getOne(Blog, args, function(blog){
//                if(method == 'POST'){
//                    if (f.title && f.content) {
//                        blog.title = req.body.title;
//                        blog.content = req.body.content;
//                        blog.privacy = req.body.privacy;
//
//                        blog.save(function(err){
//                            if (err) throw err;
//                            res.view(c + '/blogs.edit.ejs', {title: res.i18n('edit_post'), blog: blog, message: 'Post saved!', cp:true});
//                        });
//                    } else {
//                        sError.fill_in(res);
//                    }
//                } else if (req.method == 'GET') {
//                    res.view(c + '/blogs.edit.ejs', {title: res.i18n('edit_post'), blog: blog, cp:true});
//                } else {
//
//                }
//        });
//    },

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
    },

    modules: function(req, res){
        var mid = req.param('id');
        var a = req.param('a');
        var cmp;

        switch (req.method){
            case 'GET':
                    if(mid && a !== 'add') {
                        if ('delete' == a){
                            res.send('delete');
                        } else {
                            sData.getOne(Module, {id: mid}, function(mdl){
                                res.view(c + '/modules.edit.ejs', {title: res.i18n('modules'), module: mdl});
                            });
                        }
                    } else {
                        if('add' == a){
                            res.view(c + '/modules.add.ejs', {title: res.i18n('add_module')});
                        } else {
                            sData.get(Module, {}, function(mdls){
                                res.view(c + '/modules.index.ejs', {title: res.i18n('modules'), modules: mdls});
                            });
                        }

                    }

                break;

            case 'POST':
                cmp = req.body.components.replace(/ /g,''); //remove spaces
                cmp = cmp.split(','); //make array
                if(mid && a !== 'add'){
                    sData.getOne(Module, {id: mid}, function(mdl){
                        if(mdl){
                            mdl.name = req.body.name.toLowerCase();
                            mdl.status = req.body.status;
                            mdl.components = cmp;
                            mdl.save(function(err){
                                if(err) throw err;
                                res.redirect('/admin/modules');
                            });
                        } else {
                            sError.not_found(res, res.i18n('module'));
                        }
                    });
                } else {
                    if('add' == a){
                        sData.add(Module, {name: req.body.name, status: req.body.status, components: cmp}, function(mdl){
                            res.redirect(c + '/modules');
                        });
                    }
                }
                break;

            default:
                break;
        }
    }
};
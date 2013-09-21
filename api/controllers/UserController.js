/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var c = 'user';

var r = {
    me: 'me',
    signin: 'signin',
    signup: 'signup',
    edit: 'edit'
};

var v = {
    error: 'error'
};

var l = {
    invalid_password: 'invalid_password',
    not_found: 'not_found',
    empty_fields: 'empty_fields',
    username_is_busy: 'username_is_busy',
    username_is_not_defined: 'username_is_not_defined',
    passwords_dont_match: 'passwords_dont_match'
};

module.exports = {

  signin_get: function(req, res){
    var uid = req.session.auth;
    if (!uid){
        res.view(c + '/' + r.signin);
    } else {
        res.redirect('/');
    }
  },

  signin: function(req, res){
    var f = {username: req.body.username, password: req.body.password};

    if(f.username && f.password){
        UserService.getOne({username: f.username}, function(user){
            if(user){
                if(f.password == user.password){
                    req.session.auth = user.id;
                    UserService.gotoProfile(res);
                } else {
                    res.view(v.error, {error: res.i18n(l.invalid_password)});
                }
            } else {
                res.view(v.error, {error: res.i18n(l.not_found, res.i18n(c))});
            }
        });
    } else {
        res.view(v.error, {error: res.i18n(l.empty_fields)});
    }
  },

  signup_get: function(req, res){
      var uid = req.session.auth;
      if (!uid){
          res.view(c + '/' + r.signup);
      } else {
          res.redirect('/');
      }
  },

  signup: function(req, res){
    var f = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    if(f.username && f.password){
        UserService.getOne({username: f.username}, function(user){
            if (user){
                res.view(v.error, {error: res.i18n(l.username_is_busy)});
            } else {
                User.create({username: f.username, password: f.password, email: f.email, role: 0}, function(err, user){
                    req.session.auth = user.id;
                    res.redirect('/'+ c +'/' + r.me);
                });
            }

        });
    }
  },

  view: function(req, res){
    var name = req.params.name;

    UserService.getOne({username: name}, function(user){
        if(user){
            res.view(c + '/', {user: user, session: req.session});
        } else {
            res.view(v.error, {error: res.i18n(l.not_found, res.i18n(c))});
        }

    });
  },

  me: function(req, res){
    var uid = req.session.auth;

    UserService.getOne({id: uid}, function(user){
        if(user){
            res.redirect('/'+ c +'/' + user.username);
        } else {
            res.view(v.error, {error: res.i18n(l.not_found, res.i18n(c))});
        }
    });
  },

  signout: function(req, res){
      req.session.auth = null;
      res.redirect('/');
  },

  edit_get: function(req, res){
      var uid = req.session.auth;

      UserService.getOne({id: uid}, function(user){
          if (user){
              res.view(c + '/' + r.edit, {user: user});
          } else {
              res.redirect('/');
          }
      });
  },

  edit: function(req, res){
      var uid = req.session.auth;
      var form = {
          username: req.body.username,
          email: req.body.email,
          currpwd: req.body.current,
          newpwd: req.body.new,
          confpwd: req.body.confirm
      };

      UserService.getOne({username: form.username}, function(user){
          if (user && user.id !== uid){
              req.error = res.i18n(l.username_is_busy);
          }
      });

      UserService.getOne({id: uid}, function(user){
          if(req.body.target == 'info'){
              if(!form.username){
                  req.error = res.i18n(l.username_is_not_defined);
              }

              user.username = form.username;
              user.email = form.email;
          } else if (req.body.target == 'password'){
              if(form.currpwd && form.newpwd && form.confpwd){
                  if(form.currpwd == user.password){
                      if(form.newpwd == form.confpwd){
                          user.password = form.newpwd;
                      } else {
                          req.error = res.i18n(l.passwords_dont_match);
                      }
                  } else {
                      req.error = res.i18n(l.invalid_password);
                  }
              } else {
                  req.error = res.i18n(l.empty_fields);
              }
          }

          if(!req.error){
              user.save(function(err){
                  if(err) throw err;
                  res.redirect(c + '/' + r.me);
              });
          } else {
              res.view(v.error, {error: req.error, code: 403});
          }
      });
  },

  delete: function(req, res){
      var username = req.params.name;
      var uid = req.params.id;

      BlogService.delete({author: uid}, function(){});
      CommentService.delete({author: uid}, function(){});

      UserService.delete({id: uid}, function(){
          res.redirect('back');
      });
  },

  deleteAll: function(req, res){
      //@TODO: except authenticated user from deleting
      UserService.delete({}, function(){
          req.session.auth = null;
          res.redirect('/'+ c +'/'+ r.signup);
      });
  }


};
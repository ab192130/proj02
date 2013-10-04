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

  index: function(req, res) {
      var args = {};
      var p = {
            id: req.param('id'),
            name: req.param('name')
      };
      if (p.id) args.id = req.param('id');
      if (p.name) args.username = req.param('name');

      if (p.id || p.name){
          sData.getOne(User, args, function(user){
              if(!user){
                res.send('not_found');
              } else{
                  res.redirect(c + '/' + user.username);
              }
          });
      } else {
          sUser.gotoProfile(res);
      }
  },

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
        sData.getOne(User, {username: f.username}, function(user){
            if(user){
                if(f.password == user.password){
                    req.session.auth = user.id;
                    sUser.gotoProfile(res);
                } else {
                    sError.invalid_password(res);
                }
            } else {
                sError.not_found(res, c);
            }
        });
    } else {
        sError.fill_in(res);
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
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        email: req.body.email
    };

    if(f.username && f.password){
        sData.getOne(User, {username: f.username}, function(user){
            if (user){
                sError.username_is_busy(res);
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

    sData.getOne(User, {username: name}, function(user){
        if(user){
            res.view(c + '/', {user: user, session: req.session});
        } else {
            sError.not_found(res, c);
        }

    });
  },

  me: function(req, res){
    var uid = req.session.auth;

    sData.getOne(User, {id: uid}, function(user){
        if(user){
            res.redirect('/'+ c +'/' + user.username);
        } else {
            sError.not_found(res, c);
        }
    });
  },

  signout: function(req, res){
      sUser.signOut(req);
      res.redirect('/');
  },

  edit_get: function(req, res){
      var uid = req.session.auth;

      sData.getOne(User, {id: uid}, function(user){
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

      sData.getOne(User, {username: form.username}, function(user){
          if (user && user.id !== uid){
              req.error = res.i18n(l.username_is_busy);
          }
      });

      sData.getOne(User, {id: uid}, function(user){
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
              sError.error(res, req.error, 403)
          }
      });
  },

  delete: function(req, res){
      var username = req.params.name;
      var uid = req.params.id;

      sData.delete(Blog, {author: uid}, function(){});
      sData.delete(Comment, {author: uid}, function(){});

      sData.delete(User, {id: uid}, function(){
          res.redirect('back');
      });
  },

  deleteAll: function(req, res){
      //@TODO: except authenticated user from deleting
      sData.delete(User, {}, function(){
          req.session.auth = null;
          res.redirect('/'+ c +'/'+ r.signup);
      });
  },

  avatar: function(req, res){
      switch (req.method) {
          case 'POST':
            var image = req.files.image;
            console.log(image.name);

            sFile.get(image.path, function(file){
                var name = image.name;
                var path = './assets/images/' + name;

//                res.json(req.files.image.path);
                sFile.create(path, file, function(){
//                    res.view(c + '/avatar');
                    res.view(c + '/avatar', {image: name});
                });
            });

//            res.send(image.path);

          break;

          case 'GET':
            res.view(c + '/avatar');
          break;

          default:
            // ...
          break;

      }
  }


};
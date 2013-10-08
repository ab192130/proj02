/**
 * BlogController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var c = 'blog';

var l = {
    not_found: 'not_found',
    empty_fields: 'empty_fields',
    blogs: 'blogs',
    edit_post: 'edit_post',
    new_post: 'new_post'
};

var r = {
    add: 'add',
    edit: 'edit',
    view: 'view'
};

var v = {
    error: 'error'
};

module.exports = cBlog = {

  find: function (req, res) {
    sData.get(Blog, {}, function(blogs){
        res.json(blogs);
    });
  },

  index: function(req, res){
    var user = sUser.getCurrent(req);
    if(user) var uid = user.id;
    var a = req.param('a');
    var bid = req.param('id');
    var args = {where: {or: [{privacy: 1}, {author: uid}]}};

    sModule.view(req, Blog, {name: 'blog'}, function(cb){
        switch (cb){
            case 'view':
                console.log('viewing');
            break;

            case 'edit':
                console.log('editing');
            break;

            case 'delete':
                console.log('deleting');
            break;

            case 'list':
                console.log('listing');
            break;

            default:
                console.log('other');
            break;
        }

    });

    if(bid){
        sData.getOne(Blog, {id: bid}, function(blog){
            if(blog)
            {
                if (a == 'edit') {
                    if(sUser.canChange(user, blog)){
                        res.view(c + '/' + r.edit, {title: res.i18n(l.edit_post), blog: blog});
                    } else {
                        sError.access_denied(res);
                    }
                } else if (a == 'delete'){
                    if(sUser.canChange(user, blog)){
                        sData.delete(Comment, {parent_type: c, parent_id: bid}, function(){});

                        sData.delete(Blog, bid, function(){
                            res.redirect('/'+ c +'/');
                        });
                    } else {
                        sError.access_denied(res);
                    }
                } else {
                    sData.get(Comment, {parent_type: c, parent_id: bid}, function(comments){
                        res.header('X-XSS-Protection', 0);
                        res.view(c + '/' + r.view, {title: blog.title, blog: blog, comments: comments});
                    });
                }
            } else {
                sError.not_found(res, c);
            }
        });
    } else {
        if(uid){
                // Istifadeci admindirse
                if(user.role == 1){
                    args = {};
                }

                sData.get(Blog, args, function(blogs){
                    res.view(c + '/', {title: res.i18n(l.blogs), blogs: blogs});
                });
        } else {
            sData.get(Blog, {privacy: 1}, function(blogs){
                res.view(c + '/', {title: res.i18n(l.blogs), blogs: blogs});
            });
        }
    }

  },

  add_get: function(req, res){
    res.view(c + '/' + r.add, {title: res.i18n(l.new_post)});
  },

  add: function(req, res){
    var uid = req.session.auth;
    var args = {

        title: req.body.title,
        content: req.body.content,
        author: uid,
        privacy: req.body.privacy || 1

    };

    if(args.title && args.content)
    {
        sData.add(Blog, args, function(blog){
            res.redirect('/'+ c + '/' + blog.id);
        });
    } else {
        sError.fill_in(res);
    }
  },

  view: function(req, res){
      var bid = req.params.id;
      var args = {id: bid};

      sData.getOne(Blog, args, function(blog){
          if(blog)
          {
              sData.get(Comment, {parent_type: c, parent_id: bid}, function(comments){
                  res.header('X-XSS-Protection', 0);
                  res.view(c + '/' + r.view, {title: blog.title, blog: blog, comments: comments});
              });
          } else {
              sError.not_found(res, c);
          }
      });
  },

  edit_get: function(req, res){
      var bid = req.params.id;
      var args = {id: bid};

      sData.getOne(Blog, args, function(blog){
          if(blog) {
              res.view(c + '/' + r.edit, {title: res.i18n(l.edit_post), blog: blog});
          } else {
              sError.not_found(res, c);
          }
      });
  },

  edit: function(req, res){
      var bid = req.params.id
        , title = req.body.title
        , content = req.body.content
        , privacy = req.body.privacy
        , args = ({id: bid});

      sData.getOne(Blog, args, function(blog){
          blog.title = title;
          blog.content = content;
          blog.privacy = privacy;
          blog.save(function(err){
              if (err) throw err;
              res.redirect('/'+ c +'/' + blog.id);
          });
      });
  },

  delete: function(req, res){
      var args = {id: req.params.id};

      sData.delete(Comment, {parent_type: c, parent_id: args.id}, function(){});

      sData.delete(Blog, args, function(){
          res.redirect('/'+ c +'/');
      });
  },

  deleteAll: function(req, res){
      sData.delete(Blog, {}, function(){
          res.redirect('back');
      });
  }
};

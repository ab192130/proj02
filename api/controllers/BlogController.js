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
    edit_post: 'edit_post'
};

var r = {
    add: 'add',
    edit: 'edit',
    view: 'view'
};

var v = {
    error: 'error'
};

module.exports = {

  find: function (req, res) {
    BlogService.get({}, function(blogs){
        res.json(blogs);
    });
  },

  index: function(req, res){
    BlogService.get({}, function(blogs){
        res.view(c + '/', {title: res.i18n(l.blogs), blogs: blogs});
    });
  },

  add_get: function(req, res){
    res.view(c + '/' + r.add, {title: res.i18n('new_post')});
  },

  add: function(req, res){
    var uid = req.session.auth;
    var args = {

        title: req.body.title,
        content: req.body.content,
        author: uid

    };

    if(args.title && args.content)
    {
        BlogService.add(args, function(blog){
            res.redirect('/'+ c + '/' + blog.id);
        });
    } else {
        res.view(v.error, {error: res.i18n(l.empty_fields)});
    }
  },

  view: function(req, res){
      var bid = req.params.id;
      var args = {id: bid};

      BlogService.getOne(args, function(blog){
          if(blog)
          {
              CommentService.get({parent_type: c, parent_id: bid}, function(comments){
                  res.header('X-XSS-Protection', 0);
                  res.view(c + '/' + r.view, {title: blog.title, blog: blog, comments: comments});
              });
          } else {
              res.view(v.error, {error: res.i18n(l.not_found, res.i18n(c))});
          }
      });
  },

  edit_get: function(req, res){
      var bid = req.params.id;
      var args = {id: bid};

      BlogService.getOne(args, function(blog){
          if(blog) {
              res.view(c + '/' + r.edit, {title: res.i18n(l.edit_post), blog: blog});
          } else {
              res.view(v.error, {error: res.i18n(l.not_found, res.i18n(c))});
          }
      });
  },

  edit: function(req, res){
      var bid = req.params.id
        , title = req.body.title
        , content = req.body.content
        , args = ({id: bid});

      BlogService.getOne(args, function(blog){
          blog.title = title;
          blog.content = content;
          blog.save(function(err){
              if (err) throw err;
              res.redirect('/'+ c +'/' + blog.id);
          });
      });
  },

  delete: function(req, res){
      var args = {id: req.params.id};

      CommentService.delete({parent_type: c, parent_id: args.id}, function(){});

      BlogService.delete(args, function(){
          res.redirect('/'+ c +'/');
      });
  },

  deleteAll: function(req, res){
      BlogService.delete({}, function(){
          res.redirect('back');
      });
  }
};

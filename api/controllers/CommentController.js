/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var v = {
    error: 'error'
};

module.exports = {

  add: function (req, res) {

      var a = {
          content: req.body.content,
          author: req.session.auth,
          parent_type: req.params.ptype,
          parent_id: req.params.pid
      };

//      res.json(a);

      if(a.content && a.parent_type && a.parent_id){
          CommentService.add(a, function(comment){
              res.redirect('back');
          });
      } else {
          res.view(v.error, {error: res.i18n('empty_fields')});
      }
  },

  delete: function(req, res) {
      CommentService.delete({id: req.params.id}, function(){
          res.redirect('back');
      });
  },

  deleteAll: function(req, res) {
      CommentService.delete({}, function(){
          res.redirect('back');
      });
  }


};

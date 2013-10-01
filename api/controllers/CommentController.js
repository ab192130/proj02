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
          sData.add(Comment, a, function(comment){
              res.redirect('back');
          });
      } else {
          sError.fill_in(res);
      }
  },

  delete: function(req, res) {
      sData.delete(Comment, {id: req.params.id}, function(){
          res.redirect('back');
      });
  },

  deleteAll: function(req, res) {
      sData.delete(Comment, {}, function(){
          res.redirect('back');
      });
  }


};

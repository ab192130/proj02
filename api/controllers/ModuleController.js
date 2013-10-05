/**
 * ModuleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req, res){
      switch (req.params.module){
          case 'user':
              cUser.index(req, res);
          break;

          case 'blog':
              cBlog.index(req, res);
          break;

          case 'admin':
              isAdmin(req, res, function(){
                  cAdmin.index(req, res);
              });
          break;

          default :
              res.send('unknown');
          break;
      }
  }
  

};

/**
 * ModuleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req, res){
      if(req.params.module == 'user'){
        cUser.index(req, res);
      }

      if(req.params.module == 'admin'){
        cAdmin.index(req, res);
      }

      if(req.params.module == 'blog'){
        cBlog.index(req, res);
      }
//      res.view('home');
  }
  

};

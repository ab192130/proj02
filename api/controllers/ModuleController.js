/**
 * ModuleController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req, res){
      var name = req.params.module;
      sData.getOne(Module, {name: name}, function(mdl){
            var string = mdl.name;
            var string = string.charAt(0).toUpperCase() + string.slice(1);
            var string = 'c' + string;
            var myobj = eval(string);

//            res.send(myobj);
          switch (name){
              case mdl.name:
                myobj.index(req, res);
//                  res.send(mdl['c' + name]);
              break;

          }
      });

//      switch (req.params.module){
//          case 'user':
//              cUser.index(req, res);
//          break;
//
//          case 'blog':
//              cBlog.index(req, res);
//          break;
//
//          case 'admin':
//              isAdmin(req, res, function(){
//                  cAdmin.index(req, res);
//              });
//          break;
//
//          default :
//              res.send('unknown');
//          break;
//      }
  },

  create: function(req, res){
      var name = req.params.module;
      sData.getOne(Module, {name: name}, function(mdl){
        if(!mdl){
            sData.add(Module, {name: req.params.module, status: 1, policy: 'admin'}, function(mdl){
                    res.json(mdl);
            });
        } else {
            res.json({success: false});
        }
      });

  }


};

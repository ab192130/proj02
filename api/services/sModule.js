exports.view = function(req, modl, args, callback){
    var p
      , id
      , edit
      , del
      , a = req.param('a')
      , cb;

    sData.getOne(Module, args, function(mdl){
       if(mdl){
//           p = mdl.params;
//           id = p.indexOf('id');
//           edit = p.indexOf('edit');
//           del = p.indexOf('delete');
           if(req.param('id')){
               if(a == 'edit'){
                   cb = 'edit';
               } else if (a == 'delete'){
                   cb = 'delete';
               } else {
                   cb = 'view';
//                   sData.getOne(mdl.model_name, mdl.model_args, function(item){
//                       res.view(mdl.name + '/view', {item: item})
//                   });
               }
           } else {
               cb = 'list'
           }

           callback(cb);
       } else {
           cb = 'NaN';
           callback(cb);
       }
    });


};
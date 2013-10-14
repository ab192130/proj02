
    module.exports = function(req, res, ok){
        ok();

////        res.send(req.target);
//        var module = req.target.controller;
//        var component = req.target.action; //typed component (action)
//        var cmp; //stored component (action)
//
//        sData.getOne(Module, {name: module}, function(mdl){
//            if(mdl && mdl.status == 1) {
//                cmp = mdl.components;
//                cmp = cmp.indexOf(component); //check array for element
//
//                if(-1 !== cmp){
//                    ok();
//                } else {
//                    sError.not_found(res, 'Page');
//                }
//            } else {
//                sError.not_found(res, 'Page');
//            }
//        });
    };
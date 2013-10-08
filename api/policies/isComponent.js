
    module.exports = function(req, res, ok){

//        res.send(req.target);
        var module = req.target.controller;
        var component = req.target.action;
        var cmp;

        sData.getOne(Module, {name: module}, function(mdl){
            cmp = mdl.components;
            cmp = cmp.indexOf(component);

            if(mdl && mdl.status == 1) {
                if(-1 !== cmp){
                    console.log('cmp');
                    ok();
                } else {
                    console.log('not cmp');
                    sError.not_found(res, 'Page');
                }
            } else {
                sError.not_found(res, 'Page');
            }
        });
    };

    module.exports = function(req, res, ok){

//        res.send(req.target);
        var module = req.target.controller;
        var component = req.target.action;

        sData.getOne(Module, {name: module}, function(mdl){
            if(mdl && mdl.status == 1) {
                console.log('ok');

                ok();
            } else {
                sError.not_found(res, 'Page');
            }
        });
    };
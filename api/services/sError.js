    //Error template (view) name
    var error = 'error';

    exports.not_found = function(res, item){
        res.view(error, {error: res.i18n('not_found', res.i18n(item))});
    };

    exports.fill_in = function(res, item){
        res.view(error, {error: res.i18n('empty_fields')});
    };

    exports.access_denied = function(res){
        res.view(error, {error: res.i18n('access_denied'), code: 403})
    };

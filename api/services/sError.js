    //Error template (view) name
    var error = 'error';

    exports.error = function(res, err, code) {
        res.view(error, {error: err, code: code});
    };

    exports.not_found = function(res, item){
        res.view(error, {error: res.i18n('not_found', res.i18n(item))});
    };

    exports.fill_in = function(res){
        res.view(error, {error: res.i18n('empty_fields')});
    };

    exports.access_denied = function(res){
        res.view(error, {error: res.i18n('access_denied'), code: 403});
    };

    exports.invalid_password = function(res){
        res.view(error, {error: res.i18n('invalid_password')});
    };

    exports.username_is_busy = function(res){
        res.view(error, {error: res.i18n('username_is_busy')});
    };

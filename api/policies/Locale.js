/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {
    sSetting.getOne('general', function(setting){
        res.setLocale(setting.language);
    });
    console.log(res.getLocale());
    return ok();
};
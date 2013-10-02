/**
 * SettingController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

    add: function(req, res){
        var f = {
            type: req.body.type,
            site_name: req.body.site_name,
            description: req.body.description,
            favicon: req.body.favicon
//            language: req.body.language
        };

        sSetting.getOne(f.type, function(setting){
            if(!setting){
                Setting.create({

                    type: setting.type,
                    site_name: f.site_name,
                    description: f.description,
                    favicon: f.favicon
//                    language: f.language

                }, function(err, setting){
                    res.json(setting);
                });
            } else {
                setting.site_name = f.site_name;
                setting.description = f.description;
                setting.favicon = f.favicon;
//                setting.language = f.language;
                setting.save(function(err){
                    if (err) throw err;
                    res.json(setting);
                });
            }
        });
    }

};

/**
 * HomeController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req, res){
    res.view('home');
  },

  install: function(req, res){
      console.log('Application installing started...');

      sData.getOne(User, {username: 'admin'}, function(user){
          if(!user){
              sData.add(User, {username: 'admin', password: 'admin', email: 'admin@gmail.com', role: 1}, function(user){
                  console.log('Admin user created...');
              });
          } else {
              res.send('error! couldn\'t create admin user');
          }
      });

      sData.add(Setting, {type: 'general', site_name: 'MySite', description: 'My simple application', favicon: '', language: 'en'}, function(setting){
          console.log('Settings added...');
      });

      console.log('Application successfully installed!');
  }
  

};

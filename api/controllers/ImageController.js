/**
 * ImageController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */



module.exports = {

  upload: function (req, res) {
      var image = req.files.image;
//      console.log(image.name);
      FileService.get(image.path, function(file){
          var name = image.name;
          var path = './assets/images/' /* + name */;

//          res.json(req.files.image.path);
//          FileService.create(path, file, function(){
//                res.redirect('images/' + name);
//          });

          FileService.move(image.path + '/' + name, path, function(){
//                res.view(c + '/avatar');
//                res.header('Content-Type', 'image/jpeg');
                res.redirect('images/' + name);
          });
      });
  }

};

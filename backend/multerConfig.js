var path = require('path');
var multer  =  require('multer');


var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
                        cb(null, 'uploads');
                    },
        filename: function (req, file, cb) {
                    var ext = path.extname(file.originalname);
                    console.log("in config 12---trying to upload --"+file.fieldname.slice(0,3) + '-' + Date.now()+"."+ext)
                    cb(null, file.fieldname.slice(0,3) + '-' + Date.now()+"."+ext);
                }
  }

//   resume-234763458969876.jpg
  
  )

  
  var multerOptions = { storage: storage,
                        fileFilter: function(req,file,callback){
                                        var ext = path.extname(file.originalname);
                                        var fieldName = file.fieldname;

                                        if(fieldName=="productimage")
                                        {
                                            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.JPG' && ext !== '.PNG') {
                                                return callback(new Error('Only images are allowed'));
                                            }
                                            callback(null, true);
                                        }
                                      
                                    }
                      }
   
  var upload = multer(multerOptions).fields([{name:"productimage", maxCount:1}]);
// const upload = multer({storage: storage, fileFilter : fileFilter});


  module.exports=upload;
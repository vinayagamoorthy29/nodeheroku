
const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
//var upload = multer({ dest: 'upload/'});
/*var fs = require("fs");
var type = upload.single('recfile');
var formidable = require('formidable');*/
var path = require('path');     //used for file path
var fs =require('fs-extra'); 
const app = express();
//require('./config/prod')(app);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
//app.use(upload.array()); 
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {
  var fileObj = {
        "image/png": ".png",
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg"
      };
      if (fileObj[file.mimetype] == undefined) {
        callback(new Error("file format not valid"));
      } else {
        callback(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
      }  
    //callback(null, file.originalname+ '-' + Date.now());  
  }  
});  
var upload = multer({ storage : storage}).single('recfile');  
  
 
app.get('/first_template', function(req, res){
   res.render('first_view', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});
app.get('/', function(req, res){
   res.render('home_view', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});
app.post('/reform', function(req, res){
  upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        console.log(req);
        res.end("File is uploaded successfully!");  
    });  
   /*var tmp_path = req.file.path;

  
  var target_path = 'uploads/' + req.file.originalname;

 
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { res.render('complete'); });
  src.on('error', function(err) { res.render('error'); });*/

});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
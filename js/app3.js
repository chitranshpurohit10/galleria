const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// default option
app.use(fileUpload());

// Static Files
app.use(express.static('style'));
app.use(express.static('upload'));


// template engine
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// app.get("",(req,res)=>{
//     res.render("in");
// });

// app.post("",(req,res)=>{
//     let sampleFile;
//     let uploadPath;

//     if(!req.files || Object.keys(req.files).length === 0){
//         return res.status(400).send("No files were uploaded");
//     }

//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + "/upload/" + sampleFile.name;
//     console.log(sampleFile);

//     sampleFile.mv(uploadPath,function(err){
//         if(err) return res.status(500).send(err);
//     });


//     res.send("File Uploaded");
// });


const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});
// // Connection Pool
// var conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'user'
// });






app.get('', (req, res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected");

    
    connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
      if (!err) {
        res.render('in', { rows });
      }
    });
});
});



app.post('', (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/upload/' + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected");

      connection.query('UPDATE user SET timage = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
      });
    });
    // res.send("File uploaded");
});
});

function viewImage(){
    app.get('', (req, res) => {

        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log("Connected");
    
        
        connection.query('SELECT timage FROM user WHERE id = "1"', (err, rows) => {
          if (!err) {
            res.render( { rows }, {timage});
          }
        });
    });
    });
}


app.listen(port, () => console.log(`Listening on port ${port}`));


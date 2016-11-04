/*
Packages
1. express - routing
2. Body Parser - post method request
3. EJS - for templating and rendering the data to HTML pages
4. nodemailer -  sending mail
*/

var express = require("express");
var bodyParser = require('body-parser')

var app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

// static routing
app.get("/", function(req, res){
    res.render("index");
});
app.get("/contact", function(req, res){
    //res.sendFile(__dirname + "/html/contact.html");
    res.render("contact");
});
//dynatic routing

app.get("/profile/:id",function(req, res){
   var data = {person: req.params.id};
   //getting query string like /profile?name=john&age=23
   //var qs = req.query();
   res.render("profile", data);
});

// POST /login gets urlencoded bodies 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})


app.listen(8080);
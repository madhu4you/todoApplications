//include require 
var express = require("express");
var http = require('http');
var bodyParser = require("body-parser");
//include the controllers
var todoController = require("./controllers/todoController");
//start the app
var app = express();
//set the template engin
app.set("view engine", "ejs");
//static files using Middleware
app.use("/assets", express.static("assets"));

//fire controllers
todoController(app);


//listen port
app.listen("8080");
console.log("Server is running in http://127.0.0.1:8080");
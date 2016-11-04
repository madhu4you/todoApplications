//creaating the servers
var http = require("http");
var fs = require("fs");
var path = require('path');
global.appRoot = path.resolve(__dirname);
console.log(appRoot);
//client server request and response
var server = http.createServer(function(req, res){
    console.log("request are made in URL: "+ req.url);
    if(req.url == "/home" || req.url =="/") {
        res.writeHead(200, {'Content-Type':'text/html'});
        // reading file in stream and pushing to pipe, pipe is writing to response of the server
        fs.createReadStream(__dirname + '/html/index.html', {encoding: 'utf8'}).pipe(res);
    } else if(req.url=="/contact") {
        res.writeHead(200, {'Content-Type':'text/html'});
        // reading file in stream and pushing to pipe, pipe is writing to response of the server
        fs.createReadStream(__dirname + '/html/contact.html', {encoding: 'utf8'}).pipe(res);
    }else if(req.url == "/about") {
        res.writeHead(200, {'Content-Type':'text/html'});
        // reading file in stream and pushing to pipe, pipe is writing to response of the server
        fs.createReadStream(__dirname + '/html/about.html', {encoding: 'utf8'}).pipe(res);
    }else if(req.url == '/api/person'){
        res.writeHead(200, {'Content-Type':'application/json'});
        // reading file in stream and pushing to pipe, pipe is writing to response of the server
        var person = {
            name: 'Madhu',
            age: '30',
            place: 'india',
            salary: '5000'
        }
        res.end(JSON.stringify(person));
    }else {
        res.writeHead(200, {'Content-Type':'text/html'});
        // reading file in stream and pushing to pipe, pipe is writing to response of the server
        fs.createReadStream(__dirname + '/html/404.html', {encoding: 'utf8'}).pipe(res);
    }
});
server.listen(8080, '127.0.0.1');
console.log("Server runs in 127.0.0.1:8080");
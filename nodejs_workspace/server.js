//creaating the servers
var http = require("http");
var fs = require("fs");
//client server request and response
var server = http.createServer(function(req, res){
    console.log("request are made in URL: "+ req.url);
    res.writeHead(200, {'Content-Type':'text/plain'});
    //res.end("Hello Madhu");

    // reading file in stream and pushing to pipe, pipe is writing to response of the server
    var myReadStream = fs.createReadStream(__dirname + '/data.txt', {encoding: 'utf8'});
    myReadStream.pipe(res);
});
server.listen(8080, '127.0.0.1');
console.log("Server runs in 127.0.0.1:8080");
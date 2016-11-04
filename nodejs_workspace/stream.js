//- Writable streams - allow node js to send and write data to a streams
//- Readable streams - allow node js to read the dataa from streams
//- Duplex - can read and write the streams

var http = require("http");
var fs = require("fs");
//read streams
var myReadStream = fs.createReadStream(__dirname + '/data.txt', {encoding: 'utf8'});

//write the streams
var myWriteStream = fs.createWriteStream(__dirname + '/writeData.txt');

//read chunk
/*myReadStream.on("data", function(chunk){
    console.log("New chunk received:");
    console.log(chunk);

    //write chunk
    myWriteStream.write(chunk);
});*/

myReadStream.pipe(myWriteStream);


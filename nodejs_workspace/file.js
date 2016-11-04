//example for the read the file
//syncrose method
var fs = require("fs");

var readMe = fs.readFileSync("readMe.txt", "utf8");
console.log(readMe);

fs.writeFileSync("writeMe.txt", readMe);

//async method

fs.readFile("readMe.txt", "utf8", function(err, data){
    console.log(data);
    fs.writeFile("writeMeNew.txt", data);
});

//example for delete the file
//fs.unlink("readMe.txt");
fs.unlink("writeMe.txt");
fs.unlink("writeMeNew.txt");

//example for creating the directory
// syncrose mode

fs.mkdirSync("stuff");

//async mode
fs.mkdir("reader", function(){
    fs.readFile("readMe.text", "utf8", function(err, data){
        fs.writeFile(__dirname +"/reader/writeMe.txt", data);
    });
});

// example for deleting the directory
//syncrose mode
fs.rmdirSync("stuff");

// remove the file and directory

fs.unlink(__dirname + "/reader/writeMe.txt", function(){
    fs.rmdir("reader");
});
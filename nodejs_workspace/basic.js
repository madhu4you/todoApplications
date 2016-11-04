//Node JS Examples
//console
console.log("Hello World !!");
//get directory name
console.log(__dirname);
//get file name
console.log(__filename);
// function methods
sayHi();
function sayHi() {
    console.log("Hi");
}
//function expression
var sayBye = function(){
    console.log("Bye");
}
sayBye();
//require and module
var stuff = require("./stuff");
console.log(stuff.counter([1,2,3,4,5,6,7,8,9,0]));
console.log(stuff.add(10,20));
console.log(stuff.pi);

//event module

var events = require("events");
var myEmitter = new events();
myEmitter.on("someEvent", function(msg){
    console.log(msg);
})

myEmitter.emit("someEvent", "Event is triggered");

//event module inherit to our object
var util = require('util');
var person = function(name){
    this.name = name;
}
util.inherits(person, events); //events is a object created line num 26

var madhu = new person("Madhu");
var chandu = new person("Chandu");
var people = [madhu, chandu];
people.forEach(function(single){
    single.on("speak", function(msg){
        console.log(this.name +" said: " +msg);
    });
})

madhu.emit("speak", "How are you? whats going on?");
chandu.emit("speak", "I am good, How about you?");


/* one way of writing the module export
var counter = function(arr){
    return "The length of an array is " +arr.length;
}

var add = function(a,b) {
    return "sum of 2 numbers are " + (a+b);
}

var pi = 3.214;

module.exports.counter = counter;
module.exports.add=add;
module.exports.pi=pi;
*/
//Easiest way of writing the module export
module.exports.counter = function(arr){
    return "The length of an array is " +arr.length;
}

module.exports.add = function(a,b) {
    return "sum of 2 numbers are " + (a+b);
}

module.exports.pi = 3.214;
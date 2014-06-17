/*(function($, Yahoo) {
	//TODO:
	//
	//
	//

}(jquery, Yahoo));

var blogModule = (function() {
	var my = {},
		privateName = "blog";

	function privateAddTopic(data) {
		//TODO:

	}

	my.Name = privateName;
	my.AddTopic = function(data) {
		privateAddTopic(data);
	};

	return my;
})*/


// function makeCounter() {
// 	var i = 0;

// 	return function() {
// 		alert(++i);
// 	}
// }

// var counter = makeCounter();
// counter();
// counter();

// var counter2 = makeCounter();
// counter2();
// counter2();
// var BaseCalculator = function() {
// 	this.decimalDigits = 2;
// }

// BaseCalculator.prototype = {
// 	add: function(x, y) {
// 		return x + y;
// 	},
// 	subtract: function(x, y) {
// 		return x - y;
// 	}
// }
// Object.prototype.x  = 10;
// var w = 20,
// 	y = 30;
// alert(x);

// (function foo(){
// 	var w = 40;
// 	var x = 100;
// })
// function foo(){
// 	var x = 1;
// 	return function(){
// 		alert(x);
// 	}
// }

// var bar = foo();
// bar();
// eval('x=2',bar);
// bar();
// var foo = {
// 	bar:function(){
// 		alert(this);
// 		alert(this === foo);
// 	}
// }

// foo.bar();

// var exampleFunc = foo.bar;
// alert(exampleFunc === foo.bar);

// exampleFunc();
// function testFn(){
// 	var localVar = 10;

// 	function innerFn(innerParam){
// 		alert(innerParam + localVar);
// 	}

// 	return innerFn;
// }

// var someFn = testFn();
// someFn(20);

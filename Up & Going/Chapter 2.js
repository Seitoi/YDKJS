/* The return value of operatior is always
    one of seven string values  */
var a;
typeof a;   //"undefined"

a = "hello world";
typeof a;   //"string"

a = 42;
typeof a;   //"number"

a = true;
typeof a;   // "boolean"

a = null;
typeof a;   //"object" --weird, bug

a = undefined;
typeof a;   // "undefined"

a = {b: "c"};
typeof a;   // "object"

//seventh is "symbol" type

/* The object type refers to a compound value
    where you can set properties that hold their own values */
var obj = {
        a: "hello word",
        b: 42,
        c: true;
};
obj.a;  //obj["a"];   "hello world"
obj.b;  //obj["b"];   42
obj.c;  //obj["c"];   true

/* An array is similar to an object but instead called upon numberically */
var arr = [
        "hellow wordl",
        42,
        true
      ];
arr[0];     // "hello world"
arr[1]      // 42
arr[2];     // true
arr.length; // 3

//Best way to use, array for numberically positions, object for named properties

//Explicit coercion - you can see the conversion in the code
//Implicit coercion - happens behind the scenes
var a = "42";
var b = Number(a);
a;    //"42"
b;    //42  <--the actual number!

var a = "42";
var b = a * 1;    //"42" implicily coerced to 42 cuz of math
a;    //"42"
b;    //42 <--the number!

/* Truthy & Falsy */
//list of "fasly" values in JS
"" (empty string)
0,-0,NaN (invalid number)
null, undefined
false
//everthing else is "truthy"

/*Equality */
var a = "42";
var b = 42;

a == b;     // true   checks value equality with coercion allowed
a === b;    // false  strict equality, checks for same type and value

/* WHEN TO use
      If either value in comparison could be true or false, AVOID ==
      If either value in caomparison could be these specific values : 0, "", or []  AVOID ==
      In all other cases use == */

/*Inequality*/
//the operators follow the same rule as ==
var a = 41;
var b = "42";
var c = "43";

a < b;    //true    the values are coerced into numbers, regardless of string
b < c;    //true
//however different value types cause interesting results
var d = "foo";

a > d;    // false
a < d;    // false
a == d;   // false
//"foo" is coerced into "invalid number value" (NaN)

/* Variables

variable names must be valid indentifiers
An indentifiers must start with a - z, A - Z, $, or _ then can contain numerals 0-9

However, there are reserved words that can't be used as indentifiers:
for in  if (functions)  null  true  false */

/* Hoisting, when a variable declaration is taken to the entire scope */
var a = 2;
foo();

function foo(){
  a = 3
  console.log (a);    //3
  var a;            //declaration is hoisted to the top of function foo()
}
console.log (a); //2

//DO NOT RELY ON HOISTING, much more common practice to
// use hoisted function declaration (like foo())

/* Nested Scopes - variable is available anywhere in the scope, as well as lower/inner levels */
function foo() {
        var a = 1;
        function bar(){
          var b = 2;
          function baz (){
            var c = 3;
            console.log (a, b, c);  //1 2 3
          }
          baz();
          console.log (a, b);   //1 2
        }
        bar()
        console.log (a); // 1
}
foo();

function foo(){
        var a = 1;
        if (a >= 1){
          //Es6 "lets" you declare variables to belong to certain blocks
            let b = 2;      //variable "b" will only belong to the if statement, not the whole function foo()
            while (b < 5) {
                let c = b *2;
                b++;
                console.log (a + c);
            }
        }
}
foo();  // 5 7 9

/*Condtitionals - if/else vs Switch */
if (a == 2) {
  //do something
}
else if (a == 10) {
  //do something
}
else if (a == 42) {
  //do yet another thing
} else {
    //fallback to here
}

switch (a){
      case 2:
              //do something
              break;        // <-- break is important if you want only the statement in one case to run. Otherwise it will run regardless if it matches. (sometimes useful)
      case 10:
              //do something else
              break;
      case 42:
              //do yet another thing
              break;
      default:
              //fallack to here
}

//ternary operator
var a = 42;
var b = (a > 41) ? "hello" : "world";   /*  <-- Similar to:     if (a > 41) {
  if true, first clause "hello" runs                              b = "hello";
                                                                }
                                                                else {
                                                                  b = "world";
                                                                }
                                                                                          */

/* Strict Mode */
//Es5 added strict mode, tightens rules and makes code more optimazable by the engine
//strict mode follows the nested rules
function foo(){
          "use strict";   //Enables strict mode
          function bar(){
            //this code is strict mode
          }
}
//this code will not be in strict mode
//strict mode disallows the implicit auto-global variable declaration (A good thing!)
//declaring a variable/function is not the same as executing it!

/* Closures */ //<- Very important!
function makeAdder( x ){
        //parameter 'x' is an inner variable
        //inner function 'add()' uses 'x', so
        //it has a "closure" over it
        function add( y ) {
              return y + x;
        };
        return add;
}
var plusOne = makeAdder ( 1 );      //<-- this function is a reference function
var plusTen = makeAdder ( 10 );     // it referes back to the inner add() function that remembers x as 1 (plusOne) or 10 (plusTen)

plusOne( 3 );   //4 <-- 1 + 3         When we call pluOne(3) it adds 3 (its inner y) to the 1 (remembered by x) and we get 4
plusOne( 41 );  //42 <-- 41 + 1
plusTen ( 13 ); //23 <-- 13 + 10

/* Modules - code that is hidden from the outside but has public API that is accessable from the outside */
function User(){                                    //<-- outer scope
      var username, password;
      function doLogin( user, pw ){           //<-- inner details that cannot be accessed
          username = user;                  //<-- has closure from doLogin, meaning it will retain its access to them even after function finishes running
          password = pw;
          //do the rest of the log in work
      }
      var publicAPI = {
          login: doLogin
      };
      return publicAPI;
}

//create a "user" module instance
var fred = User();
fred.login( "fred" , "12Battery34!");

/* this indentifiers - this usually points to an object, but the object depends how it was called */
function foo(){
        console.log( this.bar );
}
var bar = "global";
var obj1 = {
        bar: "obj1"
        foo: foo
};
var obj2 = {
        bar: "obj2"
};
//----
foo();      // "global"   non-strict mode. In strict-mode it would come out undefined
obj1.foo(); // "obj1"
foo.call( obj2 ); //"obj2"
new foo();   // undefined new goo() sets this to a brand new empty project

/* Prototypes */
//when you reference a property on ana object, if that object doesn't exist, JS will use that object's internal PROTOTYPE to find another object to fill in
var foo = {
  a: 42
};
//create 'bar' and link it to 'foo'
var bar = Object.create( foo );
bar.b = "hello world";

bar.b;  //<--- "hello world"
bar.a;  //<-- 42 assigned to foo

/* New features in old browsers
      two techniques to bring in the newer JS called
          polyfilling and transpiling  */
//polyfilling - taking the definition of a newer feature and providing a code that's equivalent
//for example Number.isNaN(..) checks for NaN values in newer Es6 browsers
if (!Number.isNaN){
        Number.isNaN = function isNaN( x ) {
          return x! == x;                             //NaN value is the only one that would make x !== x be true
    };
}
//you can search up polyfills that are provided by other programmers

//transpiling - a tool that converts newer code (syntax) into older code equivalents (older syntax)
//new syntax is added to make your code more readable and maintainable. You SHOULD prefer to write newer and cleaner code
//new syntax takes advantage of broswer performance optimizations
//Allows for easier testing

//Es6 adds a "default parameter value" which auto assigns values
function foo( a = 2 ){
      console.log( a );
}
foo();    // 2
foo( 42 );  //42
foo( 23 );  //23

//older syntax to make the new feature work in older browsers
function foo () {
      var a = arguments[0] !== ( void 0 ) ? arguments[0] : 2;       //checks to see if the 'arguments[0]' value is 'void 0' (aka undefined), and if so provides default value 2
      console.log( a );
}

/* non-JS code */
var el = document.getElementById( "foo" );
//the 'document' variable exists as a global variable when your code is running in a broswer
// a special 'object' called a "host object"
// 'getElementById' is not JS, but an interface to a built-in method provided by the DOM from your browsers
//traditonally the DOM and its behavior is impplemented in something more like C/C++

alert(..)
//provided to your JS program by the broswer.

console.log()
//broswer

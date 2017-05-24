/*Hiding in plain Scope 

  Principle of Least Priviledge (aka Least Authority) - in the design of software, such as API for module/object,
    you should expose only what is minimally necessary.
      and "hide" everything else.                       */
function doSomething ( a ) {
  b = a + doSomething( a * 2 );
  console.log( b * 3 );
}

function doSomethingElse( a ) {
  return a - 1;
}

var b;

doSomething( 2 ); //15

//a more "proper" design

function doSomething( a ) {
  function doSomethingElse( a ) {
    return a - 1;
  }

  var b;

  b = a + doSomethingElse( a * 2 );

  console.log( b * 3 );
}

doSomething( 2 ); //15

//Hiding also avoids unintended collision between two different identifiers
function foo() {
  function bar (a) {
    i = 3;    //changing the 'i' in the enclosing scope's for - loop
    console.log ( a + i );
  }

  for (var i=0; i<10; i++) {
    bar( i * 2 ); //oops, infiinite loop ahead!
  }
}

foo();

// i will always equal 3 because of the declaration. for-loop will be an infinite.

/* In JS, you don't need to declare a named function or call the function by name to execute */
var a = 2;

(function foo() {     //function inside a parantheses treats the function as a function-expression vs standard declaration

  var a = 3;
  console.log( a ); // 3

})(); // this is closing the function-expression which executes the function

console.log ( a );  // 2
//foo function is bound in the second scope (within parantheses) and thus it hides the name foo creating "good" software

/* Anonymous functions */

setTimeout( function(){     // function has no name thus making it Anonymous. Function declaration always require names. function expressions can be Anonymous.
  console.log("I waited 1 second!");
}, 1000 );

/* Downside
  - Anonymous functions have no useful name to dsiplay in stack traces, makes debugging more difficult
  - Without a name, if the function needs to refer itself, for recursion, etc., the deprecated arguements.callee reference is unfortunately required.
  -Anonymous functions omit a name that is often helpful in providing more readable/understandable code. A descriptive name helps self -document the code in question
Don't be detured. Function expressions are powerful. An easy solution is to name your function expressions
  */

setTimeout( function timeoutHandler(){  //it now has a name!
  console.log ("I waited 1 second!" );
}, 1000 );

/* Immediately Invoked Function Expressions - IIFE */
// (function foo(){ .. })()     or      (function(){ .. }())
// purely a stylistic choice, works the same way

//you can also pass in argument(s)
var a = 2;

(function IIFE( global ){

  var a = 3;
  console.log( a ); //3
  console.log( global.a ); // 2

})( window );

console.log ( a ); //2

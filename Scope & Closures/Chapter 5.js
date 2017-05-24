/* Closure - when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope. */

function foo() {
  var a = 2;

  function bar () {
    console.log( a );
  }

  return bar;
}

var baz = foo();
baz(); // 2 <-- whoa, closure was just observed many

/* now I can see */
function wait(message) {

  setTimeout( function timer() {
    console.log( message );
  }, 1000 );
}
wait ("hello, closure!");

//callback functions are closures

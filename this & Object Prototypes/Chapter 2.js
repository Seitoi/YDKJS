/* Call-site - the location in code where a function is called (NOT WHERE IT'S DECLARED) */
function baz() {
  //call-stack i s: 'baz'
  //so, our call-site is in the global scope

  console.log( "baz" );
  bar(); //<-- call-site for 'bar'
}

function bar() {
  //call-stack is: 'baz' -> 'bar'
  //so, our call-site is in 'baz'

  console.log( "bar" );
  foo(); //<-- call-site for 'foo'
}

function foo() {
  //call-stack is: 'baz' -> 'foo'
  //so, our call-site is in 'bar'

  console.log( "foo" )
}
baz(); //<--call-site for 'baz'

//Default binding

function foo() {
  console.log( this.a );
}

var a = 2;    //variables declared in the global scope are synonymous with global-object properties
foo(); //2

//even though the overall 'this' binding rules are entirely based on the call-site, global object is ONLY
//eligible for the default binding if the contents of foo() are not running in strict mode

function foo() {
  console.log( this.a );
}
var a = 2;

(function() {
  "use strict"
  foo(); //2
})();
//mixing strict and non-strict mode is frowned upon
//however, sometimes you include a third-party library that has different strict'ness

/*implicit binding- when there is a context object for a function reference, the implicit binding rule says that it's 'that' object
which should be used for the function call's 'this' binding */
function foo() {
  console.log( this.a );  //because 'obj' is the 'this' for the 'foo()' call, 'this.a' is synonymous with obj.a
}

var obj = {
  a: 2,
  foo: foo    //added as a reference property
};

obj.foo(); // 2

//only the top/last level of an object property reference chain matters to the call-site
function foo() {
  console.log( this.a );
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  foo: foo
};

obj1.obj2.foo();  //42

/*Explicit Binding- take an object to use for 'this' and then invoke the function with that 'this' specified */

function foo() {
  console.log( this.a );
}

var obj = {
  a: 2
};

foo.call( obj );  //2     invoking 'foo' with Explicit binding by 'foo.call' allows us to force its 'this' to be 'obj'

//Explicit binding and implicit binding have an issue of a function losing its intended 'this' binding

//but a variation pattern around Explicit binding does the trick (aka Hard Binding)

function foo() {
  console.log( this.a );
}

var obj = {
  a: 2
};

var bar = function() {
  foo.call( obj );  //manually called thereby forcibly invoking foo with obj binding for this
};

bar();  //2
setTimeout( bar, 100 ); //2

//'bar' hard binds 'foo''s 'this' to 'obj'
//so that it cannot be overriden
bar.call( window ); //2

//most typical way to wrap a function with hard binding creates a pass-thru of any arguments passed and any return value reeived
function foo(something) {
  console.log( this.a, something );
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = function () {
  return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5

//ES5 comes with a built-in utility to help with hard binding
function foo(something) {
  console.log( this.a, something );
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = foo.bind( obj );    //in ES6, the function has a .name property. ex. bar = foo.bind(..) should have a bar.name value of "bound foo"

var b = bar( 3 ); //2 3
console.log( b ); // 5

/* 'new' binding */
//In JS, constructors are just functions that happen to be called with the 'new' operator in front of them. They are just regular
//functions

/*When a function is invoked with 'new' in front of it, the following things are done:
1. a brand new object is created ( aka, constructed) out of thin air
2. the newly constructed object is [[Prototype]] - linked
3. the newly constructed object is set as the 'this' binding for that function
4. unless the function returns its own alternate object, the 'new' - invoked function call will automatically return the newly
constructed object    */

function foo(a) {
  this.a = a;
}

var bar = new foo( 2 ); //with 'new' in front of 'foo', we constructed a new object and set that new object as the 'this' for the call of foo
console.log( bar.a ); //2
//'new' is the final way that a function call's 'this' can be bound

//Explicit before implicit
function foo() {
  console.log ( this.a );
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); //2
obj2.foo(); //3

obj1.foo.call( obj2 );  //3
obj2.foo.call( obj1 );  //2

//
//
//new before impplicit
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); //2

obj1.foo.call( obj2, 3 );
console.log.( obj2.a ); // 3

var bar = new obj1.foo( 4 );  // 'new' and 'call/apply' cannot be used together
console.log( obj1.a );  // 2
console.log( bar.a ); // 4
//
// 'NEW' OVERRIDES HARD BINDING
function foo(something) {
  this.a = something
}

var obj1 = {};

var bar = foo.bind( obj1 );   // bar is hard-bound against obj1
bar( 2 );
console.log( obj1.a );  // 2

var baz = new bar( 3 );     //the hard bound call to bar(..) is able to be overriden with new
console.log( obj1. a ); // 2
console.log( baz.a ); // 3

//the feature is useful because we can create a function that essentially ignores the 'this' hard binding but which presets some
//or all of the function's arguments.

function foo(p1,p2) {
  this.val = p1 + p2;
}
//using 'null' hrere because we dont care about the 'this' hard-binding in this scenario,
//and it will be overriden by the 'new' call anyway!
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );

baz.val;  // p1p2

/* Determining this */
/* Rules for Determining 'this':

1. Is the function called with 'new' (new binding)? If so, 'this' is the newly constructed object

  var bar = new foo()

2. Is the function called with call or apply (Explicit binding), even hidden inside a 'bind' hard binding? If so, 'this' is
the Explicit specified object.

  var bar = foo.call( obj2 )

3. Is thte function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this
is that context object.

  var bar = obj1.foo()

4. otherwise, default the 'this' (default binding). If in 'strict mode', pick 'undefined', otherwise pick the global object.

  var bar = foo()

  */

  //Binding exceptions

  //if you pass 'null' or 'undefined' as a 'this' binding parameter to 'call', 'apply' or 'bind', those values are effectively ignored,
  //and instead the default binidng rule applies to the invocation

  function foo() {
    console.log( this.a );
  }

  var a = 2;

  foo.call( null ); // 2

  /* soft binding - wraptes the specified function in logic that checks the 'this' at call-time and if it's 'global' or 'undefined'
  uses a pre-specified alternate default (obj). Otherwise the 'this' is left untouched */

  function foo() {
    console.log( "name: " + this.name);
  }

  var obj  = { name: "obj" },
      obj2 = { name: "obj2" },
      obj3 = { name: "obj3" };

  var fooOBJ = foo.softBind( obj );

  fooOBJ(); // name: obj

  obj2.foo = foo.softBind( obj );
  obj2.foo(); //  name: obj2    <-- look!!!

  fooOBJ.call( obj3 );  // name: obj3 <-- look!!

  setTimeout( obj2.foo, 10 ); // name: obj    <-- falls back to soft-binding!

  /* Arrow functions do not follow the 4 rules abided by normal functions. Introduced in ES6.
  signified by the "fat arrow" */

  function foo() {
    //return an arrow function
    return (a) => {
      //'this' here is a lexically adopted from 'foo()'
      console.log( this.a );
    };
  }

  var obj1 = {
    a: 2            //Arrow function binds it to whatever is at the call time
  };

  var obj2 = {
    a: 3            //cannot override the arrow function.
  };

  var bar = foo.call( obj1 );
  bar.call( obj2 ); // 2, not 3!!

//
//

function foo() {
  var self = this;  // lexical capture of 'this'
  setTimeout( function(){
    console.log( self.a );
  }, 100);
}

var obj = {
  a: 2
};

foo.call( obj );  // 2

  //The binding from arrow function cannot be overriden, even with 'new' !!!
  // the arrow function binds whatever foo()s 'this' is at its call-time.

  /* IF YOU FIND YOURSELF WRITING 'THIS' STYLE CODE, BUT MOST OR ALL THE TIME, YOU DEFEAT THE 'THIS' MECHANISM WITH LEXICAL SELF=THIS
  OR ARROW-FUNCTION "TRICKS", YOU SHOULD EITHER:

  1. Use only lexical scope and forget the false pretense of this-style code.

  2. Embrace this-style mechanism completely, including using bind(..) where necessary, and try to avoid self=this and ARROW-FUNCTION
  "lexical this" tricks

  A program can effectively use both styles of code, BUT inside of the same function, and indeed for the same sorts of look-ups,
  mixing the two mechanism is usually asking for harder-to-maintain code, and probably working too hard to be clever    */


  //TL:DR 4 rules
  /*
    1. Called with 'new'? Use the newly constructed object.
    2. Called with 'call' or 'apply' ( or 'bind')? Use that specified object
    3. Called with a context object owning the call? Use that context object.
    4. Default: 'undefined' in 'strict mode', global object otherwise.

    */

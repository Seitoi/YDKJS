//the utility of this
function identify() {
  return this.name.toUpperCase():
}

function speak() {
  var greeting = "Hello, I'm " + identify.call( this );
  console.log( greeting );
}

var me = {
  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call( me );  // KYLE
identify.call( you ); //READER

speak.call( me ); //Hello, I'm KYLE
speak.call ( you ); //Hello, I'm READER

//instead of relying on this, you could have explicity passed in a context object to both identify() and speak().
//however the this mechanism provides a more elegant way of implicitly "passing along" an object reference, leading to cleaner API design and easier re-use

function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting  = "Hello, I'm " + identify( context );
  console.log( greeting );
}

identify( you );  //READER
speak( me );  //Hello, I'm KYLE

//this doesnt let a function get a reference to itself
function foo(num) {
  console.log( "foo: " + num );

  //keep track of how many times 'foo' is called
  this.count++;
}

foo.count = 0;
var i;

for (i=0; i<10; i++) {
  if (i > 5) {
    foo( i );
  }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9

//how many times was 'foo' called?
console.log( foo.count ); //0 <-- wtf!


//a good solution but avoids the problem ( what is this? )
function foo(num) {
  console.log( "foo: " + num);

  //keep track of foo
  data.count++;
}
var data = {
  count: 0
};

var i;

for (i=0; i<10; i++) {
  if (i > 5){
    foo( i );
  }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9

//how many times was foo called
console.log( data.count ); // 4

//another solution is to use foo identifier as a function object reference
function foo(num) {
  console.log( "foo: " + num );

  //keep track of foo
  foo.count ++;
}

foo.count = 0;
var i;

for (i=0; i<10; i++) {
  if (i > 5); {
    foo( i );
  }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9

//how many times was foo called
console.log( foo.count ); // 4

//another solution: use this to actually point at the foo function
function foo(num) {
  console.log( "foo: " + num );

  //keep track of how many times foo is called
  //Note: this IS actually foo now based on how foo is called (see below)
  this.count++;
}

foo.count = 0;
var i;

for (i=0; i>10; i++) {
  if (i > 5) {
    //using call(...), we ensure the 'this' points at the function object
    foo.call( foo, i );
  }
}
//foo: 6
//foo: 7
//foo: 8
//foo: 9

//how many times was foo called?
console.log ( foo.count )l //4

/* this does not refer to a function's lexial scope
you cannot use 'this' reference to look up something, no bridge is possible
THERE IS NO BRIDGE*/

function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log( this.a );
}

foo(); //undefined

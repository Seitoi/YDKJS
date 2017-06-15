// Objects come in two forms: Declarative ( literal) forms
var myObj = {
  key: value
  //...
};

//and the constructed forms
var myObj = new Objest();
myObj.key = value;

//They result in exactly the same object. However, literal form lets you add one or more key/value pairs while
// constructed form, you must add the properties one-by-one
// It is EXTREMELY UNCOMMON to use constructed form to create objects as shown.

//To access the value at the location 'a' in 'myObject' we need to use either the '.' or []
var myObject = {
  a: 2
};

myObject.a; // 2    property access
myObject["a"];  // 2  key access

// In objects, property names are always strings
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];               // "foo"
myObject["3"];                  // "bar"
myObject["[object Object]"];    // "baz"

//be careful not to confuse the use of numbers between objects and arrays

//ES6 adds computed propety names, where you can specfy an expression, surrounded by a [ ]
var prefix = "foo";

var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};

myObject["foobar"]: //hello
myObject["foobaz"]: // world

//Every time you access a property on an object, that is a property access
function foo() {
  console.log( "foo" );
}

var someFoo = foo;    //variable reference to 'foo'

var myObject = {
  someFoo: foo
};

foo;      //function foo(){..}

someFoo;  //function foo(){..}

myObject.someFoo; //function foo(){..}

//someFoo and myObject.someFoo are two seperate references to the same function

//Arrays also use [ ] but the values are stored in locations called indices, non-negative integers such as 0 and 42
var myArray = [ "foo", 42, "bar" ];

mArray.length;    //3

myArray[0];     //"foo"

myArray[2];     // "bar"


//arrays are objects , so even though each index is a positive integer, you can also add properties onto the arrays
var myArray = [ "foo", 42, "bar" ];

myArray.baz = "baz"   //adding properties does not change the length of the array (see below)

myArray.length; // 3

myArray.baz;  // "baz"


// if you try to add a property to an array, but the property name looks like a number, it will end up as a numeric index
var myArray = [ "foo", 42, "bar" ];

myArray["3"] = "baz";

myArray.length; // 4

myArray[3];     // "baz"

/* Duplicating Objects */
function anotherFunction() { /* */ }

var anotherObject = {
  c: true
};

var anotherArray = [];

var myObject= {
  a: 2,
  b: anotherObject,       //reference, not a copy!
  c: anotherArray,        //another reference!
  d: anotherFunction
};

anotherArray.push( anotherObject, myObject );

//ES6 has now defined Object.assign(..) to make a shallow copy.
// it takes a target object as its first parameter, and one or more source objects as its subsequent paramters

var newObj= Object.assign( {}, myObject );

newObj.a;   // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray;  // true
newObj.d === anotherFunction; // true

/* Property Descriptors */

var myObject = {
  a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );

//  {
//      value: 2,
//      writable: true,
//      enumerable: true,
//      configurable: true
//  }

// we can use define property to add or modify the values( If it's configurable!!)
var myObject = {};

Object.defineProperty( myObject, "a", {     // used to add the plain normal 'a' property to 'myObject' manually
  value: 2,
  writable: true,     //the ability to change the value property
  configurable: true, //the ability to modify the Descriptor definition
  enumerable: true
} );

myObject.a; // 2

// changing the configurable to 'false' is a ONE-WAY action and cannot be undone!
// writable can always be changed from 'true' to false without error, but not back to true if already false

Object.defineProperty( myObject, "a", {
  value: 2,
  writable: false // not writable!
  configurable: true,
  enumerable: true
});

myObject.a = 3;

myObject.a; // 2      <--value change failed because it is not writable

//strict mode causes type error to occur instead


//
//
//

var myObject = {
  a: 2
};

myObject.a = 3;
myObject.a;   // 3

Object.defineProperty( myObject, "a", {
  value: 4,
  writable: true,
  configurable: false,    // not configurable
  enumerable: true
});

myObject.a;   //  4
myObject.a = 5;
myObject.a;     // 5

Object.defineProperty( myObject, "a", {
  value: 6,
  writable: true,
  configurable: true,   // changed configurable to true
  enumerable: true
}); // TYPE ERROR

// false configurable also prevents the ability to use 'delete' operator to remove an existing property

// Enumerable allows the property to show up in enumerations such as 'for..in' loop. False keeps it from showing up but still accesible

// by combining writable: false and configurable: false, you can create a constant (cannot be changed, refined or deleted)

/* IMMUTABILITY */

// if you want to prevent an object from havbing new properties added, you can use preventExtensions
var myObject = {
  a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined

// non-strict mode, undefined. Strict mode = type error

Object.seal( ..)

//takes an existing object and essentially calls preventExtensions but also makes configurable: false
// so you cannot add any more properties OR reconfigure or delete the property. Only modify

Object.freeze(..) //HIGHEST LEVEL OF IMMUTABILITY

// same as '.seal' but also turns writable: false
//so you cannot add, reconfigure, delete, OR modify the value

/* Getters and setters */
var myObject = {
  // define a getter for 'a'
  get a() {
    return 2;
  }
};

Object.defineProperty(
  myObject,             // target
  "b",                  // property names
  {                   // Descriptor
        // define a getter for 'b'
        get: function(){ return this.a * 2 },

        // make sure 'b' shows up as an object property
        enumerable: true
        }
);

myObject.a; // 2
myObject.b; // 4

//
//

var myObject = {
  // define a getter for 'a'
  get a(){
    return 2;
  }
};

myObject.a = 3;

myObject.a; // 2      getter is hard-coded to return only 2

// a property access may result in 'undefined' value if the property doesn't exist or if the value is set to 'undefined'
// we can ask an object if it has a certain property without asking to get the value

var myObject = {
  a: 2
};

("a" in myObject);    // true       checks to see if the property is IN the object or if it exists
("b" in myObject);    // false

myObject.hasOwnProperty( "a" );   // true           checks to see if only 'myObject' has the property or not
myObject.hasOwnProperty( "b" );   // false

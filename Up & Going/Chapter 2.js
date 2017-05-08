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

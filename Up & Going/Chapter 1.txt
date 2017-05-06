Chapter 1: Into Programming


Code: Tells the computer what to do
Statements: a group of words, numbers, and operators that perform a task
  ex. a = b*2; value of b multiplied by 2 then assigned to a
Expressions:  a statement is made up of one or more expressions
  ex. 2 - value expression
      b - variable expression
      b * 2 - arithmetic expression
      a = b * 2 - assignment expression
Executing a Program:  running the program by using an interpreter or a compiler
Try It Yourself:  Shortcut to most Developer Tools Console is Ctrl + Shift + I; You can also press F12
Output: printed text that the user can see
  ex. console.log() to send output to the console
      alert() to pop up a window
Input:  receiving information from the user
  ex. prompt() to pop up a window that asks for a user to input information
Operators: performs actions on variables and values
  ex. Assignment: = as in a = 2
      Math:  + addition; - subtraction;  * multiplication; / division; as in a*2
      Compound Assignment: +=; -=; *=; /=; combines math operators with assignment as in a += 2 (same as a = a + 2)
      Increment/Decrement: ++ increment;  -- decrement;  as in a++ similar to a = a + 1
      Object Property Access: . as in console.log()
      Equality:  == loose-equals; === strict equals;  != loose not-equal; !== strict not-equals;  as in a == b
      Comparison: < less than;  > greater than; <= less than or loose-equals;  >= greater than or loose-equals; as in a <= b
      Logical:   && and;  || or;  as in a || b that selects either a OR b
Values & Types:
      When you need to do math, you want a number
      When you need to print a value on the screen, you need a string (one ore more characters, words, sentences)   "I am a string";  'I am also a string'
      When you need to make a decision in your program, you need a boolean (true or false).   true; false;
Converting Between Types: You can convert numbers into strings and vice versa (aka coercion)
  ex. var a = "42";
      var b = Number(a);
      console.log(a); <- "42"
      console.log b;  <- 42
Code Comments:  text inserted by the programmer to explain things to other programmers by using // or /*. Only seen when looking at the raw code
  ex. // This is a single line comment
      /* But this is
          a multiline
                comment.
                        */
      Code without comments is suboptimal
      Too many comments (one per line for example) is probably a sign of poorly written code
      Comments should explain why, not what. They can optionally explain how if that's particularly confusing
Variables:  can hold values of any type without any type enforcement.
  ex. Declare variables by using var
      var amount = 99.99;
      amount = amount * 2
      console.log (amount); // 199.98
      amount = "$" + String(amount); // converts amount into a string
      console.log(amount); //"$199.98"

      variables that do not change are called constants and are usually capitalized + underscores
      var TAX_RATE = 0.08;  //new version of JavaScript can declare constants by using const
      var amount = 99.99;
      amount = amount * 2;
      amount - amount + (amount * TAX_RATE);
      console.log(amount); //215.9784
      console.log(amount.toFixed(2)); //.toFixed() sets how many decimal places we want to round to and it produces the string, "215.98"
Blocks: a group of statements together usually inside {} and followed after an 'if' statement or loops
  ex. var amount = 99.99;
      if (amount > 10){     //block attached to 'if'
              amount = amount * 2;
              console.log(amount);  //199.98
      }
Conditionals: decisions in the program, commonly 'if' statements
  ex. var bank_balance = 302.13;
  var amount = 99.99;
  if (amount < bank_balance){
          console.log("I want to buy this phone!");
  }
  'if' statements require an expression in between () that can be treated as true or false
  'else' statement can be used incase the condition isn't true
    ex. if (amount < bank_balance) {
                console.log("I'll take the accessory!");
                amount = amount + ACCESSORY_PRICE;
    }
        else {
                console.log("No, thanks.");
    }
  'switch' statements can be used for a shorthand series of if..else statements
Loops: repeating actions while the condition holds  //typically in {} and in 'do..while' loops
  Each time loop block executes, its called iteration
  ex. while (numOfCustomers > 0) {
                console.log("How can I help you?");
                // help customers
                numOfCustomers = numOfCustomers - 1;   // or numOfCustomers = numOfCustomers--
  }
  //versus        top conditional is tested before first iteration while bottom is tested after.      If false, do..while will run one time, while will NOT run
      do{
              console.log("How may I help you?");
              // help the customer...
              numOfCustomers = numOfCustomers - 1;
      } while (numOfCustomers > 0);
  We can use the 'break' statement to stop a loop, otherwise loops can run forever (if it remains true!)
    a better solution to stopping loops is the 'for' loops.
      ex. for (var i = 0; 1 <= 9; o = i + 1){       // this loop is more compact and easier to write for counting
                    console.log(i);
      }         // 0 1 2 3 4 5 6 7 8 9
Functions: a named section of code that can be "called" by name which will run the code inside
  ex. function printAmount(){
                  console.log (amount.toFixed(2));
      }
      var amount = 99.99
      printAmount();  // 99.99
      amount = amount * 2;
      printAmount();  // 199.98
  Functions can optioannly take arguments (parameters) and optionally return a value back
    ex. function printAmount(amt){
                console.log(amt.toFixed(2));
        }
        function formatAmount(){
                return "$" + amount.toFixed(2);
        }
        var amount = 99.99;
        print.Amount(amount * 2);   // 199.98
        amount = formatAmount();
        console.log (amount);       // $99.99
    Functions can be used to make your code cleaner and used to organize related bits of code
      ex. const TAX_RATE = 0.08;
          function finalPurchaseAmount(amt) {
              //calculate new ammount with tax
              amt = amt + (amt * TAX_RATE);
              //return new ammount
              return amt;
          }
          var amount = 99.99;
          amount = finalPurchaseAmount(amount);
          console.log(amount.toFixed(2));     // 107.99
Scope: a collection of variables as well as the rules for how those variables are accessed by name
  Only code inside the function can access that function's scoped variables.
    ex. function one(){
            var a = 1;
            console.log (a);
        }
        function two(){
            var a = 2;
            console.log (a);
        }
        one();    // 1
        two();    // 2
  Scopes can be nested. Lexical scope rule - one scope can asccess variables of either current function or outside of it

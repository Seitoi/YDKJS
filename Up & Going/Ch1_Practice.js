

const TAX_RATE = 0.08
const PHONE_PRICE = 99.99;
const ACCESSORY = 9.99;
const MAX_SPENDING = 150;
var bank_money = 150

//bank_money = prompt("What is your total worth?");

var amount = 0

function totalTax(amount){
	return amount * TAX_RATE;
}

function formatAmount(amount){
	return "$" + amount.toFixed(2);
}

while (amount < bank_money){
	amount = amount + PHONE_PRICE;	//buy the phone

		if(amount <	MAX_SPENDING){
			amount = amount + ACCESSORY;
        }
}


amount = amount + totalTax(amount);		//taxes

console.log( "Your purchase: " + formatAmount(amount));

if (amount > bank_money){
	console.log("Sorry, you're broke son")		//alert
}

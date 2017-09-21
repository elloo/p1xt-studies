/*----------
It should calculate the total price of your phone purchase. 
It should keep purchasing phones until you run out of money in your bank account. 
You'll also buy accessories for each phone as long as your purchase amount is below your mental spending threshold.
After you've calculated your purchase amount, add in the tax, 
then print out the calculated purchase amount, properly formatted.
Finally, check the amount against your bank account balance to see if you can afford it or not.
You should set up some constants for the "tax rate," "phone price," "accessory price," and "spending threshold," 
as well as a variable for your "bank account balance.""
You should define functions for calculating the tax 
and for formatting the price with a "$" and rounding to two decimal places.
Bonus Challenge: Try to incorporate input into this program, 
perhaps with the prompt(..) covered in "Input" earlier. 
You may prompt the user for their bank account balance, for example. 
Have fun and be creative!
----------*/



const TAX_RATE = 0.08;
const PHONE_PRICE = 149.95;
const ACCESSORY_PRICE = 29.95;
const SPENDING_THRESHOLD = 99.95;

var accountBalance = prompt('What is your account balance?');
var totalCost = 0;

function calculateTax (totalCost) {
 return totalCost * TAX_RATE;  
}

function formatCost(totalCost) {
 return '$ ' + totalCost.toFixed(2);
}

while (totalCost < accountBalance){
 totalCost = totalCost + PHONE_PRICE;
  
 if (totalCost < SPENDING_THRESHOLD){
   totalCost = totalCost + ACCESSORY_PRICE; 
 }
}

totalCost = totalCost + calculateTax(totalCost);
accountBalance = formatCost(accountBalance - totalCost);

if (totalCost < accountBalance){
  console.log('Total cost: ' + formatCost(totalCost));
  console.log('You have ' + formatCost(accountBalance) + ' remaining.');
} else {
  console.log('Sorry, your funds have exceeded.');
  console.log('Your account balance is: ' + accountBalance);
}

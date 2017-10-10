// Source: watchandcode.com

function runWithDebugger() {
  debugger;
 
  var callback = arguments[0];
  var callbackArgs = [];
 
  for (i = 1; i < arguments.length; i++){
    callbackArgs.push(arguments[i]);
  } 

  callback.apply(this, callbackArgs);
}



/*----------------*/
// Callback with no arguments
function sayHi(){
  console.log('Hi');
}

runWithDebugger(sayHi);

// Callback with one argument
function sayHiTo(name){
  console.log('Hi, ' + name);
}

runWithDebugger(sayHiTo, 'Jane');

//Callback with two arguments
function sayFullName(firstName, lastName){
  console.log(firstName + ' ' + lastName);
}

runWithDebugger(sayFullName, 'Jane', 'Eyre');

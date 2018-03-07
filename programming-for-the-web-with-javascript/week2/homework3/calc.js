var val0 = "";   // Empty string clears display after operation button is used
var val1 = "";   // Val1 for secondary number in operations
var arithOp;
var result;

$(".num").click(function(){

    if (arithOp){    // Using new container for second value in operation
        val1 += $(this).html();        
        $("input").val(val1);  
        
    } else {
        if (arithOp == false && result){ // Begin a new operation when number is pressed after #equalsButton
            clearData();
        }
        
        // Initial value of new operation
        val0 += $(this).html();        
        $("input").val(val0);  
    }
    
});

$(".ops").click(function(){
 
    if (result){    // For operations with more than two numbers
        val0 = parseFloat(result);
    }    
    
    if (arithOp){   // For operations with more than two numbers
        calculate(val0, val1);
        val1 = "";
    }
    
    arithOp = $(this).html();
    
});

$("#equalsButton").click(function(){
    
    if (val1 == false){         // If no second value is input
        $("input").val(val0); 
    } else {
        calculate(val0, val1);
        val0 = "";
        val1 = "";
    } 
    
});

$("#clearButton").click(function(){
    
    clearData();
    
});



/*--------------------------
    Helper functions
--------------------------*/

function calculate(x, y){
    
    x = parseFloat(x);
    y = parseFloat(y);
    
    // Detecting which operational button has been pressed
    if (arithOp == "+"){
        result = x + y;
    } else
    if (arithOp == "-"){
        result = x - y;
    } else
    if (arithOp == "*"){
        result = x * y;
    } else
    if (arithOp.charCodeAt(0) == "247"){ // Using Unicode instead of ASCII as in .html doc
        if (y == "0"){
            result = "Infinity";
        } else {
            result = x / y;
        }
    }
        
    $("input").val(result);  
    val0 = result;
    
};

function clearData(){
    
    val0 = "";
    val1 = "";
    arithOp = "";
    result = "";
    $("input").val("");  
    
};
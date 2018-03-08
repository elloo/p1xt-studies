// !!!!!!!!!!!!!!!!!
// Debugging Case #3
// !!!!!!!!!!!!!!!!!

var val0 = "";   // Empty string clears display after operation button is used
var val1 = "";   // val1 for secondary number in operations
var arithOp = "";
var prevBtn = "";
var result = "";

$(".num").click(function(){     // For 0-9
    
    if (prevBtn == "="){
        val1 = "";
    }
    
    if (prevBtn == "=" && result){
        val0 = ""
        arithOp = "";
    }
    
    if (arithOp || prevBtn == "=" && val1 == "" && val0 != ""){
        val1 += $(this).html();        
        $("input").val(val1);         
    } else {
        if (arithOp == "" && result ){ // Begin a new operation when number is pressed after #equalsButton
            clearData();
        }        
        val0 += $(this).html();        // Initial value of new operation
        $("input").val(val0);  
    }
    
    prevBtn = $(this).html();  
    
});

$(".ops").click(function(){     // For +, -, /, * buttons
    
    if (prevBtn == "="){    // Reset to allow result of previous operation to be used
        val1 = "";
        arithOp = "";
    }
    
   // When clicking .ops btn for the second time, consecutively
    if (arithOp && prevBtn == "+" || prevBtn == "-" || prevBtn == "*" || prevBtn.charCodeAt(0) == "247"){
        arithOp = $(this).html();    
    } else          // When clicking .ops btn for the second time, non-consecutively
    if (arithOp){
        calculate(val0, val1);
        val1 = "";
        arithOp = $(this).html();
    } else {        // When clicking .ops btn for the first time
        arithOp = $(this).html();
    }
    
    prevBtn = arithOp;
    
});

$("#equalsButton").click(function(){
    
    if (val1 == ""){         // If no second value is input
        $("input").val(val0); 
    } else {
        calculate(val0, val1);
    }
    
    prevBtn = $(this).html();
    
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
        result = x / y;
    }
        
    $("input").val(result);  
    val0 = result;
    
};

function clearData(){
    
    val0 = "";
    val1 = "";
    arithOp = "";
    prevBtn = "";
    result = "";
    $("input").val("");  
    
};
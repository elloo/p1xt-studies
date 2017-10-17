// Take a square grid of numbers
// Calculate the sum of both diagonals
// Subtract the secondary diagonal from the primary diagonal
// Return the result

function diagDiff(a, n){ 
   var primaryDiagonal = 0;
    var secondaryDiagonal = 0;
    var secondNum = n;
    
    for (var i = 0; i < n; i++){
        secondNum -= 1;
        
        primaryDiagonal += a[i][i];
        secondaryDiagonal += a[i][secondNum];      
    }
    
    var diff = Math.abs(primaryDiagonal - secondaryDiagonal);    
    console.log(diff);
}

// Test:
// diagDiff([ [ 11, 2, 4 ], [ 4, 5, 6 ], [ 10, 8, -12 ] ], 3);
// Expected result: 
// 15
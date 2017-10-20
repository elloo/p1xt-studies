function lonelyInteger(a) {
    var n = a.length;
    
    while (n > 1){
        for (var i = 0; i < n; i++){
            for (var j = 1; j < n; j++){            
                if (i == j){
                    j++;
                }
                if (a[i] == a[j]){                    
                    a.splice(i, 1);
                    a.splice(j - 1, 1);                  
                    
                    n -= 2
                    i = -1;
                    j = 0;
                }
            }
        }
    }      
    
    return a;      
}

// Test: lonelyInteger([0, 0, 1, 2, 1]);
// Expected: 2
// t = number of test cases
// n = number of cycles in each test case [array]
// In alternating cycles:
//      Growth multiplies by 2
//      Growth increases by 1

function utopian_tree(t, n) {  	
    for(var x = 0; x < t; x++){                       

		var a = n[x];
        var y = 1;   
               
        while (a > 0){
                y *= 2;
                a -= 1;
            if (a > 0){
                y += 1;
                a -= 1;
            }
        }        

        console.log(y); 
    }
}

// Test: utopian_tree(3, [0, 1, 4]);
// Expect:
//           1
//           2
//           7
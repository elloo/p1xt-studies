function super_reduced_string(s){
    var letters = s.length;
    
    for (i = 0; i < letters; i++){
        s = s.replace(/(.)\1/g, '');     
    } 
    
    if (s == ""){
        s = "Empty String";
    }          
    
    return s;
}

// Test 1: super_reduced_string("aaabccddd");
// Expect: "abd"

// Test 2: super_reduced_string("baab");
// Expect: "Empty String"

// Test 3: super_reduced_string("aa");
// Expect: "Empty String"
/*
Problem excerpt:
Sam is a professor at the university and likes to round each student's  according to these rules:

- If the difference between the `grade` and the next multiple of 5 is less than 3, round `grade` up to the next multiple of 5.
- If the value of `grade` is less than 38, no rounding occurs as the result will still be a failing grade.
*/

function grade(n, grades) {    
    for(var i = 0; i < n; i++){      
        
        var rounded = grades[i] + (5 - (grades[i] % 5));
        
        if (grades[i] >= 38  && rounded - grades[i] < 3){
            grades[i] = rounded;
        }
    }    
        
    console.log(grades.join("\n"));  
}

// Test: grade(4, [73, 67, 38, 33]);
// Expect: 75
//         67
//         40
//         33
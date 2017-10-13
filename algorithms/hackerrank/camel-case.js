/* Initially, I had `count = 0` and conditional test as `i <= s.length`. I then realised the passing test results came from the undefined character space at the end of the string. I refactored for functional clarity. */

function camelWordCount(s) {
    var string = s; 
    var count = 1;    
    
    for (var i = 0; i <= s.length - 1; i++)
    {
        if (s.charAt(i) === s.charAt(i).toUpperCase())
        {
            count++;
        }                    
    }
    
    console.log(count);
}

// Tests:
// camelWordCount("thisIsATest");             === 4
// camelWordCount("saveChangesInTheEditor");  === 5

// 
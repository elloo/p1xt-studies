// appleTree_______houseStart-------houseEnd_______orangeTree
// appleNum and orangeNum = Number of fallen apples and oranges
// applePos and orangePos = Position where each apple and orange falls

// Function counts the number of applePos and orangePos that fall within houseStart and houseEnd range.

function appleAndOrange(houseStart, houseEnd, appleTree, orangeTree, appleNum, orangeNum, applePos, orangePos){
    
    // Counting apples and oranges that fall on house range
    var applesOn = 0;
    var orangesOn = 0;
    
    // Calculating apples that fall on house range
    for (var i = 0; i < appleNum; i++){
        if (applePos[i] + appleTree >= houseStart && applePos[i] + appleTree <= houseEnd){
            applesOn++;
        }
    }
    // Calculating oranges that fall on house range
    for (var i = 0; i < orangeNum; i++){
        if (orangePos[i] + orangeTree >= houseStart && orangePos[i] + orangeTree <= houseEnd){
            orangesOn++;
        }
    }
    
    console.log(applesOn);
    console.log(orangesOn);
}

// Test: appleAndOrange(7, 11, 5, 15, 3, 2, [-2, 2, 1], [5, -6]);
// Expect: 1
//         1
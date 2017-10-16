function minMaxSum(numbers) {
	var arr = JSON.parse("[" + numbers + "]");    
	var sumTotal = 0;
    
    for (var i = 0; i <= 4; i++)
    {
        sumTotal += arr[i]        
    }
    
    var minSum = sumTotal;
    var maxSum = 0;
    
    for (var i = 0; i <= 4; i++) 
    {
        var sumFour = sumTotal - arr[i];
        if (minSum > sumFour)
        {
            minSum = sumFour;
        }
        if (maxSum < sumFour)
        {
            maxSum = sumFour;
        }
    }
    
    console.log(minSum, maxSum);
}
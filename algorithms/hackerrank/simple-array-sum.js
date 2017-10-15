// n = number of elements in the array
// ar = an array of numbers

function simpleArraySum(n, ar) {
    var sum = 0;
    for (var i = 0; i <= n - 1; i++){
        sum += ar[i];
    }
    return sum;
}

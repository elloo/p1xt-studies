// Source: http://www.freecodecamp.com/challenges/bonfire-return-largest-numbers-in-arrays

// Select the largest number from a range of sub-arrays
// Push these numbers to a new array
// Return the new array

function largestOfFour(arr) {
  arrSort = [];
  
  for (i = 0; i < arr.length; i++)
  {
    arrSort.push(Math.max(...arr[i]));
  }
  return arrSort;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

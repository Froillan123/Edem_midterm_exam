// question2.js
function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Test the function
console.log(sumArray([1, 2, 3, 4, 5]));  // Expected output: 15

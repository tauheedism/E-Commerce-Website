// const str = 'zzzzttteeeqqaao';
// const frequencySort = (str = '') => {
//    let map = {}
//    for (const letter of str) {
//       map[letter] = (map[letter] || 0) + 1;
//    };
//    let res = "";
//    let sorted = Object.keys(map).sort((a, b) => map[b] - map[a])
//    for (let letter of sorted) {
//       for (let count = 0; count < map[letter]; count++) {
//          res += letter
//       }
//    }
//    return res;
// };
// console.log(frequencySort(str));



// JavaScript implementation of the above approach

// Returns count of character in the string
function countFrequency(str, ch)
{
	var count = 0;

	for (var i = 0; i < str.length; i++)

		// Check for vowel
		if (str[i] == ch)
			++count;

	return count;
}

// Function to sort the string
// according to the frequency
function sortArr(str)
{
	var n = str.length;

	// Vector to store the frequency of
	// characters with respective character
	vp = new Array(n);

	// Inserting frequency
	// with respective character
	// in the vector pair
	for (var i = 0; i < n; i++) {

		vp[i] = [countFrequency(str, str[i]), str[i]];
	}

	// Sort the vector, this will sort the pair
	// according to the number of characters
	vp.sort();

	// Print the sorted vector content
	for (var i = 0; i < n; i++)
		document.write(vp[i][1]);
}

// Driver Code

// Array of points
let str = "zzzzttteeeqqaao";
sortArr(str);



// zzzzeeetttaaqqo
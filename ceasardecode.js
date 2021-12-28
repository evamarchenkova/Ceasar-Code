let fs = require('fs');
let arg = process.argv;

inputData = fs.readFileSync('coded.txt');
inputData = inputData.toString();

freq = {'a' : 0, 'b' : 0, 'c' : 0, 'd' : 0, 'e' : 0, 'f' : 0, 'g' : 0, 'h' : 0, 'i' : 0, 'j' : 0, 'k' : 0, 'l' : 0, 'm' : 0, 'n' : 0, 'o' : 0, 'p' : 0, 'q' : 0, 'r' : 0, 's' : 0, 't' : 0, 'u' : 0, 'v' : 0, 'w' : 0, 'x' : 0, 'y' : 0, 'z' : 0};
canon = {'a' : 0.0817, 'b' : 0.0149, 'c' : 0.0278, 'd' : 0.0425, 'e' : 0.127, 'f' : 0.0223, 'g':0.0202, 'h' : 0.0609, 'i' : 0.0675, 'j' : 0.0015, 'k' : 0.0077, 'l' : 0.0403, 'm' : 0.0241, 'n' : 0.0675, 'o' : 0.0751, 'p' : 0.0193, 'q' : 0.001, 'r' : 0.0599, 's' : 0.0633, 't' : 0.0906, 'u' : 0.0276, 'v' : 0.0098, 'w' : 0.0236, 'x' : 0.0015, 'y' : 0.0197, 'z' : 0.0005};

let count = 0;
for (i = 0; i < inputData.length; i++){
	if (97 <= inputData[i].charCodeAt() && inputData[i].charCodeAt() <= 122){
		freq[inputData[i]]++;
		count++;
	}
	if (65 <= inputData[i].charCodeAt() && inputData[i].charCodeAt() <= 90){
		freq[String.fromCharCode(inputData[i].charCodeAt() + 32)]++;
		count++;
	}
}
for (i = 0; i < 26; i++){
	freq[String.fromCharCode(97 + i)] /= count;
}

mini = Number.POSITIVE_INFINITY;
answer = 0;
for (k = 0; k < 26; k++){
	result = 0;
	for (j = 0; j < 26; j++){
		result += Math.abs(canon[String.fromCharCode(97 + j)] - freq[String.fromCharCode(97 + (j + k) % 26)]);
	}
	if (result < mini){
		mini = result;
		answer = k;
	}
}
console.log(answer);

final_string = "";
for (i = 0; i < inputData.length; i++){
	if (65 <= inputData[i].charCodeAt() && inputData[i].charCodeAt() <= 90){
		final_string += String.fromCharCode(((inputData[i].charCodeAt() - 65 - answer) % 26 + 26) % 26 + 65);
	} else if (97 <= inputData[i].charCodeAt() && inputData[i].charCodeAt() <= 122) {
		final_string += String.fromCharCode(((inputData[i].charCodeAt() - 97 - answer) % 26 + 26) % 26 + 97);
	} else {
		final_string += inputData[i];
	}
}
fs.writeFileSync('decoded.txt', final_string);
let n = 5;
let str = '';

for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= n - i; j++) {
    str += ' ';
  }
  for (let k = 0; k < 2 * i - 1; k++) {
    str += '*';
  }
  str += '\n';
}
console.log(str);

const reverseString = string => {
  const reversed = string.split('').reverse().join('');
  return reversed.split(' ').reverse().join(' ');
};

const result = reverseString('Welcome to this Javascript Guide!');
console.log(result);

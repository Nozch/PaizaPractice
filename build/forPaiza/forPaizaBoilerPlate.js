process.stdin.setEncoding('utf8');
var inputLines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  inputLines.push(line);
});

reader.on('close', () => {
  // ここに処理を書く
})
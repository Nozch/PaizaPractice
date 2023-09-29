
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
    const [arrLength, numbersCount] = inputLines[0].split(" ").map(Number);
    let arrCurrentSum = [];
    let prevSum = 0;
    inputLines.slice(1, 1 + arrLength).forEach((elemStr) => {
      const elem = +elemStr;
      prevSum += elem;
      arrCurrentSum.push(prevSum);
    });
    inputLines.slice(1 + arrLength).forEach((elemStr) => {
      const elem = +elemStr;
      console.log(arrCurrentSum[elem - 1]);
    });
  })
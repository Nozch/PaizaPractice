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

  const [arrLength, intervalCount] = inputLines[0].split(" ").map(Number);
  let arrCurrentSum = [];
  let prevSum = 0;
  inputLines.slice(1, 1 + arrLength).forEach((elemStr) => {
    const elem = +elemStr;
    prevSum += elem;
    arrCurrentSum.push(prevSum);
  });
  inputLines.slice(1 + arrLength).forEach((line) => {
    const [startIndexStr, endIndexStr] = line.split(" ");
    const startIndex = +startIndexStr;
    const endIndex = +endIndexStr;
    const sumA = arrCurrentSum[endIndex - 1];
    const sumB = startIndex - 2 < 0 ? 0 : arrCurrentSum[startIndex - 2];
    console.log(sumA - sumB);
  })
})
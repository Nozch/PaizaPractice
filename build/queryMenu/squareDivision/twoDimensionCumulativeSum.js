
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
// src/queryMenu/squareDivision/twoDimensionCumulativeSum.ts
  const [height, width, pairsCount] = inputLines[0].split(" ").map(Number);
  const cumulativeSumX = Array(height).fill(null).map((_, i) => {
    const notSumedArr = [...inputLines[i + 1].split(" ").map(Number)];
    let prevSumX = 0;
    const sumArrX = notSumedArr.map((elem) => {
      prevSumX += elem;
      return prevSumX;
    });
    return sumArrX;
  });
  let cumulativeSumXY = Array(height).fill(null).map(() => Array(width).fill(null).map(() => 0));
  for (let i = 0;i < height; i++) {
    for (let j = 0;j < width; j++) {
      cumulativeSumXY[i][j] = (cumulativeSumXY[i - 1]?.[j] || 0) + cumulativeSumX[i][j];
    }
  }
  inputLines.slice(1 + height).forEach((line, i) => {
    const [y, x] = line.split(" ").map(Number);
    console.log(cumulativeSumXY[y - 1][x - 1]);
  });
})
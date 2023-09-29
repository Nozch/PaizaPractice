// src/queryMenu/squareDivision/twoDimensionIntervalSum.ts



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
  const [height, width, pairsCount] = inputLines[0].split(" ").map(Number);
  const cumulativeSumXY = Array(height).fill(null).map(() => Array(width).fill(0));
  for (let i = 0;i < height; i++) {
    const row = inputLines[i + 1].split(" ").map(Number);
    for (let j = 0;j < width; j++) {
      cumulativeSumXY[i][j] = row[j] + (cumulativeSumXY[i][j - 1] || 0) + (cumulativeSumXY[i - 1]?.[j] || 0) - (cumulativeSumXY[i - 1]?.[j - 1] || 0);
    }
  }
  for (let i = 0;i < pairsCount; i++) {
    const [y1, x1, y2, x2] = inputLines[1 + height + i].split(" ").map((num) => Number(num) - 1);
    const result = cumulativeSumXY[y2][x2] - (cumulativeSumXY[y1 - 1]?.[x2] || 0) - (cumulativeSumXY[y2][x1 - 1] || 0) + (cumulativeSumXY[y1 - 1]?.[x1 - 1] || 0);
    console.log(result);
  }
})

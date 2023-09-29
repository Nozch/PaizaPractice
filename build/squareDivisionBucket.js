// src/queryMenu/squareDivision/squareDivisionBucket.ts
  for (let i = 0;i < 100; i++) {
    const slicedLines = inputLines.slice(i * 100, (i + 1) * 100).map(Number);
    let currentMax = slicedLines[0];
    slicedLines.forEach((elem) => {
      if (elem > currentMax) {
        currentMax = elem;
      }
    });
    console.log(currentMax);
  }
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
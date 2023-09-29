
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
  const originalArr = Array(1e4).fill(null).map((_, i) => +inputLines[i + 1]);
  const maxs = Array(100).fill(null).map((_, i) => {
    const sliced = originalArr.slice(i * 100, 100 * (1 + i));
    return Math.max(...sliced);
  });
  inputLines.slice(10001).map((line) => {
    const [start, end] = line.split(" ").map((elem) => Number(elem) - 1);
    let max = (-Infinity);
    for (let i = start;i <= end; ) {
      if (i % 100 === 0 && i + 100 <= end) {
        const index = i / 100;
        max = Math.max(max, maxs[index]);
        i += 100;
      } else {
        max = Math.max(max, originalArr[i]);
        i++;
      }
    }
    console.log(max);
  });

})

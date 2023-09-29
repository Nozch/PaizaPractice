for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [height, width, pairsCount] = inputLines[0].split(" ").map(Number);
  const cumulativeSumXY = Array(height).fill(null).map(() => Array(width).fill(0));

  for (let i = 0; i < height; i++) {
    const row = inputLines[i + 1].split(" ").map(Number);
    for (let j = 0; j < width; j++) {
      cumulativeSumXY[i][j] = row[j] + (cumulativeSumXY[i][j - 1] || 0) + (cumulativeSumXY[i - 1]?.[j] || 0) - (cumulativeSumXY[i - 1]?.[j - 1] || 0);
    }
  }

  for (let i = 0; i < pairsCount; i++) {
    const [y, x] = inputLines[1 + height + i].split(" ").map(Number);
    console.log(cumulativeSumXY[y - 1][x - 1]);
  }
}
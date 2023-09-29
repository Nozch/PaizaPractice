

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [height, width, pairsCount] = inputLines[0].split(" ").map(Number);
  const cumulativeSumXY = Array(height).fill(null).map(() => Array(width).fill(0));

  for (let i = 0; i < height; i++) {
    const row = inputLines[i + 1].split(" ").map(Number);
    for (let j = 0; j < width; j++) {
      // 累積和 = 現在のセル + 現在のセルより x-1 の領域 + y-1 の　領域 - 重なった範囲
      cumulativeSumXY[i][j] = row[j] + (cumulativeSumXY[i][j - 1] || 0) + (cumulativeSumXY[i - 1]?.[j] || 0) - (cumulativeSumXY[i - 1]?.[j - 1] || 0);
    }
  }

  for (let i = 0; i < pairsCount; i++) {
    // インデックスとして使うので全てマイナス１
    const [y1, x1, y2, x2] = inputLines[1 + height + i].split(" ").map(num => Number(num) - 1);

    // 区間和
    const result = cumulativeSumXY[y2][x2] - (cumulativeSumXY[y1 - 1]?.[x2] || 0) - (cumulativeSumXY[y2][x1 - 1] || 0) + (cumulativeSumXY[y1 - 1]?.[x1 - 1] || 0)
    console.log(result)
  }

}
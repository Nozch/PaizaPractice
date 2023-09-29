for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [height, width, pairsCount] = inputLines[0].split(' ').map(Number)

  const cumulativeSumX: number[][] = Array(height).fill(null).map((_, i) => {
    const notSumedArr = [...inputLines[i + 1].split(' ').map(Number)]
    let prevSumX = 0
    // まずX座標について累積和を出す
    const sumArrX = notSumedArr.map((elem) => {
      prevSumX += elem
      return prevSumX
    })
    return sumArrX
    }
  );
  
  // 
  let cumulativeSumXY = Array(height).fill(null).map(() => Array(width).fill(null).map(()=> 0))

  // arrTwoDimの y x 要素と　y-1 x 要素を足す
  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      // cumulativeSumXY[i-1][j] は y座標が一つ低い要素
      // 存在しない(i = 0)なら 足す必要ないので 0 
      cumulativeSumXY[i][j] = (cumulativeSumXY[i-1]?.[j] || 0) + cumulativeSumX[i][j];
    }
  }

  inputLines
  .slice(1 + height)
  .forEach((line, i) => {
    const [y, x] = line.split(' ').map(Number)
    console.log(cumulativeSumXY[y - 1][x - 1])
  })


}
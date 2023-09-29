
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const originalArr = Array(10000).fill(null).map((_, i) => inputLines[i + 1]) 

  const maxs = Array(100).fill(null).map(() => 0)
  for(let i = 0; i < 100; i++) {
    const slicedLines = inputLines
    // 100個の要素ずつスライス
    .slice(i * 100 + 1, (i + 1) * 100 + 1)
    .map(Number)

    const currentMax = Math.max(...slicedLines)
    maxs.push(currentMax)
  }

  const intervalCount = +inputLines[0]
  inputLines
  .slice(10001)
  .map((line) => {
    const [intervalStart, intervalEnd] = line.split(' ').map(Number)

    const endRemainderBy100 = intervalEnd % 100
    const startRemainderBy100 = intervalStart % 100
    const intervalEndDivisible = intervalEnd - endRemainderBy100
    const intervalStartDivisible = intervalStart - startRemainderBy100 + 100

    const intervalMax = Math.max(...maxs
    .slice(intervalStartDivisible / 100, intervalEndDivisible / 100))
    
    // 選択された区間の左(indexの小さい方) 100で割り切れない部分

    let leftMax = 0 / -0 // -infinity
    console.log(leftMax)
    // ex: intervalStart 98 => 98, 99のうち大きい方がleftMax
    for(let i = intervalStart; i < intervalStartDivisible; i++) {
      if(+inputLines[i] < leftMax) {
        leftMax = +inputLines[i ]
      }
    }
    console.log(leftMax)
    let rightMax = 0 / -0
    for(let i = intervalEndDivisible; i < intervalEnd; i++) {
      if(+inputLines[i + 1] > rightMax) {
        rightMax = +inputLines[i + 1]
      }

    }
    // console.log(Math.max(intervalMax, leftMax, rightMax))
  })

}
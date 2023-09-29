// 何が原因で間違っているかわからないため書き直す

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  // 入力 inputLines[0] -> 無視
  // inputLines[1 ~ 10000] -> 配列
  // inputLines[10001 ~ ] 区間の開始インデックス(inputLinesにおける), 終了インデックス

  const maxs = Array(100).fill(null).map(() => 0)
  for(let i = 0; i < 100; i++) {
    const slicedLines = inputLines
    // 100個の要素ずつスライス
    .slice(i * 100 + 1, (i + 1) * 100 + 1)
    .map(Number)

    const currentMax = Math.max(...slicedLines)
    maxs[i] = currentMax
  }

  inputLines
  .slice(10001)
  .map((line) => {
    // 1　始まり　ex: 2070, 5050
    const [intervalStart, intervalEnd] = line.split(' ').map(Number)
    
    if (intervalStart === intervalEnd) {
      console.log(+inputLines[intervalStart]);
      return;
    }
    const intervalEndDivisible = intervalEnd - (intervalEnd % 100)  // 5000
    const intervalStartDivisible = intervalStart % 10 === 0 ? intervalStart: intervalStart - (intervalStart % 100) + 100 // 2100. 割り切れる場合 100 増やす必要はない
    

    // maxs[0~ 99] における　21 ~ 50 の最大値
    const intervalMax = Math.max(...maxs
    .slice(intervalStartDivisible / 100 - 1, intervalEndDivisible / 100 - 1))
    
    // console.log(intervalMax)
    let leftMax = -Infinity
    
    // i = 2070 ~ 2099
    for(let i = intervalStart; i < intervalStartDivisible; i++) {
      if(+inputLines[i] > leftMax) {
        leftMax = +inputLines[i]
      }
    }


    let rightMax = -Infinity
    //  i = 5001 ~ 5050
    for(let i = intervalEndDivisible + 1; i <= intervalEnd; i++) {
      if(+inputLines[i] > rightMax) {
        rightMax = +inputLines[i]
      }

    }
    // console.log(intervalMax)
    console.log(Math.max(intervalMax, leftMax, rightMax))
  })

}
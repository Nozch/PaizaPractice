// テスト用のダミーの入力データ
const inputLines = [
  "", // 1行目は無視される
  "1", "5", "3", "8", "2", "9", "4", "7", "6", "0",
  "10", "11", "12", "13", "14",
  "3 7", // これは区間を示す
  "1 10",
  "6 6" // これも区間を示す
]

// maxsのサイズを調整する
const maxs = Array(1).fill(null).map(() => 0)

// 10個の要素ごとにスライス
for(let i = 0; i < 1; i++) {
  const slicedLines = inputLines
    .slice(i * 10 + 1, (i + 1) * 10 + 1)
    .map(Number)
  const currentMax = Math.max(...slicedLines)
  maxs[i] = currentMax
}

inputLines
.slice(16) // 16行目から区間が始まる
.map((line) => {
  const [intervalStart, intervalEnd] = line.split(' ').map(Number)
  
  const intervalEndDivisible = intervalEnd - (intervalEnd % 10) 
  const intervalStartDivisible = intervalStart % 10 === 0 ? intervalStart: intervalStart + (10 - (intervalStart % 10))

  const intervalMax = Math.max(...maxs
    .slice(intervalStartDivisible / 10 - 1, intervalEndDivisible / 10 - 1))
  
  let leftMax = -Infinity
  for(let i = intervalStart; i < intervalStartDivisible; i++) {
    if(+inputLines[i] > leftMax) {
      leftMax = +inputLines[i]
    }
  }

  let rightMax = -Infinity
  for(let i = intervalEndDivisible + 1; i <= intervalEnd; i++) {
    if(+inputLines[i] > rightMax) {
      rightMax = +inputLines[i]
    }
  }

  console.log(Math.max(intervalMax, leftMax, rightMax))
})

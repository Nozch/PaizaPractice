import { origin } from "bun";

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  // 0始まりで統一するため, 配列に格納。入力の始めの行を除き連続で10000行格納
  const originalArr = Array(10000).fill(null).map((_, i) => +inputLines[i + 1]) 

  const maxs = Array(100).fill(null).map((_, i) => {
    const sliced = originalArr.slice(i * 100, 100 * (1 + i))
    return Math.max(...sliced)
  })


  inputLines.slice(10001).map((line) => {

    const [start, end] = line.split(' ').map((elem) => Number(elem) - 1)
  
    let max = -Infinity
    // インクリメントの分岐を行う
    for (let i = start; i <= end;) {
  
      if (i % 100 === 0 && i + 100 <= end) {

        const index = i / 100
        max = Math.max(max, maxs[index])
        i += 100
      } else {
        // それ以外の場合、originalArrから値を比較
        max = Math.max(max, originalArr[i])
        i++
      }
  
    }
    console.log(max)
  })
  
}
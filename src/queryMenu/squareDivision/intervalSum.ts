for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [arrLength, intervalCount] = inputLines[0].split(' ').map(Number)


  let arrCurrentSum: number[] = []
  let prevSum = 0

  inputLines
  .slice(1, 1 + arrLength)
  .forEach((elemStr) => {
    const elem = +elemStr
    prevSum += elem
    arrCurrentSum.push(prevSum)
  })

  inputLines
  .slice(1 + arrLength)
  .forEach((line) => {
    const [startIndexStr, endIndexStr] = line.split(' ')
    
    const startIndex = +startIndexStr
    const endIndex = +endIndexStr

    const sumA = arrCurrentSum[endIndex - 1]
    const sumB = startIndex - 2 < 0 ? 0 : arrCurrentSum[startIndex - 2] 

    console.log(sumA - sumB)

  })
}
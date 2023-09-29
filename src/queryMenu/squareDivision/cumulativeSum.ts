for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const [arrLength, numbersCount] = inputLines[0].split(' ').map(Number)

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
  .forEach((elemStr) => {
    const elem = +elemStr
    console.log(arrCurrentSum[elem - 1])
  })
}

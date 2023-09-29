// departmentCount = 75856, reciptCount = 84957
// の時　1.44秒で完了する。
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [departmentCount, reciptCount] = inputLines[0].split(' ').map(Number)

  const departments = Array(departmentCount).fill(null).map((_, i) => inputLines[i + 1])

  let recipts = new Map()

  type Recipt = {
    orderNumStr: string // 先頭に0が入る場合あり。 その際も024567..のように出力するのでstring
    money: number
  }

  // inputLinesに残った行 reciptCountの数ある。
  inputLines
  .slice(1 + departmentCount)
  .map((line) => {
    const [department, orderNumStr, moneyStr] = line.split(' ')
    const money = +moneyStr
    const recipt: Recipt = { orderNumStr, money }
    const prevRecipt = recipts.get(department) || []
  
      prevRecipt.push(recipt)
      recipts.set(department, prevRecipt)


  })

  for (const department of departments) {
    const reciptArr: Recipt[] = recipts.get(department) || []
    console.log(department)
    reciptArr.forEach((recipt) =>  console.log(recipt.orderNumStr, recipt.money))
    console.log('-----')
  }
}
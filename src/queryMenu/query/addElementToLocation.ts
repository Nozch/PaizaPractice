for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const input = inputLines[0].split(" ").map(Number)
  const arrElementCount = input[0]
  const keyIndex = input[1]
  const keyToInsert = input[2]

  const createArrFromInput = (inputLines: string[], arrLength: number) => {
    let arr = []
    for(let i = 0; i < arrLength; i++) {
      arr.push(Number(inputLines[i + 1]))
    }
    return arr
  }

  const arrFromInput = createArrFromInput(inputLines, arrElementCount)

  const insertElemToArr = (arr: number[], keyIndex: number, keyToInsert: number) => {

    const prevArr = arr.slice(0, keyIndex) // 例えば 前から3切り出す うしろが2
    const leftArr = arr.slice(keyIndex, arr.length)

    const insertedArr = [...prevArr, keyToInsert, ...leftArr]
    return insertedArr
  }

  const insertedArr = insertElemToArr(arrFromInput, keyIndex, keyToInsert)

  const outputArrToLog = (arr: number[]) => {
    arr.map((elem) => {
      console.log(elem)
    })
  }

  outputArrToLog(insertedArr)
}
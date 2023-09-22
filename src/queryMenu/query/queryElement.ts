for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const firstInputLine = inputLines[0].split(" ").map(Number)
  
  const arrLength = firstInputLine[0]
  const keyToFind = firstInputLine[1]

  const createArr = (inputLines: string[], arrLength: number) => 
  {
    let arr = []
    const startIndex = 1 // 最初の行のインデックス
    for(let i = 0; i < arrLength; i++) {
      arr.push(Number(inputLines[startIndex + i]))
    }
    return arr
  }



  const isKeyIncluded = (arr: number[], keyToFind: number) => {
    const keyResult = arr.findIndex((elem) => elem === keyToFind)
    console.log(keyResult)
    if(keyResult === -1) {
      return "NO\n"
    } else {
      return "YES\n"
    }
  }
  const arr = createArr(inputLines, arrLength)
  console.log(isKeyIncluded(arr, keyToFind))
}
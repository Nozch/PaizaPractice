for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const firstInputLine = inputLines[0].split(" ").map(Number)
  
  const arrLength = firstInputLine[0]
  const keyToFindCount = firstInputLine[1]

  const createArr = (inputLines: string[], arrLength: number, startIndex: number) => 
  {
    let arr = []
    for(let i = 0; i < arrLength; i++) {
      arr.push(Number(inputLines[startIndex + i]))
    }
    return arr
  }

  const isKeyIncluded = (arr: number[], keyToFind: number) => {
    const keyResult = arr.findIndex((elem) => elem === keyToFind)

    if(keyResult === -1) {
      return "NO"
    } else {
      return "YES"
    }
  }

  const isKeyArrIncluded = (arr: number[], keyArr: number[]) => {
    const resultArr = keyArr.map((key) => {
      const result = isKeyIncluded(arr, key)
      return result
    })
    return resultArr
  }

  const arrBeingSearched = createArr(inputLines, arrLength, 1) // この中から見つける
  const arrIncludeKeys = createArr(inputLines, keyToFindCount, arrLength + 1) // 見つけたいkeyの配列


  isKeyArrIncluded(arrBeingSearched, arrIncludeKeys).map((result) => console.log(result))


}
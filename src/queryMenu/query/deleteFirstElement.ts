for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const arrLength = Number(inputLines[0])

  const createArr = (inputLines: string[], arrLength: number, startIndex: number) => 
  {
    let arr = []
    for(let i = 0; i < arrLength; i++) {
      arr.push(Number(inputLines[startIndex + i]))
    }
    return arr
  }

  const deleteFirstElemOfArr = (arr: number[]) => {
    const withoutFirstElem = arr.slice(1, arr.length)
    return withoutFirstElem
  }

  const arr = createArr(inputLines, arrLength, 1)
  const deletedArr = deleteFirstElemOfArr(arr)
  deletedArr.forEach((elem) => console.log(elem))

}
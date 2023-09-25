// 1.7秒　arrLength = 84000 manipulationLength = 42000の時

const createArr = (inputLines: string[], arrLength: number, startIndex: number) => 
{
  let arr = []
  for(let i = 0; i < arrLength; i++) {
    const elem = inputLines[startIndex + i]

    arr.push(isNaN(Number(elem)) ? elem : Number(elem))
  }
  return arr
}

const pop = (arr: (string | number)[]) => {
  arr.shift();
  return arr
}

const show = (arr: (string | number)[]) => {
  arr.forEach((elem) => console.log(elem))
}

const popOrShow = (arr: (string | number)[], manipulationArr: (string | number)[]) => {
  let poppedArr = arr
  manipulationArr.forEach((manipul) => {
    if(typeof manipul !== 'string') {
      throw new Error('given manipulation is not string type')
    } else if(manipul === 'pop') {
      poppedArr = pop(poppedArr)
    } else if(manipul === 'show') {
      show(poppedArr)
    } else {}
  }
  )
}

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const firstInputLine = inputLines[0].split(" ").map(Number)

  const arrLength = firstInputLine[0]
  const manipulationLength = firstInputLine[1]

  const arrFromInput = createArr(inputLines, arrLength, 1)
  const manipulationArr = createArr(inputLines, manipulationLength, 1 + arrLength)

  popOrShow(arrFromInput, manipulationArr)
}
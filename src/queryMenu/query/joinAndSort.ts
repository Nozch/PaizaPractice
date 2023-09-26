// studentCount = 84000, eventCount = 73000　で3.09秒

const sorting = (arr: number[], key: number) =>  {
  arr.sort((a, b) => a - b)
  console.log(arr.findIndex((height) => height === key) + 1)
}


for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const [studentCount, eventCount, myHeight] = inputLines[0].split(" ").map(Number)
  const studentsHeights = new Array(studentCount).fill(null).map((_, i) => Number(inputLines[i + 1]))
  
  studentsHeights.push(myHeight)
  for(let i = 0; i < eventCount; i++) {
    const startIndex = 1 + studentCount

    // "join studentHeight" か "sorting" という形の行が与えられる
    // "sorting"だったときにheightは使わない

    const [event, height] = inputLines[startIndex + i].split(" ")
    switch(event) {
      case 'join':
        studentsHeights.push(Number(height))
        break;
      case 'sorting':
        sorting(studentsHeights, myHeight)
        break;
    }
  }
}
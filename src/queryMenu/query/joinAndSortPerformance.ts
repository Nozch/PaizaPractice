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
  studentsHeights.sort((a, b) => a - b)
  
  let myIndex = studentsHeights.findIndex((height) => height === myHeight) + 1
  for(let i = 0; i < eventCount; i++) {
    const startIndex = 1 + studentCount

    // "join studentHeight" か "sorting" という形の行が与えられる
    // "sorting"だったときにheightは使わない

    const [event, heightStr] = inputLines[startIndex + i].split(" ")
    const height = Number(heightStr)
    switch(event) {
      case 'join':
        studentsHeights.push(height)
        if(height < myHeight) {
          myIndex += 1
        }
        break;
      case 'sorting':
        console.log(myIndex)
        break;
    }
  }
}
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")


  for(let i = 0; i < 100; i++) {
    const slicedLines = inputLines
    // 100個の要素ずつスライス
    .slice(i * 100, (i + 1) * 100)
    .map(Number)
    let currentMax = slicedLines[0]
    slicedLines.forEach((elem) => {
      if(elem > currentMax) {
        currentMax = elem
      }
    })
    console.log(currentMax)
 
  }
}
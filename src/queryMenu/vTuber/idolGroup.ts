for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const [initialMemberCount, eventCount] = inputLines[0].split(" ").map(Number)
  const initialMember = new Array(initialMemberCount).fill(null).map((_, i) => inputLines[1 + i])
  
  for(let i = 0; i < eventCount; i++) {
    const startIndex = 1 + initialMemberCount
    const [event, name] = inputLines[startIndex + i].split(" ")
    switch(event) {
      case 'join':
        initialMember.push(name)
        break;
      case 'leave':
        initialMember.delete(name)
    }
  }
}
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")
  const [pageCount, gameCount] = inputLines[0].split(' ').map(Number)
}
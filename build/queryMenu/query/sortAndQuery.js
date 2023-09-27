// src/queryMenu/query/sortAndQuery.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [studentCount, heightWhoJoined, myHeight] = inputLines[0].split(" ").map(Number);
  const studentsHeights = new Array(studentCount).fill(null).map((_, i) => Number(inputLines[i + 1]));
  studentsHeights.push(heightWhoJoined, myHeight);
  const studentsHeightsSorted = studentsHeights.sort((a, b) => a - b);
  console.log(studentsHeightsSorted.findIndex((height) => height === myHeight) + 1);
}

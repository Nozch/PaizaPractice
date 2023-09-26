// src/queryMenu/query/joinAndSort.ts
var sorting = (arr, key) => {
  arr.sort((a, b) => a - b);
  console.log(arr.findIndex((height) => height === key) + 1);
};
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [studentCount, eventCount, myHeight] = inputLines[0].split(" ").map(Number);
  const studentsHeights = new Array(studentCount).fill(null).map((_, i) => Number(inputLines[i + 1]));
  studentsHeights.push(myHeight);
  for (let i = 0;i < eventCount; i++) {
    const startIndex = 1 + studentCount;
    const [event, height] = inputLines[startIndex + i].split(" ");
    switch (event) {
      case "join":
        studentsHeights.push(Number(height));
        break;
      case "sorting":
        sorting(studentsHeights, myHeight);
        break;
    }
  }
}

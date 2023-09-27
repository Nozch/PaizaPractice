// src/queryMenu/query/queryElement.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const firstInputLine = inputLines[0].split(" ").map(Number);
  const arrLength = firstInputLine[0];
  const keyToFind = firstInputLine[1];
  const createArr = (inputLines2, arrLength2) => {
    let arr2 = [];
    const startIndex = 1;
    for (let i = 0;i < arrLength2; i++) {
      arr2.push(Number(inputLines2[startIndex + i]));
    }
    return arr2;
  };
  const isKeyIncluded = (arr2, keyToFind2) => {
    const keyResult = arr2.findIndex((elem) => elem === keyToFind2);
    if (keyResult === -1) {
      return "NO\n";
    } else {
      return "YES\n";
    }
  };
  const arr = createArr(inputLines, arrLength);
  console.log(isKeyIncluded(arr, keyToFind));
}

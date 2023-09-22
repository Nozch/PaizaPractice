// src/queryMenu/query/queryMultiElement.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const firstInputLine = inputLines[0].split(" ").map(Number);
  const arrLength = firstInputLine[0];
  const keyToFindCount = firstInputLine[1];
  const createArr = (inputLines2, arrLength2, startIndex) => {
    let arr = [];
    for (let i = 0;i < arrLength2; i++) {
      arr.push(Number(inputLines2[startIndex + i]));
    }
    return arr;
  };
  const isKeyIncluded = (arr, keyToFind) => {
    const keyResult = arr.findIndex((elem) => elem === keyToFind);
    if (keyResult === -1) {
      return "NO";
    } else {
      return "YES";
    }
  };
  const isKeyArrIncluded = (arr, keyArr) => {
    const resultArr = keyArr.map((key) => {
      const result = isKeyIncluded(arr, key);
      return result;
    });
    return resultArr;
  };
  const arrBeingSearched = createArr(inputLines, arrLength, 1);
  const arrIncludeKeys = createArr(inputLines, keyToFindCount, arrLength + 1);
  isKeyArrIncluded(arrBeingSearched, arrIncludeKeys).map((result) => console.log(result));
}

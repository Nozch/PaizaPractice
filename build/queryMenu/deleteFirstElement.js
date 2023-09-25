// src/queryMenu/query/deleteFirstElement.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const arrLength = Number(inputLines[0]);
  const createArr = (inputLines2, arrLength2, startIndex) => {
    let arr2 = [];
    for (let i = 0;i < arrLength2; i++) {
      arr2.push(Number(inputLines2[startIndex + i]));
    }
    return arr2;
  };
  const deleteFirstElemOfArr = (arr2) => {
    const withoutFirstElem = arr2.slice(1, arr2.length);
    return withoutFirstElem;
  };
  const arr = createArr(inputLines, arrLength, 1);
  const deletedArr = deleteFirstElemOfArr(arr);
  deletedArr.forEach((elem) => console.log(elem));
}

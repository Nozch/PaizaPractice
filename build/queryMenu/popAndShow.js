// src/queryMenu/query/popAndShow.ts
var createArr = (inputLines, arrLength, startIndex) => {
  let arr = [];
  for (let i = 0;i < arrLength; i++) {
    const elem = inputLines[startIndex + i];
    const ifNotNaNMakeNumber = isNaN(Number(elem)) ? elem : Number(elem);
    arr.push(ifNotNaNMakeNumber);
  }
  return arr;
};
var pop = (arr) => {
  const withoutFirstElem = arr.slice(1, arr.length);
  return withoutFirstElem;
};
var show = (arr) => {
  arr.forEach((elem) => console.log(elem));
};
var popOrShow = (arr, manipulationArr) => {
  let poppedArr = arr;
  manipulationArr.forEach((manipul) => {
    if (typeof manipul !== "string") {
      throw new Error("given manipulation is not string type");
    } else if (manipul === "pop") {
      poppedArr = pop(poppedArr);
    } else if (manipul === "show") {
      show(poppedArr);
    } else {
    }
  });
};
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const firstInputLine = inputLines[0].split(" ").map(Number);
  const arrLength = firstInputLine[0];
  const manipulationLength = firstInputLine[1];
  const arrFromInput = createArr(inputLines, arrLength, 1);
  const manipulationArr = createArr(inputLines, manipulationLength, 1 + arrLength);
  popOrShow(arrFromInput, manipulationArr);
}

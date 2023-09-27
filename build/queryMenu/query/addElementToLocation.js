// src/queryMenu/query/addElementToLocation.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const input = inputLines[0].split(" ").map(Number);
  const arrElementCount = input[0];
  const keyIndex = input[1];
  const keyToInsert = input[2];
  const createArrFromInput = (inputLines2, arrLength) => {
    let arr = [];
    for (let i = 0;i < arrLength; i++) {
      arr.push(Number(inputLines2[i + 1]));
    }
    return arr;
  };
  const arrFromInput = createArrFromInput(inputLines, arrElementCount);
  const insertElemToArr = (arr, keyIndex2, keyToInsert2) => {
    const prevArr = arr.slice(0, keyIndex2);
    const leftArr = arr.slice(keyIndex2, arr.length);
    const insertedArr2 = [...prevArr, keyToInsert2, ...leftArr];
    return insertedArr2;
  };
  const insertedArr = insertElemToArr(arrFromInput, keyIndex, keyToInsert);
  const outputArrToLog = (arr) => {
    arr.map((elem) => {
      console.log(elem);
    });
  };
  outputArrToLog(insertedArr);
}

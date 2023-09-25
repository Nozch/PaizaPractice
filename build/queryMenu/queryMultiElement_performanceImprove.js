// src/queryMenu/query/queryMultiElement_performanceImprove.ts
// paiza でのテストでタイムアウトしなくなる -> 0.61秒
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
  const isKeyIncluded_BinarySearch = (arrSortedAscendingOrder, keyToFind) => {
    let startIndex = 0, endIndex = arrSortedAscendingOrder.length - 1;
    while (startIndex <= endIndex) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2);
      if (keyToFind < arrSortedAscendingOrder[middleIndex]) {
        endIndex = middleIndex - 1;
      } else if (keyToFind > arrSortedAscendingOrder[middleIndex]) {
        startIndex = middleIndex + 1;
      } else {
        return "YES";
      }
    }
    return "NO";
  };
  const isKeyArrIncluded = (arr, keyArr) => {
    const resultArr = keyArr.map((key) => {
      const result = isKeyIncluded_BinarySearch(arr, key);
      return result;
    });
    return resultArr;
  };
  const arrBeingSearched = createArr(inputLines, arrLength, 1).sort((a, b) => a - b);
  const arrIncludeKeys = createArr(inputLines, keyToFindCount, arrLength + 1);
  isKeyArrIncluded(arrBeingSearched, arrIncludeKeys).map((result) => console.log(result));
}

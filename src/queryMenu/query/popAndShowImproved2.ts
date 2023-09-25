// 1.2秒　arrLength = 84000 manipulationLength = 42000の時

const createArr = (inputLines: string[], arrLength: number, startIndex: number) => {
  let arr = []
  for (let i = 0; i < arrLength; i++) {
    const elem = inputLines[startIndex + i];
    arr.push(isNaN(Number(elem)) ? elem : Number(elem));
  }
  return arr;
};

let currentIndex = 0;

const pop = () => {
  currentIndex++;
};

const show = (arr: (string | number)[]) => {
  for (let i = currentIndex; i < arr.length; i++) {
    console.log(arr[i]);
  }
};

const popOrShow = (arr: (string | number)[], manipulationArr: (string | number)[]) => {
  manipulationArr.forEach((manipul) => {
    if (typeof manipul !== 'string') {
      throw new Error('given manipulation is not string type');
    } else if (manipul === 'pop') {
      pop();
    } else if (manipul === 'show') {
      show(arr);
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

  currentIndex = 0;
  popOrShow(arrFromInput, manipulationArr);
}

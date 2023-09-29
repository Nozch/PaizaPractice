// src/queryMenu/vtuber/accounting.ts
process.stdin.setEncoding('utf8');
var inputLines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  inputLines.push(line);
});

reader.on('close', () => {
  const [departmentCount, reciptCount] = inputLines[0].split(" ").map(Number);
  const departments = Array(departmentCount).fill(null).map((_, i) => inputLines[i + 1]);
  let recipts = new Map;
  inputLines.slice(1 + departmentCount).map((line) => {
    const [department, orderNumStr, moneyStr] = line.split(" ");
    const money = +moneyStr;
    const recipt = { orderNumStr, money };
    const prevRecipt = recipts.get(department) || [];
    prevRecipt.push(recipt);
    recipts.set(department, prevRecipt);
  })

  for (const department of departments) {
    const reciptArr = recipts.get(department) || [];
    console.log(department);
    reciptArr.forEach((recipt) => console.log(recipt.orderNumStr, recipt.money));
    console.log("-----");
  }
})

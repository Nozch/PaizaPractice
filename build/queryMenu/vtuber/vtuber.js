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
  // src/queryMenu/vtuber/vtuber.ts
  const chatCount = Number(inputLines[0]);
  let superChatSums = new Map;
  let members = [];
  inputLines.slice(1).map((chat) => {
    const [name, act, moneyStr] = chat.split(" ");
    if (act === "give") {
      const prevSuperChatSum = superChatSums.get(name) || 0;
      const money = +moneyStr;
      superChatSums.set(name, money + prevSuperChatSum);
    } else {
      members.push(name);
    }
  });
  const userAndSumArr = [...superChatSums.entries()];
  userAndSumArr.sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]));
  members.sort((a, b) => a.localeCompare(b));
  userAndSumArr.forEach((userAndSum) => {
    console.log(userAndSum[0]);
  });
  members.forEach((member) => console.log(member));
})
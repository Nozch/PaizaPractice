const readline = require('readline');

const inputLines = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  inputLines.push(line);
});

rl.on('close', () => {
  const [groupMemberCount, eventCount] = inputLines[0]
    .split(' ')
    .map(Number);

  const members = inputLines
    .slice(1, 1 + groupMemberCount);

  const events = inputLines
    .slice(1 + groupMemberCount)
    .map((line, i) => {
      let [yearStr, member] = line.split(' ');
      let year = +yearStr;
      return { year, member };
    });

  events.sort((a, b) => a.year - b.year || a.member.localeCompare(b.member));

  events.forEach((event) => console.log(event.member));
});

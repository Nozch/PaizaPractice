// src/queryMenu/vtuber/historicalTime.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [groupMemberCount, eventCount] = inputLines[0].split(" ").map(Number);
  const members = new Array(groupMemberCount).fill(null).map((_, i) => inputLines[1 + i]);
  const events = new Array(eventCount).fill(null).map((_, i) => {
    let [yearStr, member] = inputLines[1 + groupMemberCount + i].split(" ");
    let year = +yearStr;
    return { year, member };
  });
  events.sort((a, b) => a.year - b.year || a.member.localeCompare(b.member));
  events.forEach((event) => console.log(event.member));
}

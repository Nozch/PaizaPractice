// src/queryMenu/vtuber/idolGroupPerformance.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [initialMemberCount, eventCount] = inputLines[0].split(" ").map(Number);
  const members = new Array(initialMemberCount).fill(null).map((_, i) => inputLines[1 + i]);
  members.sort();
  const membersSet = new Set(members);
  for (let i = 0;i < eventCount; i++) {
    const startIndex = 1 + initialMemberCount;
    const [event, name] = inputLines[startIndex + i].split(" ");
    switch (event) {
      case "join":
        membersSet.add(name);
        break;
      case "leave":
        membersSet.delete(name);
        break;
      case "handshake":
        Array.from(membersSet).sort().forEach((mem) => console.log(mem));
    }
  }
}

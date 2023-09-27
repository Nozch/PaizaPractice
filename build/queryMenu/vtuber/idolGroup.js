// src/queryMenu/vtuber/idolGroup.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [initialMemberCount, eventCount] = inputLines[0].split(" ").map(Number);
  const members = new Array(initialMemberCount).fill(null).map((_, i) => inputLines[1 + i]);
  for (let i = 0;i < eventCount; i++) {
    const startIndex = 1 + initialMemberCount;
    const [event, name] = inputLines[startIndex + i].split(" ");
    switch (event) {
      case "join":
        members.push(name);
        break;
      case "leave":
        const removeThis = members.findIndex((exsistName) => exsistName === name);
        members.splice(removeThis, 1);
        break;
      case "handshake":
        members.sort().forEach((mem) => console.log(mem));
    }
  }
}

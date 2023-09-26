// src/queryMenu/query/joinLeaveCall.ts
var makeStudents = (inputLines, studentCount) => {
  const startIndex = 1;
  const arr = [];
  for (let i = 0;i < studentCount; i++) {
    const line = inputLines[i + startIndex].split(" ");
    const [attendNum, id] = line;
    arr.push({
      attendNum: Number(attendNum),
      id
    });
  }
  return arr;
};
var transformAttendNumtoId = (students, target) => {
  const targetIndex = students.findIndex((student) => student.attendNum === target);
  return students[targetIndex].id;
};
var eventEmulate = (inputLines, students, studentCount, eventCount) => {
  for (let i = 0;i < eventCount; i++) {
    const startIndex = 1 + studentCount;
    const [eventType, attendNum, id] = inputLines[i + startIndex].split(" ");
    switch (eventType) {
      case "join":
        const student = { attendNum: Number(attendNum), id };
        students.push(student);
        break;
      case "leave":
        students = students.filter((student2) => student2.attendNum !== Number(attendNum));
        break;
      case "call":
        const studentId = transformAttendNumtoId(students, Number(attendNum));
        console.log(studentId);
        break;
    }
  }
};
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const firstInputLine = inputLines[0].split(" ").map(Number);
  const studentCount = firstInputLine[0];
  const eventCount = firstInputLine[1];
  const students = makeStudents(inputLines, studentCount);
  eventEmulate(inputLines, students, studentCount, eventCount);
}

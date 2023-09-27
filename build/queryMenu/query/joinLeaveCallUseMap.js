// src/queryMenu/query/joinLeaveCallUseMap.ts
var makeStudents = (inputLines, studentCount) => {
  const studentsMap = new Map;
  const startIndex = 1;
  for (let i = 0;i < studentCount; i++) {
    const line = inputLines[i + startIndex].split(" ");
    const [attendNum, id] = line;
    studentsMap.set(Number(attendNum), id);
  }
  return studentsMap;
};
var transformAttendNumtoId = (students, target) => {
  return students.get(target);
};
var eventEmulate = (inputLines, students, studentCount, eventCount) => {
  for (let i = 0;i < eventCount; i++) {
    const startIndex = 1 + studentCount;
    const [eventType, attendNumStillStr, id] = inputLines[i + startIndex].split(" ");
    const attendNum = Number(attendNumStillStr);
    switch (eventType) {
      case "join":
        students.set(attendNum, id);
        break;
      case "leave":
        students.delete(attendNum);
        break;
      case "call":
        const studentId = transformAttendNumtoId(students, attendNum);
        if (studentId) {
          console.log(studentId);
        }
        break;
    }
  }
};
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [studentCount, eventCount] = inputLines[0].split(" ").map(Number);
  const students = makeStudents(inputLines, studentCount);
  eventEmulate(inputLines, students, studentCount, eventCount);
}

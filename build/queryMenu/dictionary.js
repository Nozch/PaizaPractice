// src/queryMenu/query/dictionary.ts
var makeStudents = (inputLines, s) => {
  const startIndex = 1;
  const arr = [];
  for (let i = 0;i < s; i++) {
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
var callStudentId = (inputLines, students, studentCount, callStudentCount) => {
  for (let i = 0;i < callStudentCount; i++) {
    const startIndex = 1 + studentCount;
    const attendNum = Number(inputLines[startIndex + i]);
    console.log(transformAttendNumtoId(students, attendNum));
  }
};
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const firstInputLine = inputLines[0].split(" ").map(Number);
  const studentCount = firstInputLine[0];
  const callStudentCount = firstInputLine[1];
  const students = makeStudents(inputLines, studentCount);
  callStudentId(inputLines, students, studentCount, callStudentCount);
}

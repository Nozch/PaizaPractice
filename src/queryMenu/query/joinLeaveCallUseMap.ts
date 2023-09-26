// studentCount = 58000, eventCount = 74000で　実行時間 0.42秒
const makeStudents = (inputLines: string[], studentCount: number) => {
  const studentsMap: Map<number, string> = new Map();

  const startIndex = 1
  for(let i = 0; i < studentCount; i++) {
    const line = inputLines[i + startIndex].split(" ")
    const [attendNum, id] = line
    studentsMap.set(Number(attendNum), id) 
  }
  return studentsMap
}

const transformAttendNumtoId = (students: Map<number, string>, target: number) => {
  return students.get(target)
}


  // eventは以下のように与えられる
  // join num id ... 生徒をstudentsに追加する
  // leave num ... 生徒をstudentsからなくす
  // call num ... attendNumを持つ生徒のidを出力

const eventEmulate = (inputLines: string[], students: Map<number, string>, studentCount:number, eventCount: number) => {
  for(let i = 0; i < eventCount; i++) {
    const startIndex = 1 + studentCount

    const [eventType, attendNumStillStr, id]  = inputLines[i + startIndex].split(" ")
    const attendNum = Number(attendNumStillStr)
    switch(eventType) {
      case 'join':
        students.set(attendNum, id)
        break;
      case 'leave':
        students.delete(attendNum)
        break;
      case 'call':
        const studentId = transformAttendNumtoId(students, attendNum)
        if(studentId) {
          console.log(studentId)
        }
        break;
    }
  }
}

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [studentCount, eventCount] = inputLines[0].split(" ").map(Number)

  const students = makeStudents(inputLines, studentCount)

  eventEmulate(inputLines, students, studentCount, eventCount)
}
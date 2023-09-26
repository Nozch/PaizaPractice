type Student = { attendNum: number, id: string }

const makeStudents = (inputLines:string[], studentCount: number) => {
  const startIndex = 1
  const arr: Student[] = []
  for(let i = 0; i < studentCount; i++) {
    const line = inputLines[i + startIndex].split(" ")
    const [attendNum, id] = line
    arr.push({
      attendNum:Number(attendNum),
      id
    });
  }
return arr
}

const transformAttendNumtoId = (students: Student[], target: number) => {
  return students[students.findIndex((student) => student.attendNum === target)].id
}


  // eventは以下のように与えられる
  // join num id ... 生徒をstudentsに追加する
  // leave num ... 生徒をstudentsからなくす
  // call num ... attendNumを持つ生徒のidを出力

const eventEmulate = (inputLines: string[], students: Student[], studentCount:number, eventCount: number) => {
  for(let i = 0; i < eventCount; i++) {
    const startIndex = 1 + studentCount

    const [eventType, attendNum, id]  = inputLines[i + startIndex].split(" ")
    switch(eventType) {
      case 'join':
       
        students.push({ attendNum: Number(attendNum), id })
        break;
      case 'leave':
        students = students.filter((student) => student.attendNum !== Number(attendNum))
        break;
      case 'call':

        console.log(transformAttendNumtoId(students, Number(attendNum)))
        break;
    }
  }
}

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const firstInputLine = inputLines[0].split(" ").map(Number)
  const studentCount = firstInputLine[0]
  const eventCount = firstInputLine[1]

  const students = makeStudents(inputLines, studentCount)

  eventEmulate(inputLines, students, studentCount, eventCount)
}
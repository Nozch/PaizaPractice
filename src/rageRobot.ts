for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const [height, width, robotCount, moveCount] = inputLines[0].split(" ").map(Number)
  const levelUpItemCount = 10;

  const field = {
    height: height,
    width: width
  }

  interface levelUpItem {
    x: number
    y: number
  }

  interface RobotModel {
    x: number
    y: number
    level: number
  }

  class Robot implements RobotModel {
    private _level: number = 1
    private _moveDistance: number = 1
    public x: number
    public y: number

    constructor(robot: RobotModel) {
      this.x = robot.x
      this.y = robot.y
      this.level = robot.level // level の setter を呼び出す
    }

    set level(level: number) {
      console.log("setter was called")
      this._level = level
      this.setMoveDistance()
    }

    get level(): number {
      return this._level
    }
    
    levelUp() {
      this.level = this._level + 1 // levelのsetterを呼び出す。moveDistanceも変えたい。
    }

    private setMoveDistance() {
      const level1Distance = 1
      const level2Distance = 2
      const level3Distance = 5
      const level4Distance = 10

      switch(this._level) {
        case 1:
          this._moveDistance = level1Distance
          break
        case 2:
          this._moveDistance = level2Distance
          break;
        case 3:
          this._moveDistance = level3Distance
          break;
        case 4:
          this._moveDistance = level4Distance
          break;
      }
    }

    move(direction: string) {

      switch (direction) {
        case 'N':
          this.y -= this._moveDistance
          break;
        case 'S':
          this.y += this._moveDistance
          break;
        case 'E':
          this.x += this._moveDistance
          break;
        case 'W':
          this.x -= this._moveDistance
          break;
      }
    }
  }

  const makeLevelUpItems = (inputLines: string[], startIndex: number,levelUpItemCount: number): levelUpItem[] => {
    let levelUpItems: levelUpItem[] = []
    for(let i = 0; i < levelUpItemCount; i++) {
      const [x , y] = inputLines[i + startIndex].split(" ").map(Number)
      levelUpItems.push({ x, y })
    }
    return levelUpItems
  }

  const makeRobots = (inputLines: string[], startIndex: number, robotCount: number): Robot[] => {
    let robots: Robot[] = []
      for(let i = 0; i < robotCount; i++) {
        const [x, y, level] = inputLines[i + startIndex].split(" ").map(Number)
        const robotFromInput: RobotModel = { x : x, y: y, level: level } 
        const robot = new Robot(robotFromInput)
        robots.push(robot)
      }
    return robots
  }

  const makeRobotMoveArr = (inputLines: string[], startIndex: number,moveCount: number): robotMove[] => {
    let robotMove = []
    for(let i = 0; i < moveCount; i++) {
      
      const [robotIndex, direction] = inputLines[i + startIndex].split(" ")
      const robotMoveFromInput = { 
        robotIndex: Number(robotIndex) - 1,
        direction: direction
      }
      robotMove.push(robotMoveFromInput)

    }
    return robotMove
  }

  type robotMove = {
    robotIndex: number
    direction: string
  }

  const levelUpItems = makeLevelUpItems(inputLines, 1, levelUpItemCount)
  const robots = makeRobots(inputLines, levelUpItemCount + 1, robotCount)

  const robotMoveStartIndex = 1 + levelUpItemCount + robotCount
  const robotMoveArr = makeRobotMoveArr(inputLines, robotMoveStartIndex, moveCount)

  // console.log(levelUpItems)
  // console.log(robots)
  // console.log(robotMoveArr)
  robotMoveArr.map((robotMove) => {
    const robot = robots[robotMove.robotIndex]
    const direction = robotMove.direction
    robot.move(direction)
    const [afterMoveX, afterMoveY] = [robot.x, robot.y]
  
    // 移動した先にlevelUpItemあり
    const exists = levelUpItems.some(item => item.x === afterMoveX && item.y === afterMoveY)
    if(exists) {
      robot.levelUp()
    }
  })

  robots.map((robot) => {
    console.log(robot.x, robot.y, robot.level)
  })
}
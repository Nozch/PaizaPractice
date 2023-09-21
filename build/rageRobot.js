// src/rageRobot.ts
for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const [height, width, robotCount, moveCount] = inputLines[0].split(" ").map(Number);
  const levelUpItemCount = 10;
  const field = {
    height,
    width
  };

  class Robot {
    _level = 1;
    _moveDistance = 1;
    x;
    y;
    constructor(robot) {
      this.x = robot.x;
      this.y = robot.y;
      this.level = robot.level;
    }
    set level(level) {
      console.log("setter was called");
      this._level = level;
      this.setMoveDistance();
    }
    get level() {
      return this._level;
    }
    levelUp() {
      this.level = this._level + 1;
    }
    setMoveDistance() {
      const level1Distance = 1;
      const level2Distance = 2;
      const level3Distance = 5;
      const level4Distance = 10;
      switch (this._level) {
        case 1:
          this._moveDistance = level1Distance;
          break;
        case 2:
          this._moveDistance = level2Distance;
          break;
        case 3:
          this._moveDistance = level3Distance;
          break;
        case 4:
          this._moveDistance = level4Distance;
          break;
      }
    }
    move(direction) {
      switch (direction) {
        case "N":
          this.y -= this._moveDistance;
          break;
        case "S":
          this.y += this._moveDistance;
          break;
        case "E":
          this.x += this._moveDistance;
          break;
        case "W":
          this.x -= this._moveDistance;
          break;
      }
    }
  }
  const makeLevelUpItems = (inputLines2, startIndex, levelUpItemCount2) => {
    let levelUpItems2 = [];
    for (let i = 0;i < levelUpItemCount2; i++) {
      const [x, y] = inputLines2[i + startIndex].split(" ").map(Number);
      levelUpItems2.push({ x, y });
    }
    return levelUpItems2;
  };
  const makeRobots = (inputLines2, startIndex, robotCount2) => {
    let robots2 = [];
    for (let i = 0;i < robotCount2; i++) {
      const [x, y, level] = inputLines2[i + startIndex].split(" ").map(Number);
      const robotFromInput = { x, y, level };
      const robot = new Robot(robotFromInput);
      robots2.push(robot);
    }
    return robots2;
  };
  const makeRobotMoveArr = (inputLines2, startIndex, moveCount2) => {
    let robotMove = [];
    for (let i = 0;i < moveCount2; i++) {
      const [robotIndex, direction] = inputLines2[i + startIndex].split(" ");
      const robotMoveFromInput = {
        robotIndex: Number(robotIndex) - 1,
        direction
      };
      robotMove.push(robotMoveFromInput);
    }
    return robotMove;
  };
  const levelUpItems = makeLevelUpItems(inputLines, 1, levelUpItemCount);
  const robots = makeRobots(inputLines, levelUpItemCount + 1, robotCount);
  const robotMoveStartIndex = 1 + levelUpItemCount + robotCount;
  const robotMoveArr = makeRobotMoveArr(inputLines, robotMoveStartIndex, moveCount);
  robotMoveArr.map((robotMove) => {
    const robot = robots[robotMove.robotIndex];
    const direction = robotMove.direction;
    robot.move(direction);
    const [afterMoveX, afterMoveY] = [robot.x, robot.y];
    const exists = levelUpItems.some((item) => item.x === afterMoveX && item.y === afterMoveY);
    if (exists) {
      robot.levelUp();
    }
  });
  robots.map((robot) => {
    console.log(robot.x, robot.y, robot.level);
  });
}

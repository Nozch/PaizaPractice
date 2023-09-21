for await (const chunk of Bun.stdin.stream()) {
  
  interface Car {
    type: string
    fuel: number
    fuelEfficiency: number
    moveSum: number
  }

  class SuperCar {
    type: string
    fuel: number
    fuelEfficiency: number
    moveSum: number = 0;
    run() {
      if(this.fuel !== 0) {
        this.fuel -= 1
        this.moveSum += this.fuelEfficiency
      }
    }

    constructor(car: Car) {
      this.type = car.type
      this.fuel = car.fuel
      this.fuelEfficiency = car.fuelEfficiency
    }
  }

  class SuperSuperCar extends SuperCar {
    fly() {
      if(this.fuel < 5) {
        this.run()
      } else {
      this.fuel -= 5
      this.moveSum += this.fuelEfficiency ** 2
      }
    }
  }

  class SuperSuperSuperCar extends SuperSuperCar {
    // SuperSuperCarのメソッドのオーバーライド
    fly() {
      if(this.fuel < 5) {
        this.run()
      } else {
      this.fuel -= 5
      this.moveSum += 2 * this.fuelEfficiency ** 2 // flyはSuperSuperCarの効率を二倍
      } 
    }
    teleport() {
      if(this.fuel < this.fuelEfficiency ** 2) {
        this.fly()
      } else {
        this.fuel -= this.fuelEfficiency ** 2
        this.moveSum += this.fuelEfficiency ** 4
      }
    }
  }

  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n")

  const carsCount = inputLines[0].split(" ").map(Number)[0]
  const carMovesCount = inputLines[0].split(" ").map(Number)[1]

  type MakeCars = (carCount: number, inputLines: string[]) => Car[]

  const makeCars: MakeCars = (carCount, inputLines) => {
    const cars = Array.from({ length: carCount }, (_, index) => {
      const [type, fuel, fuelEfficiency] = inputLines[1 + index].split(" ")
      return {
        type,
        fuel: Number(fuel),
        fuelEfficiency: Number(fuelEfficiency),
        moveSum: 0 // to fulfill car type temporarily. ( SuperCar constructor initialize moveSum with 0)
      }
    })
    return cars
  }

  const cars = makeCars(carsCount, inputLines)
  // console.log(cars)

  type ClassifyCars = (cars: Car[]) => Car[]
  
  const classifyCars: ClassifyCars = (cars) => {
    const classifiedCars: Car[] = cars.map(car => {
      if(car.type === 'supercar') {
        return new SuperCar(car)
      } else if(car.type === 'supersupercar') {
        return new SuperSuperCar(car) 
      } else if(car.type === 'supersupersupercar') {
        return new SuperSuperSuperCar(car)
      } else {
        throw new Error(`${car.type}は みたこともない車だった...`)
      }

    })
    return classifiedCars
  }

  const classfiedCars = classifyCars(cars)
  // console.log(classfiedCars)

  type CarMove = {
    carIndex: number
    moveMethod: string
  }

  type makeCarsMoves = (carsCount: number, carMovesCount: number, inputLines: string[]) => CarMove[]

  const makeCarMoves: makeCarsMoves = (carCount, carMovesCount, inputLines) => {
    const carMoves: CarMove[] = Array.from({ length: carMovesCount }, (_, index) => {
      const [carIndex, moveMethod] = inputLines[1 + carCount + index].split(" ")
      return {
        carIndex: Number(carIndex) - 1, // 0始まりにする
        moveMethod: moveMethod,
      }
    })
    return carMoves
  }

  const carMovesArr = makeCarMoves(carsCount, carMovesCount, inputLines)
  // console.log(carMovesArr)
  
  // carMovesArrを元に、各車両のインスタンス燃料、走行距離を変更
  const applyCarMove = (carMove: CarMove, classfiedCars: Car[]): Car[] => {
    const car = classfiedCars[carMove.carIndex]
    const moveMethod = carMove.moveMethod

    if(car instanceof SuperSuperSuperCar){

      if(moveMethod === 'run') {
        car.run()
      } else if(moveMethod === 'fly') {
        car.fly()
      } else if(moveMethod === 'teleport') {
        car.teleport()
      }

    } else if (car instanceof SuperSuperCar) {

        if(moveMethod ==='run') {
          car.run()
        } else if(moveMethod === 'fly') {
          car.fly()
        }

    } else if(car instanceof SuperCar) {
        if(moveMethod === 'run') {
          car.run()
        }
    }
    return classfiedCars
  }

  let moveAppliedCars = classfiedCars 
  for(let i = 0; i < carMovesArr.length; i++) {
    const carMove = carMovesArr[i]
    moveAppliedCars = applyCarMove(carMove, moveAppliedCars)
  }
  
  moveAppliedCars.map((car) => console.log(car.moveSum))

}
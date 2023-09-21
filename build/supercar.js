// src/supercar.ts
for await (const chunk of Bun.stdin.stream()) {
  class SuperCar {
    type;
    fuel;
    fuelEfficiency;
    moveSum = 0;
    run() {
      if (this.fuel !== 0) {
        this.fuel -= 1;
        this.moveSum += this.fuelEfficiency;
      }
    }
    constructor(car) {
      this.type = car.type;
      this.fuel = car.fuel;
      this.fuelEfficiency = car.fuelEfficiency;
    }
  }

  class SuperSuperCar extends SuperCar {
    constructor() {
      super(...arguments);
    }
    fly() {
      if (this.fuel < 5) {
        this.run();
      } else {
        this.fuel -= 5;
        this.moveSum += this.fuelEfficiency ** 2;
      }
    }
  }

  class SuperSuperSuperCar extends SuperSuperCar {
    constructor() {
      super(...arguments);
    }
    fly() {
      if (this.fuel < 5) {
        this.run();
      } else {
        this.fuel -= 5;
        this.moveSum += 2 * this.fuelEfficiency ** 2;
      }
    }
    teleport() {
      if (this.fuel < this.fuelEfficiency ** 2) {
        this.fly();
      } else {
        this.fuel -= this.fuelEfficiency ** 2;
        this.moveSum += this.fuelEfficiency ** 4;
      }
    }
  }
  const chunkText = Buffer.from(chunk).toString();
  const inputLines = chunkText.split("\n");
  const carsCount = inputLines[0].split(" ").map(Number)[0];
  const carMovesCount = inputLines[0].split(" ").map(Number)[1];
  const makeCars = (carCount, inputLines2) => {
    const cars2 = Array.from({ length: carCount }, (_, index) => {
      const [type, fuel, fuelEfficiency] = inputLines2[1 + index].split(" ");
      return {
        type,
        fuel: Number(fuel),
        fuelEfficiency: Number(fuelEfficiency),
        moveSum: 0
      };
    });
    return cars2;
  };
  const cars = makeCars(carsCount, inputLines);
  const classifyCars = (cars2) => {
    const classifiedCars = cars2.map((car) => {
      if (car.type === "supercar") {
        return new SuperCar(car);
      } else if (car.type === "supersupercar") {
        return new SuperSuperCar(car);
      } else if (car.type === "supersupersupercar") {
        return new SuperSuperSuperCar(car);
      } else {
        throw new Error(`${car.type}\u306F \u307F\u305F\u3053\u3068\u3082\u306A\u3044\u8ECA\u3060\u3063\u305F...`);
      }
    });
    return classifiedCars;
  };
  const classfiedCars = classifyCars(cars);
  const makeCarMoves = (carCount, carMovesCount2, inputLines2) => {
    const carMoves = Array.from({ length: carMovesCount2 }, (_, index) => {
      const [carIndex, moveMethod] = inputLines2[1 + carCount + index].split(" ");
      return {
        carIndex: Number(carIndex) - 1,
        moveMethod
      };
    });
    return carMoves;
  };
  const carMovesArr = makeCarMoves(carsCount, carMovesCount, inputLines);
  const applyCarMove = (carMove, classfiedCars2) => {
    const car = classfiedCars2[carMove.carIndex];
    const moveMethod = carMove.moveMethod;
    if (car instanceof SuperSuperSuperCar) {
      if (moveMethod === "run") {
        car.run();
      } else if (moveMethod === "fly") {
        car.fly();
      } else if (moveMethod === "teleport") {
        car.teleport();
      }
    } else if (car instanceof SuperSuperCar) {
      if (moveMethod === "run") {
        car.run();
      } else if (moveMethod === "fly") {
        car.fly();
      }
    } else if (car instanceof SuperCar) {
      if (moveMethod === "run") {
        car.run();
      }
    }
    return classfiedCars2;
  };
  let moveAppliedCars = classfiedCars;
  for (let i = 0;i < carMovesArr.length; i++) {
    const carMove = carMovesArr[i];
    moveAppliedCars = applyCarMove(carMove, moveAppliedCars);
  }
  moveAppliedCars.map((car) => console.log(car.moveSum));
}

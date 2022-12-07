import { expect } from "chai";
import Hydration from "../src/Hydration";
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("Hydation", () => {
	let user1;
	let userData;
  let hydrationData;
  let hydration1;

	beforeEach("test setup", function () {
		userData = {
			id: 1,
			name: "Luisa Hane",
			address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
			email: "Diana.Hayes1@hotmail.com",
			strideLength: 4.3,
			dailyStepGoal: 10000,
			friends: [16, 4, 8],
		};
    hydrationData = [
      {
      userID: 1,
      date: "2019/06/15",
      numOunces: 37
      },
      {
      userID: 2,
      date: "2019/06/15",
      numOunces: 75
      },
      {
      userID: 3,
      date: "2019/06/15",
      numOunces: 47
      },
      {
      userID: 1,
      date: "2019/06/16",
      numOunces: 69
      },
      {
      userID: 1,
      date: "2019/06/17",
      numOunces: 96
      },
      {
      userID: 3,
      date: "2019/06/16",
      numOunces: 50
      },
      {
      userID: 3,
      date: "2019/06/17",
      numOunces: 45
      },
      {
      userID: 3,
      date: "2019/06/18",
      numOunces: 44
      },
      {
      userID: 3,
      date: "2019/06/19",
      numOunces: 51
      },
      {
      userID: 3,
      date: "2019/06/20",
      numOunces: 43
      },
      {
      userID: 3,
      date: "2019/06/21",
      numOunces: 42
      }];
		user1 = new User(userData);
    hydration1 = new Hydration(hydrationData);
	});

	it("should be a function", function () {
		expect(Hydration).to.be.a("function");
	});

	it("should be an instance of Hydration", function () {
		expect(hydration1).to.be.an.instanceof(Hydration);
	});

  it("should store hydration data", function () {
    expect(hydration1.hydrationData).to.deep.equal(hydrationData);
  });

  it("should find the average fluid ounces consumed for a user", function () {
		expect(hydration1.findAvrgFluidIntake(1)).to.equal(67);
	});

  it("should show users fluid intake per day", function () {
    expect(hydration1.findDailyFluidIntake(1, "2019/06/15")).to.equal(37);
  });

  it("should show user's weekly fluid intake", function () {
    expect(hydration1.findWeeklyFluidIntake(3)).to.deep.equal({
      dayOne: 47,
      dayTwo: 50,
      dayThree: 45,
      dayFour: 44,
      dayFive: 51,
      daySix: 43,
      daySeven: 42
    });
  });
});

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

  it("should find a users hydration data by id", function () {
    expect(hydration1.findUsersHydrationData(1)).to.deep.equal([
      { userID: 1, date: '2019/06/15', numOunces: 37 },
      { userID: 1, date: '2019/06/16', numOunces: 69 },
      { userID: 1, date: '2019/06/17', numOunces: 96 }
    ])
  });

  it("should tell user if id is not found", function () {
    expect(hydration1.findUsersHydrationData(9000)).to.equal('no id found');
    expect(hydration1.findAvrgFluidIntake(9000)).to.equal('no id found');
    expect(hydration1.findDailyFluidIntake(9000, "2019/06/15")).to.equal('no id found');
    expect(hydration1.findWeeklyFluidIntake(9000)).to.equal('no id found');
  });

  it("should find the average fluid ounces consumed for a user", function () {
		expect(hydration1.findAvrgFluidIntake(1)).to.equal(67);
	});

  it("should show users fluid intake per day", function () {
    expect(hydration1.findDailyFluidIntake(1, "2019/06/15")).to.equal(37);
  });

  it("should show user's weekly fluid intake", function () {
    expect(hydration1.findWeeklyFluidIntake(3)).to.deep.equal({
      one: 47,
      two: 50,
      three: 45,
      four: 44,
      five: 51,
      six: 43,
      seven: 42
    });
  });
});

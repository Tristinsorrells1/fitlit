import { expect } from "chai";
import Sleep from "../src/Sleep";
import User from "../src/User";
import UserRepository from "../src/UserRepository";

describe("Sleep", () => {
	let user1;
	let userData;
  let userRepository;
  let sleepData;
  let sleep1;

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
    sleepData = [
      {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2
      },
      {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 7,
      sleepQuality: 4.7
      },
      {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 4.8
      },{
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 9,
      sleepQuality: 4.9
      },{
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 7,
      sleepQuality: 4.7
      },{
      userID: 1,
      date: "2019/06/20",
      hoursSlept: 6,
      sleepQuality: 4.6
      },{
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7
      },
      {
      userID: 3,
      date: "2019/06/15",
      hoursSlept: 10.8,
      sleepQuality: 4.7
      },{
      userID: 1,
      date: "2019/06/21",
      hoursSlept: 10.5,
      sleepQuality: 4.4
      }];
		user1 = new User(userData);
    userRepository = new UserRepository(userData);
    sleep1 = new Sleep(sleepData);
	});

	it("should be a function", function () {
		expect(Sleep).to.be.a("function");
	});

	it("should be an instance of Hydration", function () {
		expect(sleep1).to.be.an.instanceof(Sleep);
	});

  it("should store sleep data", function () {
    expect(sleep1.sleepData).to.deep.equal(sleepData);
  });

  it("should find a users sleep data by id", function () {
    expect(sleep1.findUsersSleepData(1)).to.deep.equal([
      { userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 },
      { userID: 1, date: '2019/06/16', hoursSlept: 7, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/17', hoursSlept: 8, sleepQuality: 4.8 },
      { userID: 1, date: '2019/06/18', hoursSlept: 9, sleepQuality: 4.9 },
      { userID: 1, date: '2019/06/19', hoursSlept: 7, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/20', hoursSlept: 6, sleepQuality: 4.6 },
      {userID: 1, date: '2019/06/21', hoursSlept: 10.5, sleepQuality: 4.4}
    ])
  });

  it("should find the average hours slept for a user", function () {
		expect(sleep1.findSleepAvrg('hours', 1)).to.equal('7.7');
	});

  it("should find the average sleep quality for a user", function () {
		expect(sleep1.findSleepAvrg('quality', 1)).to.equal('4.3');
	});

  it("should show users hours slept per day", function () {
    expect(sleep1.findSleepInfoByDay(1, "2019/06/15", 'hours')).to.equal(6.1);
  });

  it("should show users sleep quality per day", function () {
    expect(sleep1.findSleepInfoByDay(1, "2019/06/15", 'quality')).to.equal(2.2);
  });

  it("should take in a date and create a week with that date as the last day of the week", function () {
    expect(sleep1.getWeek(1, '2019/06/21')).to.deep.equal([
      {userID: 1, date: '2019/06/21', hoursSlept: 10.5, sleepQuality: 4.4},
      { userID: 1, date: '2019/06/20', hoursSlept: 6, sleepQuality: 4.6 },
      { userID: 1, date: '2019/06/19', hoursSlept: 7, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/18', hoursSlept: 9, sleepQuality: 4.9 },
      { userID: 1, date: '2019/06/17', hoursSlept: 8, sleepQuality: 4.8 },
      { userID: 1, date: '2019/06/16', hoursSlept: 7, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 }
    ])
  });

  it("should show how many hours a user slept each night in a week", function () {
    expect(sleep1.findWeeklySleepInfo(1, "2019/06/21", 'hoursSlept')).to.deep.equal({
			dayOne: 6.1,
			dayTwo: 7,
			dayThree: 8,
			dayFour: 9,
			dayFive: 7,
			daySix: 6,
			daySeven: 10.5,
		});
  });

  it("should show user's weekly sleep quality", function () {
    expect(sleep1.findWeeklySleepInfo(1, "2019/06/21", 'sleepQuality')).to.deep.equal({
			dayOne: 2.2,
			dayTwo: 4.7,
			dayThree: 4.8,
			dayFour: 4.9,
			dayFive: 4.7,
			daySix: 4.6,
			daySeven: 4.4,
		});
  });

  it("should notify user if there is not enough data for the week", function () {
    expect(sleep1.findWeeklySleepInfo(1, "2019/06/15", 'hoursSlept')).to.equal('ERROR - 2019/06/21 is the earliest date you have a full week of information for')
  });

  it("should find average sleep quality amongst all users", function () {
		expect(sleep1.findAllUserSleepQuality(sleepData)).to.equal(4);
	});

  it("should create object of x and y", function () {
		expect(sleep1.getSleepQualityandHours(1)).to.deep.equal([
      { x: 6.1, y: 2.2 },
      { x: 7, y: 4.7 },
      { x: 8, y: 4.8 },
      { x: 9, y: 4.9 },
      { x: 7, y: 4.7 },
      { x: 6, y: 4.6 },
      { x: 10.5, y: 4.4 }
    ]);
	});
});
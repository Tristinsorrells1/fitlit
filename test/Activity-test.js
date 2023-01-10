import { expect } from "chai";
import UserRepository from "../src/UserRepository";
import Activity from "../src/Activity";

describe("Activity", () => {
	let userData;
	let userRepository;
	let activity;
	let activityData;

	beforeEach("test setup", function () {
		userData = [
			{
				id: 1,
				name: "Luisa Hane",
				address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
				email: "Diana.Hayes1@hotmail.com",
				strideLength: 4.3,
				dailyStepGoal: 10000,
				friends: [16, 4, 8],
			},
			{
				id: 2,
				name: "Jarvis Considine",
				address: "30086 Kathryn Port, Ciceroland NE 07273",
				email: "Dimitri.Bechtelar11@gmail.com",
				strideLength: 4.5,
				dailyStepGoal: 5000,
				friends: [9, 18, 24, 19],
			},
			{
				id: 3,
				name: "Herminia Witting",
				address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
				email: "Elwin.Tromp@yahoo.com",
				strideLength: 4.4,
				dailyStepGoal: 5000,
				friends: [19, 11, 42, 33],
			},
		];
		userRepository = new UserRepository(userData);
		activityData = [
			{
				userID: 1,
				date: "2019/06/15",
				numSteps: 3577,
				minutesActive: 140,
				flightsOfStairs: 16,
			},
			{
				userID: 1,
				date: "2019/06/16",
				numSteps: 12000,
				minutesActive: 138,
				flightsOfStairs: 10,
			},
			{
				userID: 1,
				date: "2019/06/17",
				numSteps: 7402,
				minutesActive: 116,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/18",
				numSteps: 14000,
				minutesActive: 0,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/19",
				numSteps: 7402,
				minutesActive: 150,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/20",
				numSteps: 11000,
				minutesActive: 95,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/21",
				numSteps: 7402,
				minutesActive: 62,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/22",
				numSteps: 7402,
				minutesActive: 85,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/23",
				numSteps: 7402,
				minutesActive: 100,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/24",
				numSteps: 7402,
				minutesActive: 111,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/25",
				numSteps: 7402,
				minutesActive: 45,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/26",
				numSteps: 7402,
				minutesActive: 98,
				flightsOfStairs: 33,
			},
			{
				userID: 2,
				date: "2019/06/15",
				numSteps: 3486,
				minutesActive: 114,
				flightsOfStairs: 32,
			},
			{
				userID: 3,
				date: "2019/06/15",
				numSteps: 11374,
				minutesActive: 213,
				flightsOfStairs: 13,
			},
			{
				userID: 6,
				date: "2019/06/15",
				numSteps: 14810,
				minutesActive: 287,
				flightsOfStairs: 18,
			},
			{
				userID: 7,
				date: "2019/06/15",
				numSteps: 2634,
				minutesActive: 107,
				flightsOfStairs: 5,
			},
			{
				userID: 8,
				date: "2019/06/15",
				numSteps: 10333,
				minutesActive: 114,
				flightsOfStairs: 31,
			},
			{
				userID: 9,
				date: "2019/06/15",
				numSteps: 6389,
				minutesActive: 41,
				flightsOfStairs: 33,
			},
			{
				userID: 10,
				date: "2019/06/15",
				numSteps: 8015,
				minutesActive: 106,
				flightsOfStairs: 37,
			},
			{
				userID: 11,
				date: "2019/06/15",
				numSteps: 11652,
				minutesActive: 20,
				flightsOfStairs: 24,
			},
			{
				userID: 12,
				date: "2019/06/15",
				numSteps: 9256,
				minutesActive: 108,
				flightsOfStairs: 2,
			},
		];
		activity = new Activity(activityData);
	});

	it("should be a function", function () {
		expect(Activity).to.be.a("function");
	});

	it("should be an instance of Activity", function () {
		expect(activity).to.be.an.instanceof(Activity);
	});

	it("should store all users' activity data", function () {
		expect(activity.activityData).to.deep.equal(activityData);
	});

	it("should return false if a user with the id is not found", function () {
		expect(activity.findUserByValidId(9000)).to.equal(false);
	});

	it("should return the user's activity data if their id is found", function () {
		expect(activity.findUserByValidId(1)).to.deep.equal([
			{
				userID: 1,
				date: "2019/06/15",
				numSteps: 3577,
				minutesActive: 140,
				flightsOfStairs: 16,
			},
			{
				userID: 1,
				date: "2019/06/16",
				numSteps: 12000,
				minutesActive: 138,
				flightsOfStairs: 10,
			},
			{
				userID: 1,
				date: "2019/06/17",
				numSteps: 7402,
				minutesActive: 116,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/18",
				numSteps: 14000,
				minutesActive: 0,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/19",
				numSteps: 7402,
				minutesActive: 150,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/20",
				numSteps: 11000,
				minutesActive: 95,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/21",
				numSteps: 7402,
				minutesActive: 62,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/22",
				numSteps: 7402,
				minutesActive: 85,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/23",
				numSteps: 7402,
				minutesActive: 100,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/24",
				numSteps: 7402,
				minutesActive: 111,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/25",
				numSteps: 7402,
				minutesActive: 45,
				flightsOfStairs: 33,
			},
			{
				userID: 1,
				date: "2019/06/26",
				numSteps: 7402,
				minutesActive: 98,
				flightsOfStairs: 33,
			},
		]);
	});

	it("should return false if a user with a valid ID does not have data for the date", function () {
		expect(activity.checkForValidDate(1, "2011/09/31")).to.equal(false);
	});

	it("should return true if a user with a valid ID has data for the date", function () {
		expect(activity.checkForValidDate(1, "2019/06/15")).to.equal(true);
	});

	it("should tell user if id is not found", function () {
		expect(
			activity.calculateMilesBySteps("2019/06/15", 9000, userRepository)
		).to.equal("no id found");
		expect(activity.findMinutesActive(9000, "2019/06/16")).to.equal(
			"no id found"
		);
		expect(activity.getWeek(9000, "2019/06/15")).to.equal("no id found");
		expect(
			activity.calculateWeeklyAverageActiveMinutes(9000, "2019/06/15")
		).to.equal("no id found");
		expect(
			activity.compareStepGoalToActualSteps(9000, "2019/06/15", userRepository)
		).to.equal("no id found");
		expect(activity.findAllTimeStairClimbRecord(9000)).to.equal("no id found");
		expect(activity.getDaysUserExceededStepGoal(9000, userRepository)).to.equal(
			"no id found"
		);
		expect(activity.checkForValidDate(9000, "2019/06/15")).to.equal(
			"no id found"
		);
	});

	it("should tell user if date is not found", function () {
		expect(
			activity.calculateMilesBySteps("2019/09/15", 1, userRepository)
		).to.equal(`date not found`);
		expect(activity.findMinutesActive(1, "2019/09/12")).to.equal(
			`date not found`
		);
		expect(
			activity.compareStepGoalToActualSteps(1, "2011/09/31", userRepository)
		).to.equal(`date not found`);
	});

	it("should find a user's stride length", function () {
		expect(
			activity.findSrideLengthOrStepGoal(1, userRepository, "step goal")
		).to.equal(10000);
	});

	it("should find a user's step goal", function () {
		expect(
			activity.findSrideLengthOrStepGoal(1, userRepository, "stride length")
		).to.equal(4.3);
	});

	it("should return the miles a user has walked based on their number of steps that date", function () {
		expect(
			activity.calculateMilesBySteps("2019/06/15", 1, userRepository)
		).to.equal("2.91");
	});

	it("should return how many minutes a user was active for a given day", function () {
		expect(activity.findMinutesActive(1, "2019/06/16")).to.equal(138);
	});

	it("should return how many minutes a user was active on average for the week of the selected date", function () {
		expect(
			activity.calculateWeeklyAverageActiveMinutes(1, "2019/06/26")
		).to.equal(85.14);
	});

	it("should notify user if they met their step goal on a given date", function () {
		expect(
			activity.compareStepGoalToActualSteps(3, "2019/06/15", userRepository)
		).to.equal("Congratulations! You exceeded your step goal by 6374 steps");
	});

	it("should notify user if they did not met their step goal on a given date", function () {
		expect(
			activity.compareStepGoalToActualSteps(2, "2019/06/15", userRepository)
		).to.equal("You fell short of your goal by 1514");
	});

	it("should return a list of all the dates a user exceeded their step goal", function () {
		expect(
			activity.getDaysUserExceededStepGoal(1, userRepository)
		).to.deep.equal(["2019/06/16", "2019/06/18", "2019/06/20"]);
	});

	it("should tell the user if there are no dates they exceeded their step goal", function () {
		expect(activity.getDaysUserExceededStepGoal(2, userRepository)).equal(
			`There are no dates you exceeded your step goal.`
		);
	});

	it("should find a user's all-time stair climbing record", function () {
		expect(activity.findAllTimeStairClimbRecord(1)).to.equal(33);
	});

	it("should find the average number of stairs climbed for a specified date for all users", function () {
		expect(
			activity.findAllUserActivityAvrg(
				activityData,
				"flightsOfStairs",
				"2019/06/15"
			)
		).to.equal(10);
	});

	it("should find the average number of steps taken for a specified date for all users", function () {
		expect(
			activity.findAllUserActivityAvrg(activityData, "numSteps", "2019/06/15")
		).to.equal(3882);
	});

	it("should find the average number of minutes active for a specified date for all users", function () {
		expect(
			activity.findAllUserActivityAvrg(
				activityData,
				"minutesActive",
				"2019/06/15"
			)
		).to.equal(60);
	});
});

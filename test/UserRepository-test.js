import { expect } from "chai";
import UserRepository from "../src/UserRepository";

describe("User Repository", () => {
	let userData;
	let userRepository;
	let user1;

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
		user1 = userData[0];
	});

	it("should be a function", function () {
		expect(UserRepository).to.be.a("function");
	});

	it("should be an instance of UserRepository", function () {
		expect(userRepository).to.be.an.instanceof(UserRepository);
	});

	it("should store all of the Users", function () {
		expect(userRepository.data).to.equal(userData);
	});

	it("should return true if a user with the id is found", function () {
		expect(userRepository.checkForValidId(1)).to.equal(true);
	});

	it("should return false if a user with the id is not found", function () {
		expect(userRepository.checkForValidId(9000)).to.equal(false);
	});

	it("should find User by ID and return their data", function () {
		expect(userRepository.findUser(1)).to.deep.equal(user1);
	});

	it("should tell user if id is not found", function () {
    expect(userRepository.findUser(9000)).to.equal('no id found');
  });

	it("should find average step goal amongst all users", function () {
		expect(userRepository.findAvrgStepGoal(userData)).to.equal(6667);
	});
});
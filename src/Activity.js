import UserRepository from "../src/UserRepository";
let week;

class Activity {
	constructor(activityData) {
		this.activityData = activityData;
	}
	checkForValidId(id) {
		if ((this.activityData.filter((data) => data.userID === id)).length === 0 ) {
			return false;
		}
		return true;
	}
	checkForValidDate(id, date) {
        let findDate = this.findUser(id).find((data) => data.date === date);
		if (findDate === undefined) {
			return false;
		}
		return true;
	}
	findUser(id) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		return this.activityData.filter((user) => user.userID === id);
	}
	calculateMilesBySteps(date, id, userRepository) {
		if (!this.checkForValidId(id)) {
			return `no id found`;
		}
		let user = userRepository.findUser(id);
		let userInfo = this.activityData.filter((user) => user.userID === id);
		let dailyActivity = userInfo.find((activity) => activity.date === date);

		if (!this.checkForValidDate(id, date)) {
			return `date not found`;
		}
		return ((dailyActivity.numSteps * user.strideLength) / 5280).toFixed(2);
	}
	findMinutesActive(id, day) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}

		if (!this.checkForValidDate(id, day)) {
			return `date not found`;
		}
		let findUserOnDate = this.findUser(id).find(
			(userInfo) => userInfo.date === day
		);
		return findUserOnDate.minutesActive;
	}
	getWeek(id, date) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		let userDates = this.findUser(id).reverse();
		let findDate = userDates.find((data) => data.date === date);
		if (findDate === undefined) {
			return `date not found`;
		}
		let indexPosition = userDates.indexOf(findDate);
		week = userDates.slice(indexPosition, indexPosition + 7);
		return week;
	}

	calculateWeeklyAverageActiveMinutes(id, date) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		this.getWeek(id, date);
		if (week.length < 7) {
			let earliestDate = this.findUser(id);
			return `ERROR - ${earliestDate[6].date} is the earliest date you have a full week of information for`;
		}
		let weeklySum =
			week.reduce((accum, day) => {
				accum += day.minutesActive;
				return accum;
			}, 0) / 7;
		weeklySum = weeklySum.toFixed(2);
		return Number(weeklySum);
	}

	compareStepGoalToActualSteps(id, date, userRepository) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		if (!this.checkForValidDate(id, date)) {
			return `date not found`;
		}
		let userInfo = this.activityData.filter((user) => user.userID === id);
		let dailyActivity = userInfo.find((activity) => activity.date === date);
		let user = userRepository.findUser(id);
		let steps = dailyActivity.numSteps - user.dailyStepGoal;
		if (steps > 0) {
			return `Congratulations! You exceeded your step goal by ${steps} steps`;
		}
		return `You fell short of your goal by ${
			user.dailyStepGoal - dailyActivity.numSteps
		}`;
	}
}

export default Activity;

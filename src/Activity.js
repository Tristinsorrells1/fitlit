let week;

class Activity {
	constructor(activityData) {
		this.activityData = activityData;
	}
	checkForValidId(id) {
		if (this.activityData.filter((data) => data.userID === id).length === 0) {
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
		const findUserOnDate = this.findUser(id).find((data) => data.date === day);
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
	getDaysUserExceededStepGoal(id, userRepository) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		let user = userRepository.findUser(id);
		let userInfo = this.findUser(id);
		let daysOverStepGoal = userInfo.filter(
			(day) => day.numSteps > user.dailyStepGoal
		);
		let datesGoalWasExceeded = daysOverStepGoal.map((day) => day.date);
		if (datesGoalWasExceeded.length === 0) {
			return `There are no dates you exceeded your step goal.`;
		}
		return datesGoalWasExceeded;
	}
	findAllTimeStairClimbRecord(id) {
		if (!this.checkForValidId(id)) {
			return "no id found";
		}
		return this.findUser(id)
			.map((user) => user.flightsOfStairs)
			.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
	}
	findAllUserActivityAvrg(data, type, day) {
		const calculateAvrgActivityForAll =
			this.activityData
				.filter((data) => data.date === day)
				.reduce((accum, data) => (accum += data[`${type}`]), 0) / data.length;
		return parseInt(calculateAvrgActivityForAll.toFixed(0));
	}
}

export default Activity;

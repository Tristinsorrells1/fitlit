class Activity {
	constructor(activityData) {
		this.activityData = activityData;
	}

	findUserByValidId(id) {
		if (this.activityData.filter((data) => data.userID === id).length === 0) {
			return false;
		}
		return this.activityData.filter((user) => user.userID === id);
	}

	checkForValidDate(id, date) {
		if (!this.findUserByValidId(id)) {
			return `no id found`;
		}
		if (!this.findUserByValidId(id).find((data) => data.date === date)) {
			return false;
		}
		return true;
	}

	findSrideLengthOrStepGoal(id, userRepository, userInfo) {
		if (userInfo === "step goal") {
			return userRepository.findUser(id).dailyStepGoal;
		}
		return userRepository.findUser(id).strideLength;
	}

	calculateMilesBySteps(date, id, userRepository) {
		if (!this.findUserByValidId(id)) {
			return `no id found`;
		}
		if (!this.checkForValidDate(id, date)) {
			return `date not found`;
		}
		let stepCountOnDate = this.findUserByValidId(id).find(
			(activity) => activity.date === date
		).numSteps;
		return (
			(stepCountOnDate *
				this.findSrideLengthOrStepGoal(id, userRepository, "stride length")) /
			5280
		).toFixed(2);
	}

	findMinutesActive(id, day) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		if (!this.checkForValidDate(id, day)) {
			return `date not found`;
		}
		return this.findUserByValidId(id).find((data) => data.date === day)
			.minutesActive;
	}

	getWeek(id) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		let userDates = this.findUserByValidId(id).reverse();
		let week = userDates.slice(0, 7);
		return week;
	}

	calculateWeeklyAverageActiveMinutes(id, date) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		if (!this.checkForValidDate(id, date)) {
			return `date not found`;
		}
		let week = this.getWeek(id, date);
		if (week.length < 7) {
			let earliestDates = this.findUserByValidId(id);
			return `ERROR - ${earliestDates[6].date} is the earliest date you have a full week of information for`;
		}
		let weeklySum = (
			week.reduce((accum, day) => {
				accum += day.minutesActive;
				return accum;
			}, 0) / 7
		).toFixed(2);
		return Number(weeklySum);
	}

	compareStepGoalToActualSteps(id, date, userRepository) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		if (!this.checkForValidDate(id, date)) {
			return `date not found`;
		}
		let dailyActivity = this.findUserByValidId(id).find(
			(activity) => activity.date === date
		);
		let steps =
			dailyActivity.numSteps -
			this.findSrideLengthOrStepGoal(id, userRepository, "step goal");
		if (steps > 0) {
			return `Congratulations! You exceeded your step goal by ${steps} steps`;
		}
		return `You fell short of your goal by ${
			this.findSrideLengthOrStepGoal(id, userRepository, "step goal") -
			dailyActivity.numSteps
		}`;
	}

	getDaysUserExceededStepGoal(id, userRepository) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		let datesGoalWasExceeded = this.findUserByValidId(id)
			.filter(
				(day) =>
					day.numSteps >
					this.findSrideLengthOrStepGoal(id, userRepository, "step goal")
			)
			.map((day) => day.date);
		if (datesGoalWasExceeded.length === 0) {
			return `There are no dates you exceeded your step goal.`;
		}
		return datesGoalWasExceeded;
	}

	findAllTimeStairClimbRecord(id) {
		if (!this.findUserByValidId(id)) {
			return "no id found";
		}
		return this.findUserByValidId(id)
			.map((user) => user.flightsOfStairs)
			.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
	}

	findAllUserActivityAvrg(data, type, day) {
		const calculateAvrgActivityForAll =
			data
				.filter((data) => data.date === day)
				.reduce((accum, data) => (accum += data[`${type}`]), 0) / data.length;
		return parseInt(calculateAvrgActivityForAll.toFixed(0));
	}
}

export default Activity;

let week;

class Sleep {
	constructor(sleepData) {
		this.sleepData = sleepData;
	}
	findSleepAvrg(id) {
		const getUserSleepInfo = this.sleepData.filter((data) => {
			return data.userID === id;
		});
		const calculateAvrgSleep =
			getUserSleepInfo.reduce((accum, data) => {
				return (accum += data.hoursSlept);
			}, 0) / getUserSleepInfo.length;
		return parseInt(calculateAvrgSleep.toFixed(1));
	}
	findSleepQualityAvrg(id) {
		const getUserSleepQualityInfo = this.sleepData.filter(
			(data) => data.userID === id
		);
		const calculateAvrgSleepQuality =
			getUserSleepQualityInfo.reduce((accum, data) => {
				return (accum += data.sleepQuality);
			}, 0) / getUserSleepQualityInfo.length;
		return parseInt(calculateAvrgSleepQuality.toFixed(1));
	}

	findHoursSleptByDay(id, day) {
		const getDailySleep = this.sleepData.filter((data) => data.date === day);
		const findUserSleepOnDate = getDailySleep.find((data) => {
			return data.userID === id;
		});
		return findUserSleepOnDate.hoursSlept;
	}

	findSleepQualityByDay(id, day) {
		const getDailySleepQuality = this.sleepData.filter(
			(data) => data.date === day
		);
		const findUserSleepQualityOnDate = getDailySleepQuality.find((data) => {
			return data.userID === id;
		});
		return findUserSleepQualityOnDate.sleepQuality;
	}

	getWeek(id, date) {
		let userDates = this.sleepData
			.filter((user) => user.userID === id)
			.reverse();
		let findDate = userDates.find((data) => data.date === date);
		let indexPosition = userDates.indexOf(findDate);
		week = userDates.slice(indexPosition, indexPosition + 7);
		return week;
	}

	findWeeklySleepHours(id, date) {
		this.getWeek(id, date);

		const weeklySleep = () => {
			let sleepByDay = {};
			sleepByDay.dayOne = week[6].hoursSlept;
			sleepByDay.dayTwo = week[5].hoursSlept;
			sleepByDay.dayThree = week[4].hoursSlept;
			sleepByDay.dayFour = week[3].hoursSlept;
			sleepByDay.dayFive = week[2].hoursSlept;
			sleepByDay.daySix = week[1].hoursSlept;
			sleepByDay.daySeven = week[0].hoursSlept;
			return sleepByDay;
		};
		if (week.length < 7) {
			let earliestDate = this.sleepData.filter((user) => user.userID === id);
			return `ERROR - ${earliestDate[6].date} is the earliest date you have a full week of information for`;
		}
		return weeklySleep();
	}

	findWeeklySleepQuality(id, date) {
		this.getWeek(id, date);

		const weeklySleepQuality = () => {
			let sleepQualityByDay = {};
			sleepQualityByDay.dayOne = week[6].sleepQuality;
			sleepQualityByDay.dayTwo = week[5].sleepQuality;
			sleepQualityByDay.dayThree = week[4].sleepQuality;
			sleepQualityByDay.dayFour = week[3].sleepQuality;
			sleepQualityByDay.dayFive = week[2].sleepQuality;
			sleepQualityByDay.daySix = week[1].sleepQuality;
			sleepQualityByDay.daySeven = week[0].sleepQuality;
			return sleepQualityByDay;
		};

		if (week.length < 7) {
			let earliestDate = this.sleepData.filter((user) => user.userID === id);
			return `ERROR - ${earliestDate[6].date} is the earliest date you have a full week of information for`;
		}
		return weeklySleepQuality();
	}

	findAllUserSleepQuality(data) {
		const calculateAvrgSleepQltyForAll =
			this.sleepData.reduce((accum, data) => {
				return (accum += data.sleepQuality);
			}, 0) / data.length;
		return parseInt(calculateAvrgSleepQltyForAll.toFixed(1));
	}

	getSleepQualityandHours(id) {
		const userSleepInfo = this.sleepData.filter((data) => {
			return data.userID === id;
		});

		const userSleepWeek = userSleepInfo.slice(0, 7);

		return userSleepWeek.map((day) => {
			return { x: day.hoursSlept, y: day.sleepQuality };
		});
	}
}

export default Sleep;

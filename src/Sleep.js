let week;

class Sleep {
	constructor(sleepData) {
		this.sleepData = sleepData;
	};

	findUsersSleepData(id) {
		let usersSleepData = this.sleepData.filter((data) => data.userID === id);
		if (usersSleepData.length === 0) {
			return false;
		};
		return usersSleepData;
	};

	findSleepAvrg(type, id) { 
		if (!this.findUsersSleepData(id)) {
			return 'no id found';
		};
		const calculateAvrg =
			this.findUsersSleepData(id).reduce((accum, data) => {
				if (type === "hours") {
					return (accum += data.hoursSlept);
				} else {
					return (accum += data.sleepQuality);
				};
			}, 0) / this.findUsersSleepData(id).length;
		return calculateAvrg.toFixed(1);
	};

	findSleepInfoByDay(id, day, type) {
		if (!this.findUsersSleepData(id)) {
			return 'no id found';
		};
		const findUserSleepInfoOnDate = this.findUsersSleepData(id).find(
			(data) => data.date === day
		);
		if (type === "hours") {
			return findUserSleepInfoOnDate.hoursSlept;
		} else {
			return findUserSleepInfoOnDate.sleepQuality;
		};
	};

	getWeek(id, date) {
		if (!this.findUsersSleepData(id)) {
			return 'no id found';
		};
		let userDates = this.findUsersSleepData(id).reverse();
		let findDate = userDates.find((data) => data.date === date);
		let indexPosition = userDates.indexOf(findDate);
		week = userDates.slice(indexPosition, indexPosition + 7);
		return week;
	};

	findWeeklySleepInfo(id, date, type) {
		if (!this.findUsersSleepData(id)) {
			return 'no id found';
		};
		this.getWeek(id, date);
		const weeklySleep = () => {
			let sleepByDay = {};
			sleepByDay.dayOne = week[6][type];
			sleepByDay.dayTwo = week[5][type];
			sleepByDay.dayThree = week[4][type];
			sleepByDay.dayFour = week[3][type];
			sleepByDay.dayFive = week[2][type];
			sleepByDay.daySix = week[1][type];
			sleepByDay.daySeven = week[0][type];
			return sleepByDay;
		};
		if (week.length < 7) {
			let earliestDate = this.findUsersSleepData(id);
			return `ERROR - ${earliestDate[6].date} is the earliest date you have a full week of information for`;
		};
		return weeklySleep();
	};

	findAllUserSleepQuality(data) {
		const calculateAvrgSleepQltyForAll =
			this.sleepData.reduce((accum, data) => {
				return (accum += data.sleepQuality);
			}, 0) / data.length;
		return parseInt(calculateAvrgSleepQltyForAll.toFixed(0));
	};

	getSleepQualityandHours(id, type) {
		if (!this.findUsersSleepData(id)) {
			return 'no id found';
		};
		const userSleepWeek = this.findUsersSleepData(id).reverse().slice(0, 7);
		const weeklySleepStats = userSleepWeek.reduce((accum, day) => {
			if (type === "hours") {
				accum.push(day.hoursSlept);
			} else {
				accum.push(day.sleepQuality);
			}
			return accum;
		}, []);
		return weeklySleepStats.reverse();
	};
};

export default Sleep;

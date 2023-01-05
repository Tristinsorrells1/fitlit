// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import Hydration from "./Hydration";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
import Sleep from "./Sleep";
import Activity from "./Activity";
import "./css/styles.css";
import "./css/homepage.css"

// ----------------variables-------------------------
let generatedUser;
let usersData;
let sleepData;
let hydrationData;
let activityData;
let sleepDataRepository;
let newUserRepository;
let hydrationDataRepository;
let activityRepository;

//-----------------querySelectors--------------------
let greeting = document.querySelector("h1");
let userAddressandEmail = document.querySelector(".card-info");
let strideLength = document.querySelector("#strideLength");
let recentWaterIntake = document.querySelector("#water");
let hoursOfSleep = document.querySelector("#hoursSlept");
let qualityOfSleep = document.querySelector("#sleepQuality");
let hoursSleptAverage = document.querySelector("#hoursSleptAverage");
let sleepQualityAverage = document.querySelector("#sleepQualityAverage");
let friendSection = document.querySelector(".friends-list");
// const stepsChart = document.getElementById("stepsChart").getContext("2d");
// const sleepChart = document.getElementById("sleepChart").getContext("2d");
// const waterChart = document.getElementById("waterChart").getContext("2d");
Chart.defaults.color = "#bdc1c6";
Chart.defaults.font.size = 16;

// -------------------eventListeners----------------
window.addEventListener("load", (event) => {
	fetchApiPromises();
});

// ------------------functions-----------------------------------
const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		usersData = data[0].userData;
		sleepData = data[1];
		hydrationData = data[2];
		console.log(data[3])
		activityData = data[3];
		createDashboard();
	});
};

function createDashboard() {
	createRepositories();
	generateUser();
	displayCardInfo();
	displayLatestStats();
	displayFriends();
	// createCharts();
}

function createRepositories() {
	newUserRepository = new UserRepository(usersData);
	hydrationDataRepository = new Hydration(hydrationData.hydrationData);
	sleepDataRepository = new Sleep(sleepData.sleepData);
	activityRepository = new Activity(activityData);
}

function generateUser() {
	return (generatedUser = new User(
		newUserRepository.generateRandomUser(usersData)
	));
}

function createCharts() {
	createWaterChart();
	createSleepChart();
	createStepsChart();
}

function displayCardInfo() {
	const generatedUserFirstName = generatedUser.findFirstName();
	greeting.innerText = `Welcome, ${generatedUserFirstName}!`;
	userAddressandEmail.innerText = `${generatedUser.address}  /  ${generatedUser.email}`;
}

function findSleepInsights(type) {
	let usersSleepData = sleepDataRepository.sleepData.filter(
		(data) => data.userID === generatedUser.id
	);
	if (type === "hours") {
		var latestSleepHours = usersSleepData[usersSleepData.length - 1].hoursSlept;
		var sleepAverage = sleepDataRepository.findSleepAvrg(
			"hours",
			generatedUser.id
		);
	} else {
		var latestSleepHours =
			usersSleepData[usersSleepData.length - 1].sleepQuality;
		var sleepAverage = sleepDataRepository.findSleepAvrg(
			"quality",
			generatedUser.id
		);
	}
	if (latestSleepHours > sleepAverage) {
		return `${(latestSleepHours - sleepAverage).toFixed(
			1
		)} more than your average of ${sleepAverage} a night`;
	} else {
		return `${(sleepAverage - latestSleepHours).toFixed(
			1
		)} less than your average of ${sleepAverage} a night`;
	}
}

function displayLatestStats() {
	let waterInfo = hydrationDataRepository.findWeeklyFluidIntake(
		generatedUser.id
	)["seven"];
	let usersSleepData = sleepDataRepository.sleepData.filter(
		(data) => data.userID === generatedUser.id
	);
	strideLength.innerText = `👟 Stride Length: ${generatedUser.strideLength}`;
	recentWaterIntake.innerText = `💧 Hydration: ${waterInfo} ounces of water`;
	hoursOfSleep.innerText = `⏰ Hours Slept: ${
		usersSleepData[usersSleepData.length - 1].hoursSlept
	} hours`;
	qualityOfSleep.innerText = `🛏️ Sleep Quality Score: ${
		usersSleepData[usersSleepData.length - 1].sleepQuality
	}`;
	hoursSleptAverage.innerText = `💡 You slept ${findSleepInsights("hours")}`;
	sleepQualityAverage.innerText = `💡 Your score is ${findSleepInsights(
		"quality"
	)}`;
}

function displayFriends() {
	let friendInfo = {};
	let friends = generatedUser.friends.forEach((friend) => {
		let newFriend = newUserRepository.findUser(friend);
		friendInfo.name = newFriend.name;
		friendInfo.steps = newFriend.dailyStepGoal;
		friendInfo.stride = newFriend.strideLength;
		friendSection.innerHTML += `<div class"friends-container">
				<div class="friend-name">&#9734 ${friendInfo.name}</div>
				<div class="friend-steps">Step Goal: ${friendInfo.steps}</div>
			</div>`;
	});
	return friends;
}

//-----------------------Chart functions-----------------------------
function createStepsChart() {
	const data = {
		labels: ["Step Goals"],
		datasets: [
			{
				label: "Your Step Goal",
				data: [generatedUser.dailyStepGoal],
				backgroundColor: ["rgba(255, 173, 0)"],
				borderWidth: 1,
			},
			{
				label: "Average Step Goal for all Users",
				data: [newUserRepository.findAvrgStepGoal(usersData)],
				backgroundColor: ["rgba(70, 70, 255)"],
				borderWidth: 1,
			},
		],
	};
	const config = {
		type: "bar",
		data: data,
		options: {
			scales: {
				x: {
					title: {
						display: true,
					},
				},
				y: {
					title: {
						display: true,
						text: "Steps",
					},
					suggestedMax: 10000,
					suggestedMin: 0,
				},
			},
			responsive: true,
			plugins: {
				legend: {
					display: true,
				},
				title: {
					display: true,
					text: "Your Step Goal vs Average Step Goal for all Users",
				},
			},
		},
	};
	new Chart(stepsChart, config);
}

function createWaterChart() {
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				data: hydrationDataRepository.findWeeklyFluidIntake(generatedUser.id),
				backgroundColor: [
					"rgba(210, 39, 48)",
					"rgba(70, 70, 255)",
					"rgba(224, 231, 34",
					"rgba(219, 62, 177",
					"rgba(255, 173, 0)",
					"rgba(68, 214, 44)",
					"rgba(128, 49, 167)",
				],
				borderWidth: 1,
			},
		],
	};
	const config = {
		type: "bar",
		data: data,
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: "Days",
					},
				},
				y: {
					title: {
						display: true,
						text: "Ounces of Water",
					},
					suggestedMax: 100,
					suggestedMin: 0,
				},
			},
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: "Ounces of Water Consumed in Past 7 Days",
				},
			},
		},
	};
	new Chart(waterChart, config);
}

function createSleepChart() {
	const labels = ["one", "two", "three", "four", "five", "six", "seven"];
	const data = {
		labels: labels,
		datasets: [
			{
				data: sleepDataRepository.getSleepQualityandHours(
					generatedUser.id,
					"quality"
				),
				label: ["Sleep Quality"],
				backgroundColor: ["rgba(210, 39, 48)"],
				borderColor: "rgba(210, 39, 48)",
				borderWidth: 1,
				showLine: true,
				spanGaps: true,
			},
			{
				data: sleepDataRepository.getSleepQualityandHours(
					generatedUser.id,
					"hours"
				),
				label: ["Hours of Sleep"],
				backgroundColor: ["rgba(224, 231, 34)"],
				borderColor: "rgba(224, 231, 34)",
				borderWidth: 1,
				showLine: true,
				spanGaps: true,
			},
		],
	};
	const config = {
		type: "line",
		data: data,
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: "Days",
					},
				},
				y: {
					title: {
						display: true,
						text: "Sleep Quality / Hours",
					},
					suggestedMax: 10,
					suggestedMin: 0,
				},
			},
			plugins: {
				legend: {
					display: true,
				},
				title: {
					display: true,
					text: "Sleep Quality and Hours Slept for Past 7 Days",
				},
			},
		},
	};
	new Chart(sleepChart, config);
}
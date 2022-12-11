// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import Hydration from "./Hydration";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
import Sleep from "./Sleep";
import "./css/styles.css";

// ----------------variables-------------------------
let generatedUser;
let usersData;
let sleepData;
let hydrationData;
let sleepDataRepository;
let newUserRepository;
let hydrationDataRepository;

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
const stepsChart = document.getElementById("stepsChart").getContext("2d");
const waterChart = document.getElementById("waterChart").getContext("2d");
Chart.defaults.color = "rgb(219, 208, 208)";
Chart.defaults.font.size = 16;
const sleepChart = document.getElementById("sleepChart").getContext("2d");

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
		createDashboard();
	});
};

function createDashboard() {
	createUserRepository();
	createHydrationRepository();
	createSleepDataRepository();
	generateUser();
	displayCardInfo();
	displayLatestStats();
	displayFriends();
	createWaterChart();
	createSleepChart();
	createStepsChart();
}

function createUserRepository() {
	newUserRepository = new UserRepository(usersData);
	return newUserRepository;
}

function createHydrationRepository() {
	hydrationDataRepository = new Hydration(hydrationData.hydrationData);
}

function createSleepDataRepository() {
	sleepDataRepository = new Sleep(sleepData.sleepData);
}

function generateUser() {
	return (generatedUser = new User(newUserRepository.generateRandomUser(usersData)));
}

function displayCardInfo() {
	const generatedUserFirstName = generatedUser.findFirstName();
	greeting.innerText = `Welcome, ${generatedUserFirstName}!`;
	userAddressandEmail.innerText = `${generatedUser.address}  /  ${generatedUser.email}`;
}

function displayLatestStats() {
	let waterInfo = hydrationDataRepository.findWeeklyFluidIntake(generatedUser.id)["seven"];
		let usersSleepData = sleepDataRepository.sleepData.filter(data => data.userID === generatedUser.id);
	strideLength.innerText = `👟 Stride Length: ${generatedUser.strideLength}`;
	recentWaterIntake.innerText = `💧 Ounces of Water Consumed: ${waterInfo}`;
	hoursOfSleep.innerText = `⏰ Hours Slept: ${usersSleepData[usersSleepData.length - 1].hoursSlept}`;
	qualityOfSleep.innerText = `🛏️ Sleep Quality Score: ${usersSleepData[usersSleepData.length - 1].sleepQuality}`;
	hoursSleptAverage.innerText = `🥱 You average ${sleepDataRepository.findSleepAvrg("hours", generatedUser.id)} hours of sleep a night`;
	sleepQualityAverage.innerText = `💤 Your average sleep quality score is ${sleepDataRepository.findSleepAvrg("quality", generatedUser.id)}`;
}

function displayFriends() {
	let friendInfo = {};
	let friends = generatedUser.friends.forEach((friend) => {
		let newFriend = newUserRepository.findUser(friend);
		friendInfo.name = newFriend.name;
		friendInfo.steps = newFriend.dailyStepGoal;
		friendInfo.stride = newFriend.strideLength;
		friendSection.innerHTML += 
		 `<div class"friends-container">
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
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				data: sleepDataRepository.getSleepQualityandHours(generatedUser.id),
				backgroundColor: ["rgba(255, 173, 0)"],
				borderWidth: 1,
			},
		],
	};
	const config = {
		type: "scatter",
		data: data,
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: "Hours Slept",
					},
					type: "linear",
					position: "bottom",
				},
				y: {
					title: {
						display: true,
						text: "Sleep Quality Score",
					},
					type: "linear",
				},
			},
			plugins: {
				legend: {
					display: false,
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
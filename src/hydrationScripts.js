// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import Hydration from "./Hydration";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
// import Activity from "./Activity";
import "./css/styles.css";
import "./css/homepage.css"
import "./css/activity.css";
// ----------------variables-------------------------
let generatedUser;
let usersData;
let hydrationData;
let activityData;
let newUserRepository;
let hydrationDataRepository;
let activityRepository;


//-----------------querySelectors--------------------
let greeting = document.querySelector("h1");
let strideLength = document.querySelector("#strideLength");
let recentWaterIntake = document.querySelector("#water");
let hoursOfSleep = document.querySelector("#hoursSlept");
let qualityOfSleep = document.querySelector("#sleepQuality");
let hoursSleptAverage = document.querySelector("#hoursSleptAverage");
let sleepQualityAverage = document.querySelector("#sleepQualityAverage");
let friendSection = document.querySelector(".friends-list");
let homepageName = document.querySelector(".homepage-name")
let homepageAddress = document.querySelector(".homepage-address")
let homepageEmail = document.querySelector(".homepage-email")

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
	createDropdown();
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

function createDropdown() {
	const generatedUserFirstName = generatedUser.findFirstName();
	greeting.innerText = `Welcome, ${generatedUserFirstName}!`;
	homepageAddress.innerText = generatedUser.address;
	homepageEmail.innerText = generatedUser.email;
	homepageName.innerText = generatedUser.name;
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


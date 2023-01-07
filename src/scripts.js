// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import Hydration from "./Hydration";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
import Sleep from "./Sleep";
import Activity from "./Activity";
import "./css/styles.css";
import "./css/homepage.css";
import "./css/activity.css";

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
let userInfo

//-----------------querySelectors--------------------
let greeting = document.querySelector("h1");
let homepageName = document.querySelector(".homepage-name");
let homepageAddress = document.querySelector(".homepage-address");
let homepageEmail = document.querySelector(".homepage-email");
let postResponseMessage = document.querySelector(".post-result-message");
let form = document.querySelector(".form");
let onHydrationPage = document.querySelector('#hydrationPage')
let onActivityPage = document.querySelector("#activityPage")
let onHomePage = document.querySelector("#homePage")
let onSleepPage = document.querySelector('#sleepPage')
// const stepsChart = document.getElementById("stepsChart").getContext("2d");
const sleepChart = document.getElementById("sleepChart").getContext("2d");
// const waterChart = document.getElementById("waterChart").getContext("2d");
Chart.defaults.color = "white";
Chart.defaults.font.size = 20;

// -------------------eventListeners----------------
window.addEventListener("load", (event) => {
	const fetchApiPromises = () => {
		apiCalls.fetchData().then((data) => {
			usersData = data[0].userData;
			sleepData = data[1];
			hydrationData = data[2];
			activityData = data[3];
			createDashboard();
		});
	};
	fetchApiPromises();
});

// ------------------functions-----------------------------------

function createDashboard() {
	createRepositories();
	generateUser();
	displayLatestStats();
	createDisplays();
}

function createRepositories() {
	newUserRepository = new UserRepository(usersData);
	hydrationDataRepository = new Hydration(hydrationData.hydrationData);
	sleepDataRepository = new Sleep(sleepData.sleepData);
	activityRepository = new Activity(activityData.activityData);
}

function generateUser() {
	generatedUser = new User(
		newUserRepository.generateRandomUser(usersData)
	);
	userInfo = activityRepository
		.findUserByValidId(generatedUser.id)
		.slice(-1)[0];
	return generatedUser
}

function createDisplays() {
	if (onSleepPage) {
		return createSleepChart()
	}
	else if (onActivityPage) {
		createActivityChart(
			flightsOfStairsChart,
			"flightsOfStairs",
			"Flights of Stairs",
			50,
			"Flights of Stairs Climbed for the Past 7 Days"
		);
		createActivityChart(
			minutesActiveChart,
			"minutesActive",
			"Minutes Active",
			500,
			"Minutes of Activity for the Past 7 Days"
		);
		createActivityChart(
			stepsChart,
			"numSteps",
			"Steps",
			1000,
			"Step Count for Past 7 Days"
		);
		return;
	} 
	else if (onHydrationPage) {
		return createWaterChart();
	} 
	else if (onHomePage) {
		createDropdown();
	}
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
	console.log('g')
	if (onActivityPage) {
		activityLatestStats()
	}
	else if (onSleepPage) {
		sleepLatestStats()
	}
	else if (onHydrationPage) {
		hydrationLatestStats();
	}
}

//--------------------------------------Activity----------------------------------------------

// querySelectors for Activity
let activityDate = document.querySelector("#activityDate")
let stepInput = document.querySelector("#numberOfSteps");
let minutesActiveInput = document.querySelector("#minutesActive");
let flightsOfStairsInput = document.querySelector("#flightsOfStairs");
let submitActivityButton = document.querySelector(".activity-button");
let emptyInputMessage = document.querySelector(".empty-input-message");
let strideLength = document.querySelector("#strideLength");
let stepCount = document.querySelector("#stepCount1");
let stepCountInsight = document.querySelector("#stepCountInsight1");
let numMinutesActive = document.querySelector("#minutesActive1");
let minutesActiveInsight = document.querySelector("#minutesActiveInsight");
let numOfStairs = document.querySelector("#flightsOfStairs1");
let flightsOfStairsInsights = document.querySelector("#flightsOfStairsInsights");
let distanceWalked = document.querySelector("#distanceWalked");

// eventLisenters for Activity

submitActivityButton.addEventListener("click", (event) => {
	event.preventDefault();
	getActivityFormInfo();
});

// functions for Acivity

function activityLatestStats() {
	let allUsersStepAvrg = activityRepository.findAllUserActivityAvrg(
		activityData.activityData,
		"numSteps",
		userInfo.date
	);
	let allUsersMinsActiveAvrg = activityRepository.findAllUserActivityAvrg(
		activityData.activityData,
		"minutesActive",
		userInfo.date
	);
	let allUsersStairsAvrg = activityRepository.findAllUserActivityAvrg(
		activityData.activityData,
		"flightsOfStairs",
		userInfo.date
	);
	numMinutesActive.innerText = `⏱️ Minutes Active: ${userInfo.minutesActive}`;
	numOfStairs.innerText = `⛰ Flights of Stairs: ${userInfo.flightsOfStairs}`;
	strideLength.innerText = `👟 Stride Length: ${generatedUser.strideLength}`;
	stepCount.innerText = `🚶 Step Count: ${userInfo.numSteps}`;
	stepCountInsight.innerText = `💡 ${allUsersStepAvrg} steps`;// let usersLastDay = userInfo.date.toString()
	minutesActiveInsight.innerText = `💡 ${allUsersMinsActiveAvrg} active minutes`;
	flightsOfStairsInsights.innerText = `💡 ${allUsersStairsAvrg} flights of stairs`;	
	distanceWalked.innerText = `📍 Distance: ${activityRepository.calculateMilesBySteps(userInfo.date, generatedUser.id, newUserRepository)} miles`
}

function getActivityFormInfo() {
	let inputValues = [activityDate, stepInput, minutesActiveInput, flightsOfStairsInput];
	if (
		!activityDate.value ||
		!stepInput.value.trim() ||
		!minutesActiveInput.value.trim() ||
		!flightsOfStairsInput.value.trim()
	) {
		let filtered = inputValues.filter((userInput) => {
			return userInput.value === "";
		});
		filtered.forEach((field) => {
			field.classList.add("missing-info");
		});
		emptyInputMessage.classList.remove("hidden");
		return;
	}
	emptyInputMessage.classList.add("hidden");
	inputValues.forEach((field) => {
		field.classList.remove("missing-info");
	});

	let formInput = {
		userID: generatedUser.id,
		date: activityDate.value.replaceAll("-", "/"),
		numSteps: stepInput.value,
		minutesActive: minutesActiveInput.value,
		flightsOfStairs: flightsOfStairsInput.value,
	};
	postData(formInput, "activity", "activityData");
	form.reset();
}

function getWeeklyActivity(activityKey) {
	let weeklyActivity =  activityRepository
	.getWeek(userInfo.userID, userInfo.date)
	.map((day) => {
		return Number(day[activityKey])
	})	

	 let activityByDay = {};
		activityByDay.one = weeklyActivity[0];
		activityByDay.two = weeklyActivity[1];
		activityByDay.three = weeklyActivity[2];
		activityByDay.four = weeklyActivity[3];
		activityByDay.five = weeklyActivity[4];
		activityByDay.six = weeklyActivity[5];
		activityByDay.seven = weeklyActivity[6];
	return activityByDay
}
//-----------------------------Sleep------------------------------------
// Sleep querySelectors

let hoursSleptInput = document.querySelector("#hoursSlept");
let sleepQualityInput = document.querySelector("#sleepQuality");
let submitSleepButton = document.querySelector(".sleep-button");
let sleepDate = document.querySelector("#sleepDate")
let hoursOfSleep = document.querySelector("#hoursSlept1");
let qualityOfSleep = document.querySelector("#sleepQuality1");
let hoursSleptAverage = document.querySelector("#hoursSleptAverage");
let sleepQualityAverage = document.querySelector("#sleepQualityAverage");

// Sleep functions

submitSleepButton.addEventListener("click", (event) => {
	event.preventDefault();
	getSleepFormInfo();
	
});

function getSleepFormInfo() {
	let inputValues = [sleepDate, sleepQualityInput, hoursSleptInput];
	if (
		!sleepDate.value ||
		!sleepQualityInput.value.trim() ||
		!hoursSleptInput.value.trim() 
	) {
		let filtered = inputValues.filter((userInput) => {
			return userInput.value === "";
		});
		filtered.forEach((field) => {
			field.classList.add("missing-info");
		});
		emptyInputMessage.classList.remove("hidden");
		return;
	}
	emptyInputMessage.classList.add("hidden");
	inputValues.forEach((field) => {
		field.classList.remove("missing-info");
	});

	let formInput = {
		userID: generatedUser.id,
		date: sleepDate.value.replaceAll("-", "/"),
		sleepQuality: sleepQualityInput.value,
		hoursSlept: hoursSleptInput.value,
	};
	postData(formInput, "sleep", "sleepData");
	form.reset();
}

function sleepLatestStats(){
	let usersSleepData = sleepDataRepository.sleepData.filter(
		(data) => data.userID === generatedUser.id
	);
	qualityOfSleep.innerText = `🛏️ Sleep Quality Score: ${
		usersSleepData[usersSleepData.length - 1].sleepQuality
	}`;
	hoursSleptAverage.innerText = `💡 You slept ${findSleepInsights("hours")}`;
	sleepQualityAverage.innerText = `💡 Your score is ${findSleepInsights(
		"quality"
	)}`;
	hoursOfSleep.innerText = `⏰ Hours Slept: ${
		usersSleepData[usersSleepData.length - 1].hoursSlept
	} hours`;
	qualityOfSleep.innerText = `🛏️ Sleep Quality Score: ${
		usersSleepData[usersSleepData.length - 1].sleepQuality
	}`;
}

//-----------------------------------Hydration--------------------------------
// Hydration queries


let waterConsumed = document.querySelector('#waterConsumed1')
let averageWaterConsumed = document.querySelector('#averageWaterConsumed')

// Hydration Functions

function hydrationLatestStats() {
waterConsumed.innerText = `You drank ${hydrationDataRepository.findWeeklyFluidIntake(
		generatedUser.id
	)["seven"]} ounces of water`
averageWaterConsumed.innerText = `💡 On average, you drink ${hydrationDataRepository.findAvrgFluidIntake(
	generatedUser.id
)} ounces of water a day`;
}

// -------------------------------Network Request Functions -------------------------------------------


function postData(data, path, access) {
	fetch(`http://localhost:3001/api/v1/${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (!response.ok) {
				response.json().then((response) => {
					alert(response.message);
				});
				showPostResult("unknown");
			} else {
				showPostResult("success");
				fetch(`http://localhost:3001/api/v1/${path}`)
					.then((response) => response.json())
					.then((data) => {
						let usersData = data[access]
							.filter((data) => data.userID === generatedUser.id)
							.slice(-3);
						console.log(usersData);
					});
				return;
			}
		})
		.catch((error) => {
			showPostResult("server error");
		});
}

function showPostResult(result) {
	form.classList.add("hidden");
	postResponseMessage.classList.remove("hidden");
	if (result === "success") {
		postResponseMessage.innerText = "Success! Your information was added.";
	} else if (result === "server error") {
		postResponseMessage.innerText =
			"Error - Server is down. Please try again later.";
	} else {
		postResponseMessage.innerText =
			"An unexpected issue has occured. Please try again later.";
	}
	setTimeout(resetForm, 3000);
}

function resetForm() {
	form.classList.remove("hidden");
	postResponseMessage.classList.add("hidden");
}

//-----------------------Chart functions-----------------------------
function createActivityChart(chartId, activityKey, type, suggestedMax, title) {
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				data: getWeeklyActivity(activityKey),
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
						text: type,
					},
					suggestedMax: suggestedMax,
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
					text: title,
				},
			},
		},
	};
	new Chart(chartId, config);
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

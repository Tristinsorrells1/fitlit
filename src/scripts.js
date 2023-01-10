// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import Hydration from "./Hydration";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
import Sleep from "./Sleep";
import Activity from "./Activity";
import "./css/styles.css";
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
let userInfo;

Chart.defaults.color = "white";
Chart.defaults.font.size = 20;

// -------------------Universal-querySelectors-----------------------------
let form = document.querySelector(".form");
let emptyInputMessage = document.querySelector(".empty-input-message");
let postResponseMessage = document.querySelector(".post-result-message");
// --------------------Homepage-querySelectors------------------------------
let greeting = document.querySelector("h1");
let homepageName = document.querySelector(".homepage-name");
let homepageAddress = document.querySelector(".homepage-address");
let homepageEmail = document.querySelector(".homepage-email");
let onHomePage = document.querySelector("#homePage");
// -------------------Activity-querySelectors------------------------------
let onActivityPage = document.querySelector("#activityPage");
let activityDate = document.querySelector("#activityDate");
let stepInput = document.querySelector("#numberOfSteps");
let minutesActiveInput = document.querySelector("#minutesActive");
let flightsOfStairsInput = document.querySelector("#flightsOfStairs");
let submitActivityButton = document.querySelector(".activity-button");
let strideLength = document.querySelector("#strideLength");
let stepCount = document.querySelector("#stepCount1");
let stepCountInsight = document.querySelector("#stepCountInsight1");
let numMinutesActive = document.querySelector("#minutesActive1");
let minutesActiveInsight = document.querySelector("#minutesActiveInsight");
let numOfStairs = document.querySelector("#flightsOfStairs1");
let flightsOfStairsInsights = document.querySelector(
	"#flightsOfStairsInsights"
);
let distanceWalked = document.querySelector("#distanceWalked");
// --------------------Sleep querySelectors----------------------------------
let onSleepPage = document.querySelector("#sleepPage");
let hoursSleptInput = document.querySelector("#hoursSlept");
let sleepQualityInput = document.querySelector("#sleepQuality");
let submitSleepButton = document.querySelector(".sleep-button");
let sleepDate = document.querySelector("#sleepDate");
let hoursOfSleep = document.querySelector("#hoursSlept1");
let qualityOfSleep = document.querySelector("#sleepQuality1");
let hoursSleptAverage = document.querySelector("#hoursSleptAverage");
let sleepQualityAverage = document.querySelector("#sleepQualityAverage");
// -----------------------Hydration-querySelectors----------------------------
let onHydrationPage = document.querySelector("#hydrationPage");
let waterConsumed = document.querySelector("#waterConsumed1");
let averageWaterConsumed = document.querySelector("#averageWaterConsumed");
let waterConsumedInput = document.querySelector("#waterConsumed");
let submitHydrationButton = document.querySelector(".water-button");
let hydrationDate = document.querySelector("#hydrationDate");

// ------------------------eventListeners------------------------------------
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

if (submitActivityButton) {
	submitActivityButton.addEventListener("click", (event) => {
		event.preventDefault();
		getActivityFormInfo();
	});
}

if (submitSleepButton) {
	submitSleepButton.addEventListener("click", (event) => {
		event.preventDefault();
		getSleepFormInfo();
	});
}

if (submitHydrationButton) {
	submitHydrationButton.addEventListener("click", (event) => {
		event.preventDefault();
		getHydrationFormInfo();
	});
}

// ------------------------Universal-functions-----------------------------------
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
	if (localStorage.getItem("generatedUser") === null) {
		generatedUser = new User(newUserRepository.generateRandomUser(usersData));
		localStorage.setItem("generatedUser", JSON.stringify(generatedUser));
	} else {
		let retrievedGeneratedUser = localStorage.getItem("generatedUser");
		let generatedUserData = JSON.parse(retrievedGeneratedUser);
		generatedUser = new User(generatedUserData);
	}
	userInfo = activityRepository
		.findUserByValidId(generatedUser.id)
		.slice(-1)[0];

	return generatedUser;
}

function createDisplays() {
	if (onSleepPage) {
		createSleepChart();
	} else if (onActivityPage) {
		createStepChart();
		createMinsActiveChart();
		createStairsChart();
	} else if (onHydrationPage) {
		createWaterChart();
	} else if (onHomePage) {
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

function displayLatestStats() {
	if (onActivityPage) {
		activityLatestStats();
	} else if (onSleepPage) {
		sleepLatestStats();
	} else if (onHydrationPage) {
		hydrationLatestStats();
	}
}

// ------------------------Activity-functions-----------------------------------
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
	stepCountInsight.innerText = `💡 ${allUsersStepAvrg} steps`;
	minutesActiveInsight.innerText = `💡 ${allUsersMinsActiveAvrg} active minutes`;
	flightsOfStairsInsights.innerText = `💡 ${allUsersStairsAvrg} flights of stairs`;
	distanceWalked.innerText = `📍 Distance: ${activityRepository.calculateMilesBySteps(
		userInfo.date,
		generatedUser.id,
		newUserRepository
	)} miles`;
}

function getActivityFormInfo() {
	let inputValues = [
		activityDate,
		stepInput,
		minutesActiveInput,
		flightsOfStairsInput,
	];
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
	let weeklyActivity = activityRepository
		.getWeek(userInfo.userID)
		.map((day) => {
			return Number(day[activityKey]);
		});
	let activityByDay = {};
	activityByDay.one = weeklyActivity[6];
	activityByDay.two = weeklyActivity[5];
	activityByDay.three = weeklyActivity[4];
	activityByDay.four = weeklyActivity[3];
	activityByDay.five = weeklyActivity[2];
	activityByDay.six = weeklyActivity[1];
	activityByDay.seven = weeklyActivity[0];
	return activityByDay;
}

// ------------------------Sleep-functions-----------------------------------
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

function sleepLatestStats() {
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

// ------------------------Hydration-functions-----------------------------------
function hydrationLatestStats() {
	waterConsumed.innerText = `💧 You drank ${
		hydrationDataRepository.findWeeklyFluidIntake(generatedUser.id)["seven"]
	} ounces of water`;
	averageWaterConsumed.innerText = `💡 On average, you drink ${hydrationDataRepository.findAvrgFluidIntake(
		generatedUser.id
	)} ounces of water a day`;
}

function getHydrationFormInfo() {
	let inputValues = [hydrationDate, waterConsumedInput];
	if (!hydrationDate.value || !waterConsumedInput.value.trim()) {
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
		date: hydrationDate.value.replaceAll("-", "/"),
		numOunces: waterConsumedInput.value,
	};
	postData(formInput, "hydration", "hydrationData");
	form.reset();
}

// ------------------------Network-Request-functions-----------------------------------
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
						fetchApiPromises();
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

// ------------------------Chart-functions-----------------------------------
function createStepChart() {
	let stepChart = Chart.getChart("stepsChart");
	if (stepChart) {
		stepChart.destroy();
	}
	new Chart(document.getElementById("stepsChart"), {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					data: getWeeklyActivity("numSteps"),
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
		},
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
						text: "Steps",
					},
					suggestedMax: 1000,
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
					text: "Step Count for Past 7 Days",
				},
			},
		},
	});
}

function createStairsChart() {
	let stairsChart = Chart.getChart("flightsOfStairsChart");
	if (stairsChart) {
		stairsChart.destroy();
	}
	new Chart(document.getElementById("flightsOfStairsChart"), {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					data: getWeeklyActivity("flightsOfStairs"),
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
		},
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
						text: "Stairs",
					},
					suggestedMax: 50,
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
					text: "Flights of Stairs for Past 7 Days",
				},
			},
		},
	});
}

function createMinsActiveChart() {
	let minsActiveChart = Chart.getChart("minutesActiveChart");
	if (minsActiveChart) {
		minsActiveChart.destroy();
	}
	new Chart(document.getElementById("minutesActiveChart"), {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					data: getWeeklyActivity("minutesActive"),
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
		},
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
						text: "Minutes Active",
					},
					suggestedMax: 500,
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
					text: "Flights of Stairs Climbed for the Past 7 Days",
				},
			},
		},
	});
}

function createWaterChart() {
	let waterChart = Chart.getChart("waterChart");
	if (waterChart) {
		waterChart.destroy();
	}
	new Chart(document.getElementById("waterChart"), {
		type: "bar",
		data: {
			labels: [],
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
		},
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
	});
}

function createSleepChart() {
	let sleepChart = Chart.getChart("sleepChart");
	if (sleepChart) {
		sleepChart.destroy();
	}
	const labels = ["one", "two", "three", "four", "five", "six", "seven"];
	new Chart(document.getElementById("sleepChart"), {
		type: "bar",
		type: "line",
		data: {
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
		},
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
	});
}
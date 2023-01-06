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
let recentWaterIntake = document.querySelector("#water");
let hoursOfSleep = document.querySelector("#hoursSlept");
let qualityOfSleep = document.querySelector("#sleepQuality");
let hoursSleptAverage = document.querySelector("#hoursSleptAverage");
let sleepQualityAverage = document.querySelector("#sleepQualityAverage");
let friendSection = document.querySelector(".friends-list");
let homepageName = document.querySelector(".homepage-name");
let homepageAddress = document.querySelector(".homepage-address");
let homepageEmail = document.querySelector(".homepage-email");
let postResponseMessage = document.querySelector(".post-result-message");
let form = document.querySelector(".form");

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

function createDashboard() {
	createRepositories();
	generateUser();
	// createDropdown();
	displayLatestStats();
	test()
	// displayFriends();
	createCharts();
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

function createCharts() {
	// createWaterChart();
	// createSleepChart();
	createActivityChart("flightsOfStairs", "Flights of Stairs Climbed", 40, "Flights of Stairs Climbed for the Past 7 Days" )
	createActivityChart( "minutesActive", "Minutes Active", 500, "Minutes of Activity for the Past 7 Days" )
	createActivityChart(stepsChart, "numSteps", "Steps", 1000, "Step Count for Past 7 Days");
	
}

// function createDropdown() {
// 	const generatedUserFirstName = generatedUser.findFirstName();
// 	greeting.innerText = `Welcome, ${generatedUserFirstName}!`;
// 	homepageAddress.innerText = generatedUser.address;
// 	homepageEmail.innerText = generatedUser.email;
// 	homepageName.innerText = generatedUser.name;
// }

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
	activityLatestStats()
	// let waterInfo = hydrationDataRepository.findWeeklyFluidIntake(
	// 	generatedUser.id
	// )["seven"];
	// let usersSleepData = sleepDataRepository.sleepData.filter(
	// 	(data) => data.userID === generatedUser.id
	// );
	// recentWaterIntake.innerText = `💧 Hydration: ${waterInfo} ounces of water`;
	// hoursOfSleep.innerText = `⏰ Hours Slept: ${
	// 	usersSleepData[usersSleepData.length - 1].hoursSlept
	// } hours`;
	// qualityOfSleep.innerText = `🛏️ Sleep Quality Score: ${
	// 	usersSleepData[usersSleepData.length - 1].sleepQuality
	// }`;
	// hoursSleptAverage.innerText = `💡 You slept ${findSleepInsights("hours")}`;
	// sleepQualityAverage.innerText = `💡 Your score is ${findSleepInsights(
	// 	"quality"
	// )}`;
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

//--------------------------------------Activity----------------------------------------------

// querySelectors for Activity
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

// eventLisenters for Activity

submitActivityButton.addEventListener("click", (event) => {
	event.preventDefault();
	getActivityFormInfo();
});

// functions for Acivity

function activityLatestStats() {
	console.log(userInfo)
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
	stepCountInsight.innerText = `💡 The average step count for all users on this day was ${allUsersStepAvrg}`;// let usersLastDay = userInfo.date.toString()
	minutesActiveInsight.innerText = `💡 The average number of active minutes for all users on this day was ${allUsersMinsActiveAvrg}`;
	flightsOfStairsInsights.innerText = `💡 The average flights of stairs climbed for all users on this day was ${allUsersStairsAvrg}`;	
}

function getActivityFormInfo() {
	let inputValues = [date, stepInput, minutesActiveInput, flightsOfStairsInput];
	if (
		!date.value ||
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
		date: date.value.replaceAll("-", "/"),
		numSteps: stepInput.value,
		minutesActive: minutesActiveInput.value,
		flightsOfStairs: flightsOfStairsInput.value,
	};
	postData(formInput, "activity", "activityData");
	form.reset();
}

function test(activityKey) {
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
	console.log(activityByDay)	
	return activityByDay
	// let weeklySteps =  activityRepository
	// .getWeek(userInfo.userID, userInfo.date)
	// .map((day) => {
	// 	return Number(day.numSteps)
	// })	

	//  let stepsByDay = {};
	// 	stepsByDay.one = weeklySteps[0];
	// 	stepsByDay.two = weeklySteps[1];
	// 	stepsByDay.three = weeklySteps[2];
	// 	stepsByDay.four = weeklySteps[3];
	// 	stepsByDay.five = weeklySteps[4];
	// 	stepsByDay.six = weeklySteps[5];
	// 	stepsByDay.seven = weeklySteps[6];
	// console.log(stepsByDay)	
	// return stepsByDay
}

// -------------------------------Network Request Functions -------------------------------------------

const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		usersData = data[0].userData;
		sleepData = data[1];
		hydrationData = data[2];
		activityData = data[3];
		createDashboard();
	});
};

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
function createActivityChart(querySelector, activityKey, type, suggestedMax, title) {
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				data: test(activityKey),
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
	new Chart(querySelector, config);
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

// -----------------imports------------------------
// An example of how you tell webpack to use a JS file

import userData from "./data/users";

import UserRepository from "./UserRepository";

import User from "./User";
import Hydration from "./Hydration";

import apiCalls from "./apiCalls";

import fetchData from "./apiCalls";
import Chart from "chart.js/auto";
// import { Chart } from "chart.js";
// An example of how you tell webpack to use a CSS file
import "./css/styles.css";
import Sleep from "./Sleep";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// ----------------variables-------------------------

let usersData;

let sleepData;

let hydrationData;

let generatedUser;

let newUserRepository;

let hydrationDataRepository;

let sleepDataRepository;

let myWaterChart;

let mySleepChart;

let myStepsChart;

let gretting = document.querySelector("h1");

let cardInfo = document.querySelector("#cardInfo");

const stepsChart = document.getElementById("stepsChart").getContext("2d");

const waterChart = document.getElementById("waterChart").getContext("2d");

const sleepChart = document.getElementById("sleepChart").getContext("2d");

// ------------------functions-----------------------------------
const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		usersData = data[0].userData;
		console.log(usersData);
		sleepData = data[1];
		hydrationData = data[2];
		createDashboard();
	});
};

function createDashboard() {
	createUserRepository();
	createUser();
	greetUser();
	displayCardInfo();
	createHydrationRepository();
	createWaterChart();
	createSleepDataRepository();
	createSleepChart();
	createStepsChart();
	testSleep();
}

function createUser() {
	return (generatedUser = new User(
		newUserRepository.generateRandomUser(usersData)
	));
}

function createUserRepository() {
	newUserRepository = new UserRepository(usersData);
	return newUserRepository;
}

function greetUser() {
	const generatedUserFirstName = generatedUser.findFirstName();
	gretting.innerText = `Welcome ${generatedUserFirstName}`;
}

function displayCardInfo() {
	cardInfo.innerText = `id: ${generatedUser.id}, name: ${generatedUser.name}, address: ${generatedUser.address}, email: ${generatedUser.email}, stride length: ${generatedUser.strideLength}, step goal: ${generatedUser.dailyStepGoal}, friends: ${generatedUser.friends}`;
}



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
			// radius: 5,
			// hitRadius: 30,
			// hoverRadius: 12,
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
	myStepsChart = new Chart(stepsChart, config);
}

function createHydrationRepository() {
	hydrationDataRepository = new Hydration(hydrationData.hydrationData);
}
function createWaterChart() {
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				data: hydrationDataRepository.findWeeklyFluidIntake(generatedUser.id),
				backgroundColor: ["rgba(210, 39, 48)", "rgba(70, 70, 255)", "rgba(224, 231, 34", "rgba(219, 62, 177", "rgba(255, 173, 0)", "rgba(68, 214, 44)", "rgba(128, 49, 167)"],
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
						text: "Sleep Quality Score",
					},
				},
			},
			// radius: 5,
			// hitRadius: 30,
			// hoverRadius: 12,
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
	myWaterChart = new Chart(waterChart, config);
}
function createSleepDataRepository() {
	sleepDataRepository = new Sleep(sleepData.sleepData);
}

function createSleepChart() {
	const labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				// label: 'Sleep Quality vs. Hours Slept',
				data: sleepDataRepository.getSleepQualityandHours(generatedUser.id),
				backgroundColor: ["rgba(0, 128, 0)"],
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
					text: "Sleep Quality vs. Hours Slept",
				},
			},
		},
	};
	mySleepChart = new Chart(sleepChart, config);
}

function testSleep() {
	console.log("avrg", newUserRepository.findAvrgStepGoal(usersData));
	console.log("user", generatedUser.dailyStepGoal);
}

// -------------------eventListeners----------------
window.addEventListener("load", (event) => {
	fetchApiPromises();
});

// Do not delete or rename this file ********

console.log(userData, "<>>>>userData");

console.log("This is the JavaScript entry file - your code begins here.");

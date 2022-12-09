// -----------------imports------------------------
// An example of how you tell webpack to use a JS file


import userData from "./data/users";

import UserRepository from "./UserRepository";

import User from "./User";
import Hydration from "./Hydration";

import apiCalls from "./apiCalls";

import fetchData from "./apiCalls";
import Chart from 'chart.js/auto'
// import { Chart } from "chart.js";
// An example of how you tell webpack to use a CSS file
import './css/styles.css';
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

let stepsDataRepository;

let mySleepChart;



let gretting = document.querySelector("h1");

let cardInfo = document.querySelector("#cardInfo");

const stepsChart = document.getElementById('stepsChart').getContext('2d');

const waterChart = document.getElementById('waterChart').getContext('2d');

const sleepChart = document.getElementById('sleepChart').getContext('2d');



// ------------------functions-----------------------------------
const fetchApiPromises = () => {
	apiCalls.fetchData().then(data => {
		usersData = data[0].userData
		console.log(usersData)
		sleepData = data[1]
		hydrationData = data[2]
		createDashboard();
	});
	
};

function createDashboard() {
	createUserRepository();
	createUser();
	greetUser();
	displayCardInfo();
	compareStepGoals();
	createHydrationRepository();
	createWaterChart();
	createSleepDataRepository();
	createSleepChart();
	testSleep();
}

function createUser() {
	return (generatedUser = new User(newUserRepository.generateRandomUser(usersData)));
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

function compareStepGoals() {
	console.log(newUserRepository.findAvrgStepGoal(usersData));
	console.log(generatedUser.dailyStepGoal);
}

function createHydrationRepository() {
	hydrationDataRepository = new Hydration(hydrationData.hydrationData)
}
function createWaterChart() {
	const labels = []
    const data = {
        labels: labels,
        datasets: [{
            data: hydrationDataRepository.findWeeklyFluidIntake(generatedUser.id),
            backgroundColor: [
                'rgba(0, 128, 0)'
            ],
            borderWidth: 1
        }]
    }
	const config =  {
    type: 'bar',
	data: data,
	options: {
		scales: {
			x: {
				title: {
					display: true,
					text: "Days"
				}
			},
			y: {
				title: {
					display: true,
					text: "Sleep Quality Score"
				},
		}
	},
		radius: 5,
		hitRadius: 30,
		hoverRadius: 12,
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		  title: {
			display: true,
			text: "Ounces of Water Consumed in Past 7 Days",
		  }
		}
	}
};
myWaterChart = new Chart(waterChart, config)
}
function createSleepDataRepository() {
 sleepDataRepository = new Sleep(sleepData.sleepData)
}

function createSleepChart() {
	const labels = []
    const data = {
        labels: labels,
        datasets: [{
            // label: 'Sleep Quality vs. Hours Slept',
            data: sleepDataRepository.getSleepQualityandHours(generatedUser.id),
            backgroundColor: [
                'rgba(0, 128, 0)'
            ],
            borderWidth: 1
        }]
    }
	const config = {
		type: 'scatter',
		data: data,
		options: {
		  scales: {
			x: {
				title: {
					display: true,
					text: "Hours Slept"
				},	
			  type: 'linear',
			  position: 'bottom',
			},
			y: {
				title: {
					display: true,
					text: "Sleep Quality Score"
				},	
			  type: 'linear',
			}
		  },
		  plugins: {
			legend: {
				display: false,
			},
			title: {
			  display: true,
			  text: "Sleep Quality vs. Hours Slept",
			}
		  }
		}
	  };
	  mySleepChart = new Chart(sleepChart, config)
}

// function testSleep(){
// 	console.log('new sleep data', sleepDataRepository.getSleepQualityandHours(generatedUser.id))
// }

// -------------------eventListeners----------------
window.addEventListener('load', (event) => {
	fetchApiPromises()
});

// Do not delete or rename this file ********

console.log(userData, "<>>>>userData");

console.log("This is the JavaScript entry file - your code begins here.");

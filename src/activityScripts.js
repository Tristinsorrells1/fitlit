// -----------------imports------------------------
import UserRepository from "./UserRepository";
import User from "./User";
import apiCalls from "./apiCalls";
import Chart from "chart.js/auto";
import Activity from "./Activity";
import "./css/activity.css";
// ----------------variables-------------------------
let generatedUser;
let usersData;
let activityData;
let newUserRepository;
let activityRepository;



//-----------------querySelectors--------------------
let strideLength = document.querySelector("#strideLength");
let formSection = document.querySelector(".form");
let homepageName = document.querySelector(".homepage-name")
let homepageAddress = document.querySelector(".homepage-address")
let homepageEmail = document.querySelector(".homepage-email")
let stepInput = document.querySelector("#numberOfSteps")
let dateInput = document.querySelector("#date")
let minutesActiveInput = document.querySelector("#minutesActive")
let flightsOfStairsInput = document.querySelector("#flightsOfStairs")
let submitButton = document.querySelector(".submit-button")

// const stepsChart = document.getElementById("stepsChart").getContext("2d");
Chart.defaults.color = "#bdc1c6";
Chart.defaults.font.size = 16;

// -------------------eventListeners----------------
window.addEventListener("load", (event) => {
	fetchApiPromises();
});

submitButton.addEventListener("click", (event) => {
    getFormInfo();
    test();
    console.log('new hello')
});
console.log('hello')
// ------------------functions-----------------------------------
const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		usersData = data[0].userData;
		// console.log(data[3])
		activityData = data[3];
		createDashboard();
	});
};

function createDashboard() {
	createRepositories();
	// generateUser();
	displayLatestStats();
	// createCharts();
}

function createRepositories() {
	newUserRepository = new UserRepository(usersData);
	activityRepository = new Activity(activityData);
}

function generateUser() {
	return (generatedUser = new User(
		newUserRepository.generateRandomUser(usersData)
	));
}

function createCharts() {
	createStepsChart();
}

function displayLatestStats() {

}

function getFormInfo() {
    let formData = {
        userID: 1,
			date: "2019/06/17",
			numSteps: stepInput.value,
			minutesActive: minutesActiveInput.value,
			flightsOfStairs: flightsOfStairsInput.value,
    }
    console.log("fromData", formData)
}

function test(){
    console.log('testing')
}
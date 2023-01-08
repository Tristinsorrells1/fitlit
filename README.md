# FitLit!

## Overview of Project 
### Description
Fitlit was a two part group project assigned to a group of three students in Mod 2 of Turing's front-end engineering bootcamp. In part 1, students were given a week to present a useful dashboard for a user to view and see their latest activity data, goals, and milestones using data from three different APIs. The details of part 1 of the project are outline in [this project spec](http://frontend.turing.io/projects/fitlit.html). In part 2, students had to implement the fetch API for accessing the data from a local server and add functionality that enables the user to submit new sleep, hydration, or activity data through a POST request. Students also needed to include proper error handling for users to ensure they GET data and submit their POST requests successfully. Finally, students were expected to make the application accessible by following WCAG 2.1 guidelines. The details of part 2 of the project are outline in [this project spec](https://frontend.turing.edu/projects/Fitlit-part-two.html).

### Goals
- Implement ES6 classes that communicate to each other as needed.
- Use object and array prototype methods to perform data manipulation.
- Create a dashboard that is easy to use and displays information in a clear way.
- Write modular, reusable code that follows SRP (Single Responsibility Principle).
- Implement a robust testing suite using TDD.
- Make network requests to retrieve data.
- Work with a local server and make network requests to API endpoints to retrieve and manipulate data.
- Implement best practices for accessibility

## Technologies Used:
- HTML, CSS, and Javascript 
- Test Driven Development (TDD)
- Fetch API
- Webpack
- Chart.js
- Mocha/Chai
- GitHub project board
- ARIA
- WAVE Evaluation Tool
- Lighthouse

## Installation Instructions:
### Run the local server
- In your terminal, clone 'git@github.com:turingschool-examples/fitlit-api.git' and CD into the directory.
- Run `npm install` to install project dependencies.
- Run `npm start` in to start the local server.
- To stop the local server from running in your terminal use `command + c`.

### Run the application locally using Webapck
- In a second terminal, clone this repository to your local machine and CD into the directory. 
- Run `npm install` to install project dependencies.
- Run `npm start` to get a local host URL. 
- Copy the local host URL given and paste it in your browswer to view the website.
- To stop the local server from running in your terminal use `command + c`.

## App Preview
<img width="721" alt="Screen Shot 2022-12-11 at 8 35 25 PM" src="https://user-images.githubusercontent.com/109977562/206948769-2dfb1e2e-e3bc-4de9-a5b2-1d9d413f2d4b.png">

## Reflection

### Wins
- Using a GET network request to retrieve data from an API and being able to use that data in our code base 
- Making POST newtwork requests with the information a user input in a form 
- Creating strong visuals interfaces using Chart.js. 
- Creating a responsive user interface.
- Receieving a 100% accessibility score from the Lighthouse Accessibility Audit.
- Improved UX by implementing client-side form validation and error handling messages.

### Challenges 
- We could have improved our project board by using issue labels.
- We struggled to update our charts after a user submits new information.
- We had issues using multiple HTML files. All of our querySelectors are in the same JS file, but this caused issues when navigating to a HTML page that did not contain an element with the class or ID we queried. 

### Future Considerations
- In the future, we would like to enable the user to choose which week's data is displayed on their chart.
- We would like to create some sort of step challenge users can participate in with their friends.
- We would like to add a login page for a user.

## Contributors
- Tristin Sorrells [GitHub](https://github.com/Tristinsorrells1), [LinkedIn](https://www.linkedin.com/in/tristinsorrells/)
- Sarah Hampton [GitHub](https://github.com/SHampton22), [LinkedIn](https://www.linkedin.com/in/sarah-hampton-684083255/)
- Gus Deribeaux [GitHub](https://github.com/Gderibeaux), [LinkedIn](https://www.linkedin.com/in/gus-deribeaux-562a511aa/)

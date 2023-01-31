# FitLit!

## Overview of Project 
### Description
FitLit was a two part group project assigned to a group of three students in Mod 2 of the Turing School of Software and Design's Front-End Engineering bootcamp. Students were challenged to create an application similar to Fitbit for users to track and display their fitness information. In the first phase, we designed a dashboard for users to access their most recent metrics and goals by integrating data from three RESTful APIs and presenting it in a user-friendly interface. The details of part 1 of the project are outlined in [this project spec](http://frontend.turing.io/projects/fitlit.html). In the second phase, we added functionality for users to input new sleep, hydration, or activity information via a POST request, and have their dashboard dynamically update to reflect the new data. We included proper error handling message to inform users if the POST request successfully added the new data they input in the form. Our application was designed with complete accessibility in mind and fully conforms to the WCAG 2.1 standards and received a 100% accessibility score from Google's Lighthouse Accessibility Audit. The details of part 2 of the project are outlined in [this project spec](https://frontend.turing.edu/projects/Fitlit-part-two.html).

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
- Google Lighthouse

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

## App Demo
Here is a short video demonstration of our application:

https://user-images.githubusercontent.com/109977562/215620656-add247dd-b273-46ad-a6af-226f83ed8777.mp4

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
- We had several errors that were caused by having a multiple page application because the Webpack starter kit was configured for a single page application and we did not enable multiple entry points in the webpack configuration file (webpack.config.js). We didn't realize that was the cause of several of our bugs until we had already mitigated them and completed the project, but we could have either enabled multiple entry points in the webpack configuration file or displayed all of the information on a single page. 

### Future Considerations
- In the future, we would like to enable the user to choose which week's data is displayed on their chart.
- We would like to create some sort of step challenge users can participate in with their friends.
- We would like to add a login page for a user.

## Contributors
- Tristin Sorrells [GitHub](https://github.com/Tristinsorrells1), [LinkedIn](https://www.linkedin.com/in/tristinsorrells/)
- Sarah Hampton [GitHub](https://github.com/SHampton22), [LinkedIn](https://www.linkedin.com/in/sarah-hampton-684083255/)
- Gus Deribeaux [GitHub](https://github.com/Gderibeaux), [LinkedIn](https://www.linkedin.com/in/gus-deribeaux-562a511aa/)

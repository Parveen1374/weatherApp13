### weather app

This is a simple weather application built with React that allows users to search for weather information by location. It provides details such as temperature, humidity, wind speed, and weather description. The application also includes a dark mode toggle.

### Instructions to Run the Application Locally

Prerequisites
-> Node.js 
-> npm (v6.x or higher)

### steps

1.Clone the repository

~git clone https://github.com/your-username/weather-app.git
~cd weather-app

2.Install dependencies

~npm install

3.Run the application

~npm start

4.Open the application in your browser

Open your web browser and navigate to [http://localhost:3000]

### Brief Description of the Approach and Technologies Used

=> Approach
This application fetches weather data from the OpenWeatherMap API based on user input. It uses React for the user interface, with hooks (useState, useEffect) to manage state and side effects. The app includes a theme toggle for light and dark modes, and it updates the current time every second.

=>Technologies Used
React: A JavaScript library for building user interfaces.
axios: A promise-based HTTP client for making API requests.
react-icons: A library for including popular icons in React projects.
CSS: Custom styling for the application.


### Known Issues or Limitations

=> API Key Management: The API key is hardcoded in the code. It should be managed securely using environment variables or a server-side solution.
=> Error Handling: Basic error handling is implemented, but it can be improved to provide more user-friendly messages.
=> Responsive Design: The application is not fully optimized for all screen sizes and devices.
=> Unit Testing: There are no unit tests included in this project. Adding tests would improve reliability and maintainability.

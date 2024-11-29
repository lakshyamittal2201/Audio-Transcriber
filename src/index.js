// Import necessary dependencies
import React from 'react'; // React library to build the components
import ReactDOM from 'react-dom/client'; // ReactDOM to render the app to the DOM
import './styles.css'; // Import custom CSS styles for the app
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import the web vitals function (for measuring app performance)

// Create a root element where the React app will be mounted in the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App /> {/* Render the App component inside StrictMode for development */}
  </React.StrictMode>
);


 // Call the reportWebVitals function (it's set up for measuring performance)
reportWebVitals();

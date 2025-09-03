// Predefined notifications
const notifications = [
  "New message from John",
  "Server downtime scheduled",
  "Reminder: Meeting at 3 PM"
];

// Index to keep track of which notification to show next
let notificationIndex = 0;

// Function to toggle notification bar
function toggleNotifications() {
  const notificationBar = document.getElementById('notification-bar');
  
  // Show the notification bar if it's hidden
  if (notificationBar.style.display === 'none' || notificationBar.style.display === '') {
      notificationBar.style.display = 'block';
      
      // Add the next notification to the bar
      if (notificationIndex < notifications.length) {
          addNotification(notifications[notificationIndex]);
          notificationIndex++;
      }
  } else {
      // Hide the notification bar if it's visible
      notificationBar.style.display = 'none';
  }
}

// Function to add a notification dynamically
function addNotification(message) {
  const notificationBar = document.getElementById('notification-bar');
  
  // Create a new notification element
  const notificationItem = document.createElement('div');
  notificationItem.classList.add('notification-item');
  
  // Assign different colors based on the notification index
  if (notificationIndex === 0) {
      notificationItem.classList.add('notification-item-1');
  } else if (notificationIndex === 1) {
      notificationItem.classList.add('notification-item-2');
  } else if (notificationIndex === 2) {
      notificationItem.classList.add('notification-item-3');
  }
  
  // Set the message for the notification
  notificationItem.textContent = message;
  
  // Append the notification to the notification bar
  notificationBar.appendChild(notificationItem);
}

// Close Notification Bar when clicking anywhere outside
function closeNotifications(event) {
  // Prevent closing when clicking inside the notification bar or bell icon
  if (event && event.target.closest('#notification-bar, #notification-icon')) {
      return;
  }
  document.getElementById('notification-bar').style.display = 'none';
}

// Add event listener for clicks outside the notification bar to close it
document.addEventListener('click', closeNotifications);

const socket = io();
const parametersList = document.getElementById('parameters');
const parameterForm = document.getElementById('parameterForm');
const parameterValue = document.getElementById('parameterValue');

// This function fetches the latest data for the dashboard
async function fetchDashboardData() {
  try {
    const response = await fetch("http://localhost:5000/api/parameters");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Update the parameter values on the dashboard
    document.getElementById("inflow-rate").textContent = `${data.inflowRate} m³/s`;
    document.getElementById("outflow-rate").textContent = `${data.outflowRate} m³/s`;
    document.getElementById("pressure").textContent = `${data.pressure} bar`;
    document.getElementById("velocity").textContent = `${data.velocity} m/s`;
    document.getElementById("efficiency").textContent = `${data.efficiency}%`;
    document.getElementById("power-output").textContent = `${data.powerOutput} MW`;
    document.getElementById("water-utilization").textContent = `${data.waterUtilization}%`;
    document.getElementById("temperature").textContent = `${data.temperature}°C`;

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
}

// Listen for real-time updates via Socket.IO
socket.on('dashboardUpdate', (updatedData) => {
  // Update the dashboard with real-time data
  document.getElementById("inflow-rate").textContent = `${updatedData.inflowRate} m³/s`;
  document.getElementById("outflow-rate").textContent = `${updatedData.outflowRate} m³/s`;
  document.getElementById("pressure").textContent = `${updatedData.pressure} bar`;
  document.getElementById("velocity").textContent = `${updatedData.velocity} m/s`;
  document.getElementById("efficiency").textContent = `${updatedData.efficiency}%`;
  document.getElementById("power-output").textContent = `${updatedData.powerOutput} MW`;
  document.getElementById("water-utilization").textContent = `${updatedData.waterUtilization}%`;
  document.getElementById("temperature").textContent = `${updatedData.temperature}°C`;
});

// Fetch the initial dashboard data on page load
window.addEventListener('load', fetchDashboardData);

// Update the dashboard data every 5 seconds (you can adjust the interval)
setInterval(fetchDashboardData, 5000);

// Handle form submission for adding a new parameter (if required)
parameterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = parameterValue.value;
  fetch('http://localhost:5000/api/parameters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),  // Make sure to match your API's expected data format
  })
  .then((res) => res.json())
  .then(() => {
    parameterValue.value = '';  // Clear input field
  })
  .catch((error) => {
    console.error('Error adding parameter:', error);
    alert('Error adding parameter!');
  });
});


// Fetch data every 2 seconds
setInterval(fetchDashboardData, 1000);

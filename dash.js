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

// Example function to update the parameter values dynamically
function updateDashboardData() {
    // Example: Dynamically update parameter values
    document.getElementById('inflow-rate').textContent = '16.4 m³/s';
    document.getElementById('outflow-rate').textContent = '14.0 m³/s';
    document.getElementById('pressure').textContent = '22 bar';
    document.getElementById('velocity').textContent = '6.2 m/s';
    document.getElementById('efficiency').textContent = '88%';
    document.getElementById('power-output').textContent = '270 MW';
    document.getElementById('water-utilization').textContent = '93%';
    document.getElementById('temperature').textContent = '30°C';
}

// Simulate the update every 5 seconds
setInterval(updateDashboardData, 5000);

// Water Level Monitoring
const waterLevelCtx = document.getElementById('chart1').getContext('2d');
const waterLevelData = {
    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
    datasets: [{
        label: 'Water Level (%)',
        data: [78, 80, 76, 75, 77, 79],
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        tension: 0.4,
    }]
};
const waterLevelChart = new Chart(waterLevelCtx, {
    type: 'line',
    data: waterLevelData,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 70, // Set the minimum value for the y-axis
                max: 90, // Set the maximum value for the y-axis
            }
        }
    }
});

// Flow Rate Monitoring
const flowRateCtx = document.getElementById('chart2').getContext('2d');
const flowRateData = {
    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
    datasets: [{
        label: 'Flow Rate (m³/s)',
        data: [120, 125, 130, 128, 135, 138],
        borderColor: '#ff5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        tension: 0.4,
    }]
};
const flowRateChart = new Chart(flowRateCtx, {
    type: 'line',
    data: flowRateData,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 100, // Set the minimum value for the y-axis
                max: 150, // Set the maximum value for the y-axis
            }
        }
    }
});

// Pressure Monitoring
const pressureCtx = document.getElementById('chart3').getContext('2d');
const pressureData = {
    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
    datasets: [{
        label: 'Pressure (Pa)',
        data: [1010, 1020, 1015, 1018, 1022, 1017],
        borderColor: '#33ff57',
        backgroundColor: 'rgba(51, 255, 87, 0.2)',
        tension: 0.4,
    }]
};
const pressureChart = new Chart(pressureCtx, {
    type: 'line',
    data: pressureData,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 1000, // Set the minimum value for the y-axis
                max: 1050, // Set the maximum value for the y-axis
            }
        }
    }
});

// Temperature Monitoring
const tempCtx = document.getElementById('chart4').getContext('2d');
const tempData = {
    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
    datasets: [{
        label: 'Temperature (°C)',
        data: [20, 21, 22, 21.5, 22.2, 23.8],
        borderColor: '#5733ff',
        backgroundColor: 'rgba(87, 51, 255, 0.2)',
        tension: 0.4,
    }]
};
const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: tempData,
    options: {
        responsive: true,
        scales: {
            y: {
                min: 18, // Set the minimum value for the y-axis
                max: 25, // Set the maximum value for the y-axis
            }
        }
    }
});

// Function to simulate real-time data fluctuation with smaller changes
function updateChartData(chart, data) {
    // Shift all data values and add a new value with smaller fluctuation
    data.datasets[0].data.shift();
    data.datasets[0].data.push(data.datasets[0].data[data.datasets[0].data.length - 1] + (Math.random() * 1 - 0.5)); // Simulating subtle fluctuation
    chart.update();
}

// Simulating real-time updates
setInterval(function() {
    updateChartData(waterLevelChart, waterLevelData);
    updateChartData(flowRateChart, flowRateData);
    updateChartData(pressureChart, pressureData);
    updateChartData(tempChart, tempData);
}, 1000); // Update every second  

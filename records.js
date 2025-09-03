// Static records data
const records = [
    { id: 1, date: '2024-12-01T10:00', parameter: 'Reservoir Level', value: 65, unit: 'm' },
    { id: 2, date: '2024-12-02T12:30', parameter: 'Flow Rate', value: 100, unit: 'm³/s' },
    { id: 3, date: '2024-12-03T09:15', parameter: 'Turbine Efficiency', value: 85, unit: '%' },
    { id: 4, date: '2024-12-04T14:45', parameter: 'Water Temperature', value: 14, unit: '°C' },
    { id: 5, date: '2024-12-05T11:30', parameter: 'Pressure Head', value: 20, unit: 'm' },
];

// Function to load all records initially
function loadRecords() {
    const tableBody = document.getElementById('records-table-body');
    tableBody.innerHTML = '';
    records.forEach(record => {
        const row = `
            <tr>
                <td>${record.id}</td>
                <td>${record.date}</td>
                <td>${record.parameter}</td>
                <td>${record.value}</td>
                <td>${record.unit}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to filter records by date
function filterRecords() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const filteredRecords = records.filter(record => {
        const recordDate = new Date(record.date);
        return (!startDate || new Date(startDate) <= recordDate) &&
               (!endDate || new Date(endDate) >= recordDate);
    });

    const tableBody = document.getElementById('records-table-body');
    tableBody.innerHTML = '';
    filteredRecords.forEach(record => {
        const row = `
            <tr>
                <td>${record.id}</td>
                <td>${record.date}</td>
                <td>${record.parameter}</td>
                <td>${record.value}</td>
                <td>${record.unit}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Load records on page load
window.onload = loadRecords;

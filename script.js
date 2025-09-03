document.getElementById('prediction-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const feature1 = document.getElementById('feature1').value;
    const feature2 = document.getElementById('feature2').value;
    const feature3 = document.getElementById('feature3').value;

    // Prepare input data for API
    const inputData = [{ feature1: parseFloat(feature1), feature2: parseFloat(feature2), feature3: parseFloat(feature3) }];

    try {
        // Send POST request to the API
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });

        const data = await response.json();
        document.getElementById('result').innerText = `Prediction: ${data.predictions[0]}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error fetching prediction';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.input-form');
    const inputs = document.querySelectorAll('.form-input');
    const button = document.querySelector('.predict-button');
    const resultDisplay = document.getElementById('result-value')

    button.addEventListener('click', function(event) {
        event.preventDefault();
        let allValid = true;
        let formData = {};
        inputs.forEach(input => {
            const value = input.value.trim();
            if (isNaN(value) || value === '') {
                allValid = false;
                alert(`Error: Please enter a valid numerical value for ${input.getAttribute('aria-label')}`);
                input.focus();
                return; 
            }
            formData[input.id] = value;
        });

        if (allValid) {
            avg_temp = (parseFloat(document.getElementById('maxUpperTRange').value) + parseFloat(document.getElementById('minUpperTRange').value) + parseFloat(document.getElementById('maxLowerTRange').value) + parseFloat(document.getElementById('minLowerTRange').value))/4
            fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clonesize: parseFloat(document.getElementById('clonesize').value),
                    honeybee: parseFloat(document.getElementById('honeybee').value),
                    bumbles: parseFloat(document.getElementById('bumbles').value),
                    andrena: parseFloat(document.getElementById('andrena').value),
                    osmia: parseFloat(document.getElementById('osmia').value),
                    mean_temp: avg_temp,
                    AverageRainingDays: parseFloat(document.getElementById('avgRainingDays').value),
                })
            })
            .then(response => response.json())
            .then(data => {
                const prediction = data.prediction;
                resultDisplay.textContent = prediction
            })
            .catch(error => console.error('Error:', error));
        }
    });
});

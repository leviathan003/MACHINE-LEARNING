document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriterText');
    const imgElement = document.getElementById('svgImage');
    const startButton = document.getElementById('predictButton');
    const svgs = [
        '/static/assets_doctor/DOC_CLOSED.svg',
        '/static/assets_doctor/DOC_OPEN.svg',
        '/static/assets_doctor/DOC_O_MOUTH.svg'
    ];
    let typewriterIntervalId;
    let slideshowIntervalId;
    let svgIndex = 1;

    function typeWriter(text) {
        let textIndex = 0;
        typewriterElement.innerHTML = "";

        typewriterIntervalId = setInterval(() => {
            if (textIndex < text.length) {
                typewriterElement.innerHTML += text.charAt(textIndex);
                textIndex++;
            } else {
                clearInterval(typewriterIntervalId);
            }
        }, 70);
    }

    function startSlideshow() {
        imgElement.src = svgs[svgIndex];
        svgIndex = (svgIndex + 1) % svgs.length;
    }

    function startTypewriterAndSlideshow(text) {
        typeWriter(text);

        imgElement.src = svgs[0]; // Set initial SVG
        svgIndex = 1; // Start from the second SVG
        slideshowIntervalId = setInterval(startSlideshow, 300); // Start the slideshow

        // Stop the slideshow after 5 seconds and revert to the first SVG
        setTimeout(() => {
            clearInterval(slideshowIntervalId);
            imgElement.src = svgs[0];
        }, 7000);
    }

    function fetchPrediction() {
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: parseInt(document.getElementById('age').value),
                education: parseInt(document.getElementById('education').value),
                socioeconomic: parseInt(document.getElementById('socioeconomic').value),
                mmse: parseFloat(document.getElementById('mmse').value),
                cdr: parseFloat(document.getElementById('cdr').value),
                etiv: parseFloat(document.getElementById('etiv').value),
                nwbv: parseFloat(document.getElementById('nwbv').value),
                asf: parseFloat(document.getElementById('asf').value),
                gender: document.getElementById('gender').value,
            })
        })
        .then(response => response.json())
        .then(data => {
            const prediction = data.prediction;
            startTypewriterAndSlideshow(prediction);
        })
        .catch(error => console.error('Error:', error));
    }

    startButton.addEventListener('click', fetchPrediction);
});

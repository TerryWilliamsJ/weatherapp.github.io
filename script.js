document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('city').value;
    const apiKey = '50a7aa80fa492fa92e874d23ad061374'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            if (data.cod === 200) {
                const weather = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                weatherResult.innerHTML = weather;
                weatherResult.classList.add('show');
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
                weatherResult.classList.add('show');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherResult = document.getElementById('weather-result');
            weatherResult.innerHTML = `<p>Failed to retrieve data. Please try again later.</p>`;
            weatherResult.classList.add('show');
        });
});

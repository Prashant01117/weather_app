const apiKey = '1d90881bf9e2ce79c0cb7c478cd45430'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    const { main, weather, wind, dt } = data;
    const date = new Date(dt * 1000);

    currentWeatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
    `;
}

function displayForecast(data) {
    const dates = [];
    const temperatures = [];
    const humidities = [];

    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        dates.push(date.toLocaleDateString());
        temperatures.push(item.main.temp);
        humidities.push(item.main.humidity);
    });

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value',
                    },
                },
            },
        },
    });
}



// Function to fetch weather data
async function fetchWeather(location) {
    const apiKey = 'c538991d155e8a3f04c3f05f4cbeac42';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        updateWeather(data); // Call function to update UI
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

// Function to update the UI
function updateWeather(data) {
    const dayElement = document.querySelector('.day');
    const dateElement = document.querySelector('.date');
    const locationElement = document.querySelector('.location');
    const weatherSymbolElement = document.querySelector('.weather-symbol');
    const temperatureElement = document.querySelector('.temperature');
    const weatherConditionElement = document.querySelector('.weather-condition');

    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const currentDate = new Date().toLocaleDateString('en-US');

    dayElement.innerHTML = currentDay;
    dateElement.innerHTML = currentDate;
    locationElement.innerHTML = `<span class="text-size"><i class="bx bxs-map"></i> ${data.name}</span>`;

    const weatherDescription = data.weather[0].main.toLowerCase();
    switch (weatherDescription) {
        case 'clear':
            weatherSymbolElement.innerHTML = '<i class="bx bx-sun text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Clear</span>';
            break;
        case 'clouds':
            weatherSymbolElement.innerHTML = '<i class="bx bx-cloud text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Clouds</span>';
            break;
        case 'rain':
            weatherSymbolElement.innerHTML = '<i class="bx bx-cloud-rain text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Rain</span>';
            break;
        case 'drizzle':
            weatherSymbolElement.innerHTML = '<i class="bx bx-cloud-rain text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Drizzle</span>';
            break;
        case 'thunderstorm':
            weatherSymbolElement.innerHTML = '<i class="bx bx-lightning text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Thunderstorm</span>';
            break;
        case 'snow':
            weatherSymbolElement.innerHTML = '<i class="bx bx-cloud-snow text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Snow</span>';
            break;
        default:
            weatherSymbolElement.innerHTML = '<i class="bx bx-question-mark text-size"></i>';
            weatherConditionElement.innerHTML = '<span>Unknown</span>';
    }

    temperatureElement.innerHTML = `${Math.round(data.main.temp)}°C`;
}

// Event listener for the search button
document.querySelector('.btn-primary').addEventListener('click', () => {
    const location = document.querySelector('.form-control').value;
    fetchWeather(location);
});


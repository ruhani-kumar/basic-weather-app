// to fetch the weather data from the API and update the UI
async function fetchWeather() {
    let searchInput = document.getElementById('search').value;
    const weatherBox = document.getElementById('weather-box');
    weatherBox.style.display = "block";
    const apiKEY = "ADD YOUR API KEY HERE";

    if (searchInput == "") {
        weatherBox.innerHTML = `
        <div>
        <p> Please enter a valid <u>city name</u> </p>
        </div>`;
        weatherBox.style.display = "none"
    }

    async function getLonandLat() {
        const countryCode = 1;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKEY}`;

        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }
        const data = await response.json();
        if (data.length == 0) {
            console.log("Something went wrong here.");
            weatherBox.innerHTML = `
            <div>
                <h2>Invalid Input: "${searchInput}"</h2>
                <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
        }
        else {
            return data[0];
        }
    }

    async function getWeather(lon, lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }
        const data = await response.json();
        weatherBox.style.display = "flex";
        weatherBox.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${(data.main.temp - 273.15).toFixed(2)}</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `;
    }
    document.getElementById("search").value = "";
    const geocodeData = await getLonandLat();
    getWeather(geocodeData.lon, geocodeData.lat);
}

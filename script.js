const input = document.getElementById("Cityinput");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const descriptions = document.getElementById("descriptions");
const weatherIcon = document.getElementById("weather-icon");
const humidityElem = document.getElementById("humidity"); 
const errorMessage = document.getElementById("error-message");

// Replace with your own OpenWeatherMap API key
const API_KEY = "Your own API KEYS";

searchBtn.disabled = true; // Disable button initially

input.addEventListener("input", () => {
  searchBtn.disabled = input.value.trim() === "";
});

searchBtn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) return;

  weatherInfo.style.display = "none";
  errorMessage.textContent = "";
  searchBtn.textContent = "Loading...";
  searchBtn.disabled = true;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityName.textContent = data.name + ", " + data.sys.country;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    descriptions.textContent = `Weather: ${data.weather[0].description}`;
    humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">`;

    weatherInfo.style.display = "block";
  } catch (error) {
    errorMessage.textContent = error.message;
    weatherInfo.style.display = "none";
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = input.value.trim() === "";
  }
});

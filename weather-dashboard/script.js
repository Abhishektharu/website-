// API Configuration
const API_KEY = 'e8b8a8a8c8a8a8a8c8a8a8a8c8a8a8a8'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const suggestionsDiv = document.getElementById('suggestions');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const forecastSection = document.getElementById('forecastSection');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const noResultsDiv = document.getElementById('noResults');

// State
let selectedCity = null;

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});
searchInput.addEventListener('input', handleInputChange);

// Handle search input with debounce
let debounceTimer;
function handleInputChange() {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();

  if (query.length < 2) {
    suggestionsDiv.innerHTML = '';
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchCitySuggestions(query);
  }, 300);
}

// Fetch city suggestions using Geocoding API
async function fetchCitySuggestions(query) {
  try {
    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      suggestionsDiv.innerHTML = '<div class="suggestion-item">No cities found</div>';
      return;
    }

    suggestionsDiv.innerHTML = data
      .map((city) => `
        <div class="suggestion-item" onclick="selectCity('${city.name}', ${city.lat}, ${city.lon}, '${city.country}')"> 
          ${city.name}, ${city.country}
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}

// Select city from suggestions
function selectCity(name, lat, lon, country) {
  selectedCity = { name, lat, lon, country };
  searchInput.value = `${name}, ${country}`;
  suggestionsDiv.innerHTML = '';
  fetchWeatherData(lat, lon);
}

// Handle search
function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  // Fetch coordinates for the city
  fetchCityCoordinates(query);
}

// Fetch city coordinates
async function fetchCityCoordinates(cityName) {
  showLoading();
  try {
    const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      showError('City not found. Please try another search.');
      hideLoading();
      return;
    }

    const { name, lat, lon, country } = data[0];
    selectedCity = { name, lat, lon, country };
    fetchWeatherData(lat, lon);
  } catch (error) {
    showError('Error fetching city data. Please try again.');
    console.error('Error:', error);
    hideLoading();
  }
}

// Fetch weather data
async function fetchWeatherData(lat, lon) {
  try {
    // Fetch current weather and forecast
    const weatherUrl = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (!data.list) {
      showError('Failed to fetch weather data.');
      hideLoading();
      return;
    }

    // Get current weather (first item in forecast list)
    const currentWeather = data.list[0];
    displayCurrentWeather(currentWeather, data.city);

    // Display 5-day forecast (one forecast per day at noon)
    displayForecast(data.list);

    hideLoading();
    hideError();
    hideNoResults();
  } catch (error) {
    showError('Error fetching weather data. Please try again.');
    console.error('Error:', error);
    hideLoading();
  }
}

// Display current weather
function displayCurrentWeather(weather, city) {
  const { temp, feels_like, humidity, pressure, visibility } = weather.main;
  const { speed } = weather.wind;
  const { main, description, icon } = weather.weather[0];
  const date = new Date(weather.dt * 1000);

  document.getElementById('cityName').textContent = `${city.name}, ${city.country}`;
  document.getElementById('date').textContent = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  document.getElementById('temperature').textContent = Math.round(temp);
  document.getElementById('description').textContent = description;
  document.getElementById('feelsLike').textContent = `Feels like ${Math.round(feels_like)}°C`;
  document.getElementById('humidity').textContent = `${humidity}%`;
  document.getElementById('windSpeed').textContent = `${Math.round(speed)} m/s`;
  document.getElementById('pressure').textContent = `${pressure} hPa`;
  document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;

  currentWeatherDiv.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(forecastData) {
  const forecastMap = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  forecastData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    date.setHours(0, 0, 0, 0);
    const dateKey = date.toISOString().split('T')[0];

    // Skip today, get one forecast per day (around noon)
    if (date > today && item.dt % 28800 < 3600) {
      if (!forecastMap[dateKey]) {
        forecastMap[dateKey] = item;
      }
    }
  });

  const forecastHTML = Object.values(forecastMap)
    .slice(0, 5)
    .map((item) => {
      const date = new Date(item.dt * 1000);
      const { temp_max, temp_min } = item.main;
      const { main, icon, description } = item.weather[0];

      return `
        <div class="forecast-item">
          <div class="date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          <div class="icon">${getWeatherIcon(main)}</div>
          <div class="temp">${Math.round(temp_max)}° / ${Math.round(temp_min)}°</div>
          <div class="description">${description}</div>
        </div>
      `;
    })
    .join('');

  forecastDiv.innerHTML = forecastHTML;
  forecastSection.classList.remove('hidden');
}

// Get weather emoji icon
function getWeatherIcon(condition) {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Drizzle: '🌦️',
    Rain: '🌧️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Smoke: '💨',
    Haze: '🌫️',
    Dust: '🌪️',
    Fog: '🌫️',
    Sand: '🌪️',
    Ash: '💨',
    Squall: '💨',
    Tornado: '🌪️',
  };
  return icons[condition] || '🌤️';
}

// Show/Hide utilities
function showLoading() {
  loadingDiv.classList.remove('hidden');
  currentWeatherDiv.classList.add('hidden');
  forecastSection.classList.add('hidden');
  errorDiv.classList.add('hidden');
  noResultsDiv.classList.add('hidden');
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function hideError() {
  errorDiv.classList.add('hidden');
}

function hideNoResults() {
  noResultsDiv.classList.add('hidden');
}

// Initial display
function init() {
  noResultsDiv.classList.remove('hidden');
}

init();
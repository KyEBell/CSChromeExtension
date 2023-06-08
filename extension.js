let container = document.getElementById('weather-app-container');
let dataContainer = document.getElementById('data-container');
// let date = document.getElementById('date');
let content = document.getElementById('content');
let city = document.getElementById('city');
let weatherImg = document.getElementById('weather-img');
let weatherContent = document.getElementById('description');
console.log(weatherContent);
let temp = document.getElementById('temp');

const API_KEY = 'ca9333bcb7c14d6b80ac17b88571e9bb';

// initialize lat and long variables
let lat = 0;
let long = 0;

// Time
let time = document.getElementById('time-container');

setInterval(() => {
  let d = new Date();
  time.innerHTML = d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}, 1000);

// get position of user
function getLatLong() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (_position) => {
        lat = _position.coords.latitude;
        long = _position.coords.longitude;
        fetchWeatherData(lat, long);
      },
      () => {
        alert("The system didn't approve location");
      }
    );
  } else {
    alert("The system didn't approve location");
  }
}

// make request to api and assign data to DOM elements
function fetchWeatherData(lat, lon) {
  fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`
  )
    .then((res) => res.json())
    .then((weatherData) => {
      // extracting data variables from API after formatting into json
      const data = weatherData.data[0];
      const tempC = (Number(data.app_temp) * 9) / 5 + 32;
      const tempF = tempC.toFixed(1);
      console.log(tempF);
      const cityName = `${data.city_name}, ${data.state_code}`;
      //   console.log(cityName);
      // img src url
      const iconSrc = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;

      // ASSIGN DATA TO DOM ELEMENTS
      city.innerText = cityName;
      temp.innerText = tempF + '°F';
      weatherImg.src = iconSrc;
      weatherContent.innerText = data.weather.description;
    });
}

// fetchWeatherData(42.361145, -71.057083);
// run the get location function
getLatLong();

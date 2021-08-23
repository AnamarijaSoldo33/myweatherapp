let now = new Date();
console.log(now.getDay());
let days = ["Sunday", "Monday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log(days[now.getDay()]);

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let currentDate = document.querySelector("#time");
currentDate.innerHTML = `${now.getHours()}:${now.getMinutes()},
${days[now.getDay()]}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let ForecastHTML = ` <div class="row" >`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      ForecastHTML =
        ForecastHTML +
        `<div class="col-2" >
        <div id="days">${formatDay(forecastDay.dt)}</div>
         <img src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" 
         alt="rainy" /> 
         <div id="forecast-temperatures">
         <span id="max temp">${Math.round(forecastDay.temp.max)} °/</span>
         <span id="min temp">${Math.round(forecastDay.temp.min)} °</span>
        </div>
    </div>
`;
    }
  });
  ForecastHTML = ForecastHTML + ` </div>`;
  forecastElement.innerHTML = ForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b5a2d192f3a1859ed576767031687843";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showResults(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiKey = "b5a2d192f3a1859ed576767031687843";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", showResults);

search("New York");

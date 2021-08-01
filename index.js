let now = new Date();
console.log(now.getDay());
let days = ["Sunday", "Monday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log(days[now.getDay()]);

console.log(now.getHours());
console.log(now.getMinutes());

let currentDate = document.querySelector("#time");
currentDate.innerHTML = `${now.getHours()}:${now.getMinutes()},
${days[now.getDay()]}`;

function cityForm(event) {
  event.preventDefault;
  let apiKey = "35f30ee7920e9ed25d2d826417f88240";
  let cityName = document.querySelector("#search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showResults);
}

function showResults(response) {
  let someCity = document.querySelector("#city");
  someCity.innerHTML = response.data.name;
  let tempNow = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#number");
  currentTemp.innerHTML = tempNow;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", cityForm);

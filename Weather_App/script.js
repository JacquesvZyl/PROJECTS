const api = {
  key: "b6ba67cfc386c27233294b33908d06fc",
  baseurl: "http://api.openweathermap.org/data/2.5/",
};
let sky = ["Clear", "Clouds", "Sunny", "Rain"];
const searchbox = document.querySelector(".search-box");

searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);

  function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>*C</span>`;
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;
    let hiLow = document.querySelector(".hi-low");
    hiLow.innerText = `${Math.round(weather.main.temp_min)} *C / ${Math.round(
      weather.main.temp_max
    )} *C`;
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = now.toDateString();
    let bodyBackground = document.querySelector("body");

    for (i = 0; i < sky.length; i++) {
      if (weather_el.innerText == sky[i]) {
        bodyBackground.style.backgroundImage = "url(./img/" + sky[i] + ".jpg)";
      }
    }
  }
}

//DATE FUNCTIONS
let now = new Date();
//TURN DAY AND MONTH ARRAY NUMBERS INTO COMMON NAMES
function formatDate() {
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let currentDay = days[now.getDay()];
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "june",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let currentMonth = months[now.getMonth()];
  let formattedDate = `${currentDay} ${currentMonth} ${now.getDate()}`;
  return formattedDate;
}
//ADD ZERO IF MINUTES LESS THAN 10
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
//DISPLAY CURRENT DATE
let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML =
  formatDate(new Date()) + " " + now.getHours() + ":" + minutes;

//DECLARE VARIABLE NAMES TO DOM ELEMENTS & API PARAMS
let citySearchBar = document.querySelector("#city-search-bar");
let cityHeader = document.querySelector("#city-header");
let citySearchSubmitBtn = document.querySelector("#city-search-submit-btn");
citySearchSubmitBtn.addEventListener("click", changeCityToSearchedCity);
let apiKey = "71af9c2805889d9aa3f3ac839c94ca11";
let units = "imperial";
let lat;
let lon;

//USING FREE OPEN WEATHER API FOR CURRENT WEATHER
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
let currentTempToReplace = document.querySelector("#current-temp");
let currentHumidityToReplace = document.querySelector("#current-humidity");
let currentDescriptionToReplace = document.querySelector(
  "#current-description"
);
let currentIconToReplace = document.querySelector("#icon-div");
let currentWindSpeedToReplace = document.querySelector("#current-wind-speed");

//RETRIEVE LOCATION, SET COORDS, CALL WEATHER API WITH COORDS
function retrieveLocationAndCallApi() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(getWeather);
    });
  } else {
    console.log("geolocation NOT available");
  }
}
retrieveLocationAndCallApi();

//DISPLAY GEOLOCATED CITY
function displayCurrentCity(currentCity) {
  if (currentCity) {
    cityHeader.innerHTML = `${currentCity}`;
  }
}

//GET WEATHER VARS FROM RESPONSE DATA & CALL DISPLAY FUNCS
function getWeather(response) {
  if (response) {
    console.log(response);
    let currentTemp = Math.round(response.data.main.temp);
    let currentCity = response.data.name;
    let currentHumidity = response.data.main.humidity;
    let currentDescription = response.data.weather[0].description;
    let currentWindSpeed = response.data.wind.speed;
    const currentIcon = response.data.weather[0].icon;
    displayCurrentWeather(
      currentTemp,
      currentHumidity,
      currentDescription,
      currentWindSpeed,
      currentIcon
    );
    displayCurrentCity(currentCity);
  } else {
    alert("Something went wrong, sorry.");
  }
}
//DISPLAY TODAY'S WEATHER FOR GEOLOCATED LOCATION
function displayCurrentWeather(
  currentTemp,
  currentHumidity,
  currentDescription,
  currentWindSpeed,
  currentIcon
) {
  console.log(currentIcon);
  if (currentTemp) {
    currentTempToReplace.innerHTML = `${currentTemp}°<sup class="smaller">F</sup>`;
    currentHumidityToReplace.innerHTML = `${currentHumidity}% humidity`;
    currentDescriptionToReplace.innerHTML = `${currentDescription}`;
    currentWindSpeedToReplace.innerHTML = `wind ${currentWindSpeed} mph`;
    currentIconToReplace.innerHTML = `<img src=https://openweathermap.org/img/wn/${currentIcon}@2x.png>`;
    // `<img src="src/icons/${currentIcon}.png">;
  } else {
    console.log("missing data");
  }
}
//FUNCTIONS BASED ON SEARCHED CITY
//CHANGE CITY HEADER TO SEARCHED CITY INSTEAD OF GEOLOCATED ONE
function changeCityToSearchedCity() {
  let currentCity = citySearchBar.value;
  cityHeader.innerHTML = currentCity;
  let syncLocationBtn = document.querySelector("#sync-location-btn");
  syncLocationBtn.addEventListener("click", retrieveLocationAndCallApi);
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${apiKey}`;
  axios
    .get(apiUrl)
    .then(getWeather)
    .catch((error) =>
      alert("That city doesn't exist in our database, try another")
    );
  // .finally(() => retrieveLocationAndCallApi());
}

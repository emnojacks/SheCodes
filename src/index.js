//DATE FUNCS
let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let now = new Date();
//TURN DAY AND MONTH ARRAY NUMBERS INTO COMMON NAMES
function formatDate() {
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
//DISPLAY DAYS
function displayTodaysDate() {
  let todaysDate = document.querySelector("#todays-date");
  todaysDate.innerHTML =
    formatDate(new Date()) + " " + now.getHours() + ":" + minutes;
}

displayTodaysDate();

function displayDays() {
  let tomorrowsDate = document.querySelector("#tomorrowsDate");
  let day3Date = document.querySelector("#day-3-date");
  let day4Date = document.querySelector("#day-4-date");
  let day5Date = document.querySelector("#day-5-date");
  let day6Date = document.querySelector("#day-6-date");
  let day7Date = document.querySelector("#day-7-date");

  switch (new Date().getDay()) {
    case 0:
      tomorrowsDate.innerHTML = "mon";
      day3Date.innerHTML = "tue";
      day4Date.innerHTML = "wed";
      day5Date.innerHTML = "thu";
      day6Date.innerHTML = "fri";
      day7Date.innerHTML = "sat";
      break;
    case 1:
      tomorrowsDate.innerHTML = "tue";
      day3Date.innerHTML = "wed";
      day4Date.innerHTML = "thu";
      day5Date.innerHTML = "fri";
      day6Date.innerHTML = "sat";
      day7Date.innerHTML = "sun";
      break;
    case 2:
      tomorrowsDate.innerHTML = "wed";
      day3Date.innerHTML = "thu";
      day4Date.innerHTML = "fri";
      day5Date.innerHTML = "sat";
      day6Date.innerHTML = "sun";
      day7Date.innerHTML = "mon";
      break;
    case 3:
      tomorrowsDate.innerHTML = "thu";
      day3Date.innerHTML = "fri";
      day4Date.innerHTML = "sat";
      day5Date.innerHTML = "sun";
      day6Date.innerHTML = "mon";
      day7Date.innerHTML = "tue";
      break;
    case 4:
      tomorrowsDate.innerHTML = "fri";
      day3Date.innerHTML = "sat";
      day4Date.innerHTML = "sun";
      day5Date.innerHTML = "mon";
      day6Date.innerHTML = "tue";
      day7Date.innerHTML = "wed";
      break;
    case 5:
      tomorrowsDate.innerHTML = "sat";
      day3Date.innerHTML = "sun";
      day4Date.innerHTML = "mon";
      day5Date.innerHTML = "tue";
      day6Date.innerHTML = "wed";
      day7Date.innerHTML = "thu";
      break;
    case 6:
      tomorrowsDate.innerHTML = "sun";
      day3Date.innerHTML = "mon";
      day4Date.innerHTML = "tue";
      day5Date.innerHTML = "wed";
      day6Date.innerHTML = "thu";
      day7Date.innerHTML = "fri";
  }
}
displayDays();
//VARIABLE INITS & DECLARATIONS
let citySearchBar = document.querySelector("#city-search-bar");
let cityHeader = document.querySelector("#city-header");
let citySearchSubmitBtn = document.querySelector("#city-search-submit-btn");
let switchMetricToggle = document.querySelector("#switch-metric-toggle");
switchMetricToggle.addEventListener("change", toggleMetric);
citySearchSubmitBtn.addEventListener("click", changeCityToSearchedCity);
citySearchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    changeCityToSearchedCity();
  }
});
let syncLocationBtn = document.querySelector("#sync-location-btn");
syncLocationBtn.addEventListener("click", retrieveLocationAndCallApi);
let apiKey = "71af9c2805889d9aa3f3ac839c94ca11";
let units = "imperial";
let lat;
let lon;
let displayUnits = "F";
let windspeedUnits = "mph";
//USING FREE OPEN WEATHER API FOR CURRENT WEATHER
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
let currentTempToReplace = document.querySelector("#current-temp");
let currentHumidityToReplace = document.querySelector("#current-humidity");
let currentDescriptionToReplace = document.querySelector(
  "#current-description"
);
let currentIconToReplace = document.querySelector("#icon-div");
let currentWindSpeedToReplace = document.querySelector("#current-wind-speed");
//CARDS ELEMENT SELECTORS
//tomorrow
let day2CardIcon = document.querySelector(".day-2-card");
let day2CardLow = document.querySelector("#day-2-low");
let day2CardHigh = document.querySelector("#day-2-high");
//next day
let day3CardIcon = document.querySelector(".day-3-card");
let day3CardLow = document.querySelector("#day-3-low");
let day3CardHigh = document.querySelector("#day-3-high");
//day after next
let day4CardIcon = document.querySelector(".day-4-card");
let day4CardLow = document.querySelector("#day-4-low");
let day4CardHigh = document.querySelector("#day-4-high");

let day5CardIcon = document.querySelector(".day-5-card");
let day5CardLow = document.querySelector("#day-5-low");
let day5CardHigh = document.querySelector("#day-5-high");
let day6CardIcon = document.querySelector(".day-6-card");
let day6CardLow = document.querySelector("#day-6-low");
let day6CardHigh = document.querySelector("#day-6-high");
let day7CardIcon = document.querySelector(".day-7-card");
let day7CardLow = document.querySelector("#day-7-low");
let day7CardHigh = document.querySelector("#day-7-high");

//TOGGLE METRIC FUNC
function toggleMetric(response) {
  //change from F to C
  if (switchMetricToggle.value === "imperial") {
    units = "metric";
    displayUnits = "C";
    windspeedUnits = "mps";
    switchMetricToggle.value = "metric";
    console.log("changed to metric");
    console.log(units, switchMetricToggle.value);
    convertToCelsius();
    return units;
  } else {
    //change from C to F
    units = "imperial";
    switchMetricToggle.value = "imperial";
    displayUnits = "F";
    windspeedUnits = "mph";
    console.log("changed to imperial");
    console.log(units, switchMetricToggle.value);
    // convertToFarenheit();
    return units;
  }
}

//FUNC TO RETRIEVE CURRENT LOCATION, SET COORDS TO LOCATION, CALL WEATHER API WITH COORDS
function retrieveLocationAndCallApi() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      units = switchMetricToggle.value;
      console.log(switchMetricToggle.value);
      console.log(lat, lon);
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(getWeather);
    });
  } else {
    alert("geolocation not available - check browswer permissions");
  }
}
//CALL GEOLOCATION AND WEATHER ON PAGE LOAD
retrieveLocationAndCallApi();

//FUNC IF RES, SET RES DATA TO WEATHER VARS & CALL OTHER FUNCTIONS
function getWeather(response) {
  if (response) {
    console.log(response);
    console.log(units);
    let currentTemp = Math.round(response.data.main.temp);
    let currentCity = response.data.name;
    let currentHumidity = response.data.main.humidity;
    let currentDescription = response.data.weather[0].description;
    let currentWindSpeed = response.data.wind.speed;
    let currentIcon = response.data.weather[0].icon;
    cityHeader.innerHTML = currentCity;
    //CALL NEWLY SET VARS TO BE DISPLAYED
    displayCurrentWeather(
      currentTemp,
      currentHumidity,
      currentDescription,
      currentWindSpeed,
      currentIcon
    );
    callForecast(response.data.coord, units);
    //REDUNDANT
    // displayCurrentCity(currentCity);
    return response;
  } else {
    alert("Something went wrong, sorry.");
  }
}

//DISPLAY GEOLOCATED CITY
function displayCurrentCity(currentCity) {
  if (currentCity) {
    cityHeader.innerHTML = `${currentCity}`;
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
  if (currentTemp) {
    currentTempToReplace.innerHTML = `${currentTemp}°<sup class="smaller">${displayUnits}</sup>`;
    currentHumidityToReplace.innerHTML = `${currentHumidity}% humidity`;
    currentDescriptionToReplace.innerHTML = `${currentDescription}`;
    currentWindSpeedToReplace.innerHTML = `wind ${currentWindSpeed} ${windspeedUnits}`;
    currentIconToReplace.innerHTML = `<img src=https://openweathermap.org/img/wn/${currentIcon}@2x.png>`;
    //if you want to store icons on your computer use method below//
    // `<img src="src/icons/${currentIcon}.png">;
  } else {
    console.log("Cannot find weather data");
  }
}

//FUNC TO CALL FORECAST API WITH LAT & LON OF CITY ON DISPLAY
function callForecast(coords, units) {
  console.log(coords, units);
  lat = coords.lat;
  lon = coords.lon;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(forecastApiUrl);
  //intake lat and lon - from response data
  //intake apikey - global
  axios
    .get(forecastApiUrl)
    .then(displayForecast)
    .catch((error) => alert(`${error.message}: Forecast unavailable.`));
}

//FUNC DISPLAY NEW FORECAST DATA CALLED BY FORECAST API
function displayForecast(res) {
  let fiveDayForecast = res.data;
  console.log(fiveDayForecast);
  console.log(fiveDayForecast.list);
  day2CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[0].weather[0].icon}@2x.png>`;
  day2CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[0].main.temp_min) + "°";
  day2CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[0].main.temp_max) + "°";
  //end day 2 - start day 3
  day3CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[8].weather[0].icon}@2x.png>`;
  day3CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[39].main.temp_min) + "°";
  day3CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[8].main.temp_max) + "°";
  //end day 3 - start day 4
  day4CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[12].weather[0].icon}@2x.png>`;
  day4CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[12].main.temp_min) + "°";
  day4CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[12].main.temp_max) + "°";
  //end day 4 - start day 5
  day5CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[15].weather[0].icon}@2x.png>`;
  day5CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[15].main.temp_min) + "°";
  day5CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[15].main.temp_max) + "°";
  //end day 5 - start day 6
  day6CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[23].weather[0].icon}@2x.png>`;
  day6CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[23].main.temp_min) + "°";
  day6CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[23].main.temp_max) + "°";
  //end day 6 - start day 7
  day7CardIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${fiveDayForecast.list[31].weather[0].icon}@2x.png>`;
  day7CardLow.innerHTML =
    Math.floor(fiveDayForecast.list[31].main.temp_min) + "°";
  day7CardHigh.innerHTML =
    Math.ceil(fiveDayForecast.list[31].main.temp_max) + "°";
}

//FUNC CHANGE LOCATION TO SEARCH VALUE AND CALL API FOR SEARCHED CITY
function changeCityToSearchedCity() {
  if (citySearchBar.value) {
    let currentCity = citySearchBar.value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${units}&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then(getWeather)
      .catch((error) => alert(`${error.message}: No such city.`));
  } else {
    alert("You didn't enter a city");
  }
}

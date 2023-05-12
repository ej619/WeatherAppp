var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();

  if (city) {
    getForecast(city);

    weatherContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getForecast = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=334c9cf8dddd1102356e9a0fff7d603c';
  console.log(apiUrl);
  
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data, city);
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

var displayForecast = function (forecast, city) {
  console.log('Displaying forecast')
  if (forecast.length === 0) {
    weatherContainerEl.textContent = 'No weather found';
    return;
  }

  weatherSearchTerm.textContent = city;

  for (var i = 0; i < forecast.list.length; i+=8) {
    var day = forecast.list[i].dt_txt;
    var temp = forecast.list[i].main.temp;
    var humidity = forecast.list[i].main.humidity;
    var wind =  forecast.list[i].wind.speed;
    var iconCode = forecast.list[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png'; 
    console.log('day: '+ day, ' temp: '+ temp + ' humidity: ' + humidity + ' wind: ' + wind);
    var forecastEl = document.createElement('div');
    forecastEl.classList = 'list-item flex-row justify-space-between align-center';
    var iconEl = document.createElement('img');
    iconEl.setAttribute('src', iconUrl);
    var titleEl = document.createElement('span');
    forecastEl.appendChild(titleEl);
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    titleEl.textContent = day + ': ' + temp + ' F, ' + humidity + '% humidity, ' + wind + ' mph wind';
    statusEl.appendChild(iconEl);
    forecastEl.appendChild(statusEl);
    weatherContainerEl.appendChild(forecastEl);
    localStorage.setItem(city, city);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);


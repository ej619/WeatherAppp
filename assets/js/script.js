var userFormEl = document.querySelector('#user-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
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

/*var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};*/

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

/*var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};*/

var displayForecast = function (forecast, city) {
  console.log('Displaying forecast')
  if (forecast.length === 0) {
    weatherContainerEl.textContent = 'No weather found';
    return;
  }

  weatherSearchTerm.textContent = city;

  for (var i = 0; i < forecast.list.length; i+=8) {
    //var repoName = repos[i].owner.login + '/' + repos[i].name;
    //console.log(forecast)
    var day = forecast.list[i].dt_txt;
    var temp = forecast.list[i].main.temp;
    var humidity = forecast.list[i].main.humidity;
    var wind =  forecast.list[i].wind.speed;


    console.log('day: '+ day, ' temp: '+ temp + ' humidity: ' + humidity + ' wind: ' + wind);

    var forecastEl = document.createElement('div');
    forecastEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = city;
    //console.log(titleEl);

    forecast.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    /*if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }*/

    forecast.appendChild(statusEl);

    weatherContainerEl.appendChild(forecastEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
//languageButtonsEl.addEventListener('click', buttonClickHandler);

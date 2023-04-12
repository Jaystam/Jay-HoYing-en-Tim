const showtime = document.getElementById("js--time")
const showdate = document.getElementById("js--date")

function displayDateTime() {
  let now = new Date();
  let date = now.toDateString();
  let time = now.toLocaleTimeString();
  showtime.innerText = time;
  showdate.innerText = date;
}

setInterval(displayDateTime, 1000);

const apiKey = '1805e8316e7b99431bf85b780e0f2203';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    
    temperatureElement.innerText = data.main.temp;
    conditionsElement.innerText = data.weather[0].description;
});


const api_key = '7f581fc794012855ba54015c5674c225';

    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=Amsterdam&appid=${api_key}`;

    fetch(url2)
      .then(response => response.json())
      .then(data => {
        const forecasts = data.list.filter((forecast) => forecast.dt_txt.includes('12:00:00')).slice(0, 5);
        
        const list = document.getElementById('forecasts');
        forecasts.forEach((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          const temperature = forecast.main.temp - 273.15;
          const description = forecast.weather[0].description;
          const item = document.createElement('p');
          item.textContent = `${dayOfWeek}: ${temperature.toFixed(1)}°C, ${description}`;
          list.appendChild(item);
        });
      })
      .catch(error => console.error(error));

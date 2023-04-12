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

      const labels = [
        "01-04-2023",
        "02-04-2023",
        "03-04-2023",
        "04-04-2023",
        "05-04-2023",
        "06-04-2023",
        "07-04-2023",
        "08-04-2023",
        "09-04-2023",
        "10-04-2023",
        "11-04-2023",
        "12-04-2023",
        "13-04-2023",
        "14-04-2023",
        "15-04-2023",
        "16-04-2023",
        "17-04-2023",
        "18-04-2023",
        "19-04-2023",
        "20-04-2023",
        "21-04-2023",
        "22-04-2023",
        "23-04-2023",
        "24-04-2023",
        "25-04-2023",
        "26-04-2023",
        "27-04-2023",
        "28-04-2023",
        "29-04-2023",
        "30-04-2023",
    
    
    
    ]
    const data = {
      labels: labels,
      datasets: [{
        label: 'Stroom in kWh',
        data: [6.3334142, 6.392036, 6.380746, 6.133371, 5.818582, 5.873735, 5.631163, 5.498144, 5.414361, 5.351441, 5.420009, 5.141927, 5.34589, 5.302337, 5.057221, 4.857039, 4.869557, 4.99932, 4.96336, 5.069436, 5.067842, 4.960862, 4.842583, 4.53697, 4.37509, 4.559344, 4.499776, 4.554968, 4.192899, 3.69226, 3.47473],
        backgroundColor: [
          '#5F967C',
          '#5888970',
          '#507963',
          '#C0DFD3',
          '#9CCBB8',
          '#6AA68B',
        ],
        borderColor: [
          '#5F967C',
          '#5888970',
          '#507963',
          '#C0DFD3',
          '#9CCBB8',
          '#6AA68B',
        ],
        borderWidth: 1
      }]
    };
    
    const config = {
        type: 'bar',
        data: data
    }
    
    const chart = new Chart(document.getElementById("js--chart--1"), config)
    const labels2 = [
        "01-04-2023",
        "02-04-2023",
        "03-04-2023",
        "04-04-2023",
        "05-04-2023",
        "06-04-2023",
        "07-04-2023",
        "08-04-2023",
        "09-04-2023",
        "10-04-2023",
        "11-04-2023",
        "12-04-2023",
        "13-04-2023",
        "14-04-2023",
        "15-04-2023",
        "16-04-2023",
        "17-04-2023",
        "18-04-2023",
        "19-04-2023",
        "20-04-2023",
        "21-04-2023",
        "22-04-2023",
        "23-04-2023",
        "24-04-2023",
        "25-04-2023",
        "26-04-2023",
        "27-04-2023",
        "28-04-2023",
        "29-04-2023",
        "30-04-2023",

    
    
    
    ]
    const data2 = {
      labels: labels,
      datasets: [{
        label: 'Gas in m3',
        data: [8.708265, 9.024655 ,9.018188, 9.7324, 10.16105, 9.085961, 8.573009, 8.853497, 8.859065, 8.870694, 9.608599, 9.751627, 8.779924, 8.480499, 8.699217, 8.663344, 8.598471, 9.250565, 9.211821, 8.555725, 8.33257, 8.130034, 8.214511, 8.031173, 8.647481, 8.287736, 7.73401, 7.08122, 7.418751, 7.404657, 7.592983],
        backgroundColor: [
          '#5F967C',
          '#5888970',
          '#507963',
          '#C0DFD3',
          '#9CCBB8',
          '#6AA68B',
        ],
        borderColor: [
          '#5F967C',
          '#5888970',
          '#507963',
          '#C0DFD3',
          '#9CCBB8',
          '#6AA68B',
        ],
        borderWidth: 1
      }]
    };
    
    const config2 = {
        type: 'bar',
        data: data2
    }
    
    const chart2 = new Chart(document.getElementById("js--chart--2"), config2)

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

const url = 'https://api.weatherapi.com/v1/forecast.json?key=45680b65ce154fdbb0995703232803&q=Amsterdam&days=7';

const daysOfWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

const conditionEmojiMap = {
  'Sunny': '☀',
  'Clear': '☀',
  'Partly cloudy': '🌤',
  'Cloudy': '☁',
  'Overcast': '☁',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Light rain': '🌧',
  'Moderate rain': '🌧',
  'Heavy rain': '🌧',
  'Patchy rain possible': '🌦',
  'Patchy snow possible': '❄',
  'Patchy sleet possible': '🌧',
  'Patchy freezing drizzle possible': '❄',
  'Thundery outbreaks possible': '🌪',
};

fetch(url)
  .then(response => response.json())
  .then(data => {
    const forecast = data.forecast.forecastday;
    forecast.forEach((day, index) =>  {
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const condition = day.day.condition.text;
      const tempC = day.day.avgtemp_c;
      const emoji = conditionEmojiMap[condition] || '❓';
      const elementId = `weather${index + 1}`;
      const element = document.getElementById(elementId);

      if (element) {
        element.textContent = `${dayOfWeek} ${emoji} ${tempC}°C`;
      }
    });
  });
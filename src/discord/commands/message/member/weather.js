import fetch from 'node-fetch';
import { log } from '../../../utils/logger.js';

const API_KEY = 'your-openweather-api-key';

export default {
  name: 'weather',
  description: 'Get the current weather for a city',
  run: async ({ client, message, args }) => {
    const city = args.join(' ');
    if (!city) return message.reply('Please provide a city name.');

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (data.cod !== 200) {
        return message.reply('City not found or error occurred.');
      }

      const weatherInfo = `It's currently ${data.main.temp}°C with ${data.weather[0].description} in ${data.name}.`;
      message.channel.send(weatherInfo);
    } catch (error) {
      log(error.message, 'error');
      message.channel.send('Error fetching weather data.');
    }
  }
};

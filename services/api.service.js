import axios from 'axios'
import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

const getWeather = async () => {
  // const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API key}`
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
  const lat = await getKeyValue(TOKEN_DICTIONARY.latitude)
  const lon = await getKeyValue(TOKEN_DICTIONARY.longitude)

  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команда -t [API_KEY]')
  }

  if (!lat || !lon) {
    throw new Error('Не заданы координаты, задайте его через команды -lat [LATITUDE] и -log [LONGITUDE] для установки города')
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  })

  return data

  /* const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.searchParams.append('lat', lat)
  url.searchParams.append('lon', lon)
  url.searchParams.append('appid', token)
  url.searchParams.append('lang', 'ru')
  url.searchParams.append('units', 'metric')

  https.get(url, (response) => {
    let res = ''

    response.on('data', (chunk) => {
      res += chunk
    })

    response.on('end', () => {
      console.log(res)
    })
  }) */
}

export { getWeather, getIcon }
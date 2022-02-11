#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather, getIcon } from './services/api.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранён')
  } catch (e) {
    printError(e.message)
  }
}

const saveLatAndLon = async (lat, lon) => {
  lat = Number(lat)
  lon = Number(lon)

  if (isNaN(lat) || isNaN(lon)) {
    printError('Не правильно переданы координаты города')
    return
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.latitude, lat)
    await saveKeyValue(TOKEN_DICTIONARY.longitude, lon)
    printSuccess('Координаты сохранены')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather()
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Неверно указаны координаты города')
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    return printHelp()
  }
  if (args.lat || args.lon) {
    return saveLatAndLon(args.lat, args.lon)
  }
  if (args.t) {
    return saveToken(args.t)
  }

  return getForecast()
}

initCLI()
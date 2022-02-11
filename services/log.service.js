import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
  console.log(chalk.bgRed(' ERR0R ') + ' ' + error)
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
    -lat [LATITUDE] для установки города
    -log [LONGITUDE] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  )
}

const printWeather = (result, icon) => {
  console.log(
    dedent`${chalk.bgBlue(' WEATHER ')} Погода в городе ${result.name}
    ${icon}  ${result.weather[0].description}
    Температура: ${result.main.temp} (ощущается как ${result.main.feels_like})
    Влажность: ${result.main.humidity}%
    Скорость ветра: ${result.wind.speed}
		`
  )
}

export { printError, printSuccess, printHelp, printWeather }
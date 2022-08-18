function attachEvents() {
    let inputElement = document.getElementById('location')
    let getButton = document.getElementById('submit')
    let divDisplay = document.getElementById('forecast')
    let currentDiv = document.getElementById('current')
    let upcomingDiv = document.getElementById('upcoming')
    let baseUrl = 'http://localhost:3030/jsonstore/forecaster'
    let sunny = '&#x2600'
    let partlySunny = '&#x26C5'
    let Overcast = '&#x2601'
    let Rain = '&#x2614'
    let Degrees = '&#176'
    let code = ''
    let divElementUpcoming = document.createElement('div')
    let divElementCurrent = document.createElement('div')

    getButton.addEventListener('click', (e) => {
        divElementUpcoming.innerHTML = ''
        divElementCurrent.innerHTML = ''

        divElementUpcoming.setAttribute('class', 'forecast=info')
        divElementCurrent.setAttribute('class', 'forecasts')

        divDisplay.style.display = 'inline'

        fetch(`${baseUrl}/locations`)
            .then(response => response.json())
            .then(data => {
                data.forEach(locationInfoObject => {
                    if (locationInfoObject.name == inputElement.value) {
                        return code = locationInfoObject.code
                    }
                });

                fetch(`${baseUrl}/today/${code}`)
                    .then(response => response.json())
                    .then(data => {
                        let spanGroup = document.createElement('span')
                        let conditionSpan = document.createElement('span')
                        let temperatureSpan = document.createElement('span')
                        let locationSpan = document.createElement('span')
                        let spanwithIcon = document.createElement('span')

                        spanwithIcon.setAttribute('class', 'condition symbol')
                        spanGroup.setAttribute('class', 'condition')
                        locationSpan.setAttribute('class', 'forecast-data')
                        temperatureSpan.setAttribute('class', 'forecast-data')
                        conditionSpan.setAttribute('class', 'forecast-data')

                        locationSpan.textContent = data.name
                        temperatureSpan.innerHTML = `${data.forecast.low}${Degrees}/${data.forecast.high}${Degrees}`
                        conditionSpan.textContent = data.forecast.condition
                        let condition = data.forecast.condition
                        if (condition == 'Sunny') {
                            spanwithIcon.innerHTML = sunny
                        } else if (condition == 'Partly sunny') {
                            spanwithIcon.innerHTML = partlySunny
                        } else if (condition == 'Overcast') {
                            spanwithIcon.innerHTML = Overcast
                        } else if (condition == 'Rain') {
                            spanwithIcon.innerHTML = Rain
                        }
                        spanGroup.appendChild(locationSpan)
                        spanGroup.appendChild(temperatureSpan)
                        spanGroup.appendChild(conditionSpan)
                        divElementCurrent.appendChild(spanwithIcon)
                        divElementCurrent.appendChild(spanGroup)

                        currentDiv.appendChild(divElementCurrent)
                    })
                    .catch(error => console.log(error))
                fetch(`${baseUrl}/upcoming/${code}`)
                    .then(response => response.json())
                    .then(data => {
                        let nextDays = data.forecast
                        nextDays.forEach(x => {
                            let spanGroup = document.createElement('span')
                            let conditionSpan = document.createElement('span')
                            let temperatureSpan = document.createElement('span')
                            let locationSpan = document.createElement('span')
                            let spanwithIcon = document.createElement('span')

                            spanwithIcon.setAttribute('class', 'symbol')
                            spanGroup.setAttribute('class', 'upcoming')
                            temperatureSpan.setAttribute('class', 'forecast-data')
                            conditionSpan.setAttribute('class', 'forecast-data')

                            temperatureSpan.innerHTML = `${x.low}${Degrees}/${x.high}${Degrees}`
                            conditionSpan.textContent = x.condition
                            let condition = x.condition
                            if (condition == 'Sunny') {
                                spanwithIcon.innerHTML = sunny
                            } else if (condition == 'Partly sunny') {
                                spanwithIcon.innerHTML = partlySunny
                            } else if (condition == 'Overcast') {
                                spanwithIcon.innerHTML = Overcast
                            } else if (condition == 'Rain') {
                                spanwithIcon.innerHTML = Rain
                            }
                            spanGroup.appendChild(spanwithIcon)
                            spanGroup.appendChild(temperatureSpan)
                            spanGroup.appendChild(conditionSpan)
                            divElementUpcoming.appendChild(spanGroup)
                            upcomingDiv.appendChild(divElementUpcoming)
                        })
                    })
            })
    })
}

attachEvents();

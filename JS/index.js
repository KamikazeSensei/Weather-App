// Api Key
const key = '8f863bc8d20049f5857165410240501';
// url = 'http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London';

var searchBar = document.getElementById('search-bar')

// Function to get the data

async function getdata(cityName) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=3`);
    var finalresponse = await response.json();
    console.log(finalresponse);
    finalData = finalresponse

   await DisplayData(finalresponse)

}

// Function to display data in HTML

async function DisplayData(data) {

    // today data

    document.getElementById('date').innerHTML = data.forecast.forecastday[0].date
    document.getElementById('city-name').innerHTML = data.location.name
    document.getElementById('today-temp-img').src = data.current.condition.icon
    document.getElementById('today-state').innerHTML = data.current.condition.text
    document.getElementById('temp').innerHTML = data.current.temp_c + `° c`
    document.getElementById('today-rain').innerHTML = `<img src="IMGs/icon-umberella.png" alt="umbrella"> ${data.forecast.forecastday[0].day.daily_chance_of_rain} %`
    document.getElementById('today-wind-speed').innerHTML = `<img src="IMGs/icon-wind.png" alt="wind" > ${data.current.wind_kph} km/h`
    document.getElementById('today-wind-dir').innerHTML = `<img src="IMGs/icon-compass.png" alt="direction"> ${data.current.wind_dir}`

    // tomorrow data

    document.getElementById('tomorrow-temp-img').src = data.forecast.forecastday[1].day.condition.icon
    document.getElementById('tomorrow-temp').innerHTML = data.forecast.forecastday[1].day.maxtemp_c + `° c`
    document.getElementById('tomorrow-temp-lower').innerHTML = data.forecast.forecastday[1].day.mintemp_c + `° c`
    document.getElementById('tomorrow-state').innerHTML = data.forecast.forecastday[1].day.condition.text

    // after tomorrow data

    document.getElementById('after-tomorrow-temp-img').src = data.forecast.forecastday[2].day.condition.icon
    document.getElementById('after-tomorrow-temp').innerHTML = data.forecast.forecastday[2].day.maxtemp_c + `° c`
    document.getElementById('after-tomorrow-temp-lower').innerHTML = data.forecast.forecastday[2].day.mintemp_c + `° c`
    document.getElementById('after-tomorrow-state').innerHTML = data.forecast.forecastday[2].day.condition.text

}

// Display cairo's weather by default because i don't know how to use geolocation API

getdata('Cairo');

// Simple on input search event listener

searchBar.addEventListener('keyup', function () {
    var name = searchBar.value
    getdata(name)
})


// Displaying day of the week

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let today = weekday[d.getDay()];
let tomorrow = weekday[(d.getDay()+1)%7];
let afterTomorrow = weekday[(d.getDay()+2)%7];


document.getElementById('day').innerText=`${today}`
document.getElementById('tomorrow-day').innerText=`${tomorrow}`
document.getElementById('after-tomorrow-day').innerText=`${afterTomorrow}`
import CurrentLocation from "./CurrentLocation.js"
import {updateDom} from "./domFunctions.js"

const API_KEY = "569f86fdc5d70593a37ccf6e07ef364d";
const location = new CurrentLocation()

const initApp = () => {
    getDeviceLocation()

    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
       await search()
    })

}

const search = async () => {
    const searchBar = document.querySelector(".searchBar")

    try {
        const searchLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&appid=${API_KEY}`)

        const data = await searchLocation.json()

        await location.setCurrentWeather(data[0].lat, data[0].lon)
        updateDom(location.currentWeather)
    } catch (err) {
        console.log(err);    
    }
    
}

const getDeviceLocation = () => {
    // check is the browser supports geolocation
    if(!navigator.geolocation){
        alert("Your browser does not support geolocation")
        return 
    }

    // get the current device position
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

const geoSuccess = async (locationData) => {
    const {coords: {latitude, longitude}} = locationData;
    await location.setCurrentWeather(latitude, longitude)

    updateDom(location.currentWeather)
}

const geoError = (err) => {
    console.log(err);
}

initApp()
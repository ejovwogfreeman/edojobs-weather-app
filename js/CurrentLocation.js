const API_KEY = "569f86fdc5d70593a37ccf6e07ef364d";

class CurrentLocation {
    // create an object to store the location data
    location = {
        state: "",
        country: "",
    }

    // create an object to store the current weather data
    currentWeather = {
        temp: {
            high: null,
            avg: null,
            low: null,
        },
        icon: "",
        desc: "",
        wind: null,
        rain: null,
        sunrise: null,
        sunset: null,
    }

    // create an object to store the hourly weather data
    hourlyWeather = {
        time: "",
        temp: null,
    }

    // create a method to fetch and set the weather data
    setCurrentWeather = async (lat, lon) => {
        try{
            // fetch the weather data
            const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)

            // destructure the properties we need
            const {main, weather, rain, sys, wind} = await weatherData.json()

            // set the current weather data fields
            this.currentWeather = {
                temp:{
                    high: main.temp_max,
                    low: main.temp_min,
                    avg: main.temp
                },
                icon: weather[0].icon,
                desc: weather[0].description,
                wind: wind.speed,
                rain: rain ? rain["1h"] : 0,
                sunrise: sys.sunrise,
                sunset: sys.sunset,
            }

        }catch(err){
            // if there is an error log it to the console
            console.log(err);
        }  
    }
}

export default CurrentLocation
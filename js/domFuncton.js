export const updateDom = (currentWeathObj, hourlyWeatherObj) => {
    populateMainSection(currentWeathObj)
}

const populateMainSection = (currentWeathObj) => {
    // destructure the current weather object
    const {temp, icon, desc, wind, rain, sunrise, sunset} = currentWeathObj

    // grab the main section
    const mainSection = document.querySelector(".main");

    // grab the necessary elements in the main section
    const avgTemp = mainSection.querySelector(".temp");
    const description = mainSection.querySelector(".desc");
    const highTemp = mainSection.querySelector(".high-temp");
    const lowTemp = mainSection.querySelector(".low-temp");
    const windEl = mainSection.querySelector(".wind");
    const rainEl = mainSection.querySelector(".rain");
    const sunriseEl = mainSection.querySelector(".sunrise")
    const sunsetEl = mainSection.querySelector(".sunset")
    
    // set the text content for the necessary elements
    avgTemp.textContent = temp.avg + "°";
    description.textContent = desc;
    highTemp.textContent = temp.high + "°";
    lowTemp.textContent = temp.low + "°";
    windEl.textContent = wind + "mph";
    rainEl.textContent = rain + "%";
    sunriseEl.textContent = convertToTime(sunrise);
    sunsetEl.textContent = convertToTime(sunset) 
}

const convertToTime = (timeStamp) => {
    const date = new Date(timeStamp)
    const time = `${date.getHours()} : ${date.getMinutes()}`
    return time
}
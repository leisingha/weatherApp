import "./style.css";

let data, temp, feelslike, weatherIcon, weatherDesc;

let iconElement = document.querySelector("img.weatherIcon");
let tempElement = document.querySelector(".tempVal");
let grayTextElement = document.querySelector(".text-gray");
let weatherDescElement = document.querySelector(".info-right");
let locationElement = document.querySelector(".location");

const searchBox = document.querySelector("input");
searchBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getWeatherData(e.target.value);
  }
});

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fa016dd8972641d5b3d33653253112&q=${location}&aqi=yes`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    data = await response.json();
    temp = data.current.temp_c;
    feelslike = data.current.feelslike_c;
    weatherIcon = data.current.condition.icon.replace(/64x64/g, "128x128");
    weatherDesc = data.current.condition.text;
    console.log(temp, feelslike, weatherDesc, weatherIcon);

    iconElement.src = weatherIcon;
    tempElement.textContent = temp + "°";
    grayTextElement.textContent = "feels like " + feelslike + "°";
    weatherDescElement.textContent = weatherDesc;
    locationElement.textContent =
      data.location.name + ", " + data.location.country;
  } catch (error) {
    console.error(error);
  }
}

getWeatherData("Toronto");

import "./style.css";

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=fa016dd8972641d5b3d33653253112&q=${location}&aqi=yes`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const temp = data.current.temp_c;
    const feelslike = data.current.feelslike_c;
    const weatherIcon = data.current.condition.icon;
    const weatherDesc = data.current.condition.text;
    console.log(temp, feelslike, weatherDesc);
  } catch (error) {
    console.error(error);
  }
}

getWeatherData("Toronto");

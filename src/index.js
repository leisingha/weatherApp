import "./style.css";

let data, temp, feelslike, weatherIcon, weatherDesc;

let iconElement = document.querySelector("img.weatherIcon");
let tempElement = document.querySelector(".tempVal");
let grayTextElement = document.querySelector(".text-gray");
let weatherDescElement = document.querySelector(".info-right");
let locationElement = document.querySelector(".location");

let alertEvent = document.querySelector(".alert-event");
let alertBadge = document.querySelector(".severity-badge");
let alertHeadline = document.querySelector(".alert-headline");
let alertDesc = document.querySelector(".alert-desc");
let alertInstrruction = document.querySelector(".instruction-content");
let alertCard = document.querySelector(".alert-card");

let loaderElement = document.querySelector(".loader");

const searchBox = document.querySelector("input");
searchBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    fetchAll(e.target.value);
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

async function getAlertData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/alerts.json?key=fa016dd8972641d5b3d33653253112&q=${location}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    data = await response.json();
    // Check if there are any alerts
    if (!data.alerts || !data.alerts.alert || data.alerts.alert.length === 0) {
      alertCard.style.display = "none";
      return;
    } else {
      alertCard.style.display = ""; // Show if there are alerts
    }
    const mostRecent = data.alerts.alert
      .filter(
        (a) => new Date(a.expires) > new Date() && a.desc?.trim().length > 10
      )
      .sort((a, b) => new Date(b.effective) - new Date(a.effective))[0];

    console.log(data);
    alertEvent.textContent =
      mostRecent.event.charAt(0).toUpperCase() + mostRecent.event.slice(1);
    alertBadge.textContent = mostRecent.severity;
    alertHeadline.textContent = mostRecent.headline;
    alertDesc.textContent = mostRecent.desc;
    alertInstrruction.textContent = mostRecent.instruction;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAll(location) {
  loaderElement.style.display = "block";
  try {
    Promise.all([getWeatherData(location), getAlertData(location)]);
  } catch (error) {
    console.error(error);
  } finally {
    loaderElement.style.display = "none";
  }
}

fetchAll("Toronto");

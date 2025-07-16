import "./styles.css";

const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const key = process.env.WEATHER_API_KEY;

const errorLabel = document.querySelector(".error");

const getData = (location) => {
  return fetch(`${URL}${location}?key=${key}&unitGroup=metric`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 400) {
        const syntaxError =
          "No such country exists. Please enter a valid location";
        errorLabel.textContent = syntaxError;
        throw new Error(syntaxError);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const locationInput = document.querySelector("#location");
const form = document.querySelector("form");
const address = document.querySelector(".address");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const loading = document.querySelector(".loading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.textContent = "Loading...";
  getData(locationInput.value)
    .then((data) => {
      console.log(data);
      loading.textContent = "";
      address.textContent = data.resolvedAddress;
      temp.textContent = "Current Temp: " + data.currentConditions.temp;
      description.textContent = data.description;
    })
    .catch((e) => {
      console.error(e);
    });
});

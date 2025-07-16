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
        throw new Error(
          "No such country exists. Please enter a valid location"
        );
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const countryInput = document.querySelector("#country");
const form = document.querySelector("form");
const address = document.querySelector(".address");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(countryInput.value)
    .then((data) => {
      console.log(data);
      address.textContent = data.resolvedAddress;
      description.textContent = data.description;
      temp.textContent = "Current Temp: " + data.currentConditions.temp;
    })
    .catch((e) => {
      errorLabel.textContent = e;
    });
});

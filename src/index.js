import "./styles.css";

const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

var location = "melbourne";
const key = process.env.WEATHER_API_KEY;

const getData = () => {
  return fetch(`${URL}${location}?key=${key}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
};

getData().then((data) => console.log(data));

const melb = await getData();
console.log(melb);
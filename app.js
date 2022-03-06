const weatherIcons = {
  Rain: "wi wi-day-rain",
  Clouds: "wi wi-day-cloudy",
  Clear: "wi wi-day-sunny",
  Snow: "wi wi-day-snow",
  mist: "wi wi-day-fog",
  Drizzle: "wi wi-day-sleet",
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

async function main(withIp = true) {
    let ville

    if(withIp){
        const ip = await fetch("https://api.ipify.org?format=json")
          .then((resultat) => resultat.json())
          .then((json) => json.ip);
      
         ville = await fetch(
          "http://api.ipstack.com/" +
            ip +
            "?access_key=15abd6e7a7a11f97133c212e2f020462"
        )
          .then((resultat) => resultat.json())
          .then((json) => json.city);

    } else {
        ville = document.querySelector('#ville').textContent;
    }

  const meteo = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=39027a533c9551bfe910a5f94d37bb0d&lang=fr&units=metric`
  )
    .then((res) => res.json())
    .then((json) => json);

  //   displayWeatherInfo(meteo)
  console.log(meteo);

  displayWeatherInfo(meteo);
}

function displayWeatherInfo(data) {
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;

  document.querySelector("#ville").textContent = name;
  document.querySelector("#temperature").textContent = Math.round(temperature);
  document.querySelector("#conditions").textContent = capitalize(description);

  document.querySelector("i.wi").className = weatherIcons[conditions];
  document.querySelector(".content").classList.add(conditions.toLowerCase());
}

const ville = document.querySelector("#ville");
ville.addEventListener("click", () => {
  ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();

document.querySelector(".busca").addEventListener("submit", (e) => {
    e.preventDefault();

    let input = document.querySelector("#searchInput").value;
    
    let json = takeInfos(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e19a41ce44154872f28c7deac0af1f12&units=metric&lang=pt_br`);
    json.then((response) => {
        if (input !== '') {
            if(response.cod === 200) {
                showInformations({
                    name: response.name,
                    country: response.sys.country,
                    temp: response.main.temp,
                    temp_icon: response.weather[0].icon,
                    wind_speed: response.wind.speed,
                    wind_angle: response.wind.deg
                })
            }
            else {
                document.querySelector(".resultado").style.display = "none";
                showWarning("Não encontramos essa localização.")
            }
        }
        else {
            document.querySelector(".resultado").style.display = "none";
        }
    })
})

const takeInfos = (url) => fetch(url).then(response => response.json());

const showInformations = (json) => {
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.wind_speed} <span>km/h</span>`;
    document.querySelector(".temp img").src = `http://openweathermap.org/img/wn/${json.temp_icon}@2x.png`;
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.wind_angle-90}deg)`;
    document.querySelector(".resultado").style.display = "block";
}

const showWarning = (msg) => {
    document.querySelector(".aviso").innerHTML = msg;
}

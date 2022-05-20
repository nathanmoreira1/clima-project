document.querySelector(".busca").addEventListener("submit", async (e)=>{
    e.preventDefault();

    let input = document.querySelector("#searchInput").value;
    
    if (input !== '') {
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e19a41ce44154872f28c7deac0af1f12&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInformations({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temp_icon: json.weather[0].icon,
                wind_speed: json.wind.speed,
                wind_angle: json.wind.deg
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

});

showWarning = (msg) => {
    document.querySelector(".aviso").innerHTML = msg
}

showInformations = (json) => {
    showWarning('');
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.wind_speed} <span>km/h</span>`;
    document.querySelector(".temp img").src = `http://openweathermap.org/img/wn/${json.temp_icon}@2x.png`;
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.wind_angle-90}deg)`;
    document.querySelector(".resultado").style.display = "block";

}

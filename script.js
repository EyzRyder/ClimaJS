document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('Carrgando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ecbeface0d60118d6f29c35d7325cd00&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if (json.cod === 200) {

            showInfo({
                name: json.name,
                county: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                description: json.weather[0].description
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização')
        }
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');
    document.querySelector('.aviso').style.display = 'none';

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.county}`;
    document.querySelector('.weather_descricao').innerHTML = `${json.description}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <sup>km/h</sup>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.aviso').style.display = 'none';
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').style.display = 'block';
    document.querySelector('.aviso').innerHTML = msg;
}

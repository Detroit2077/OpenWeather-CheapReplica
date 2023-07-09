var text = document.getElementById('input2')
const btn = document.getElementById('b2')
var card = document.querySelector(".card");
const form = document.getElementById('f2');
var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var today = new Date();
var date = mS[today.getMonth()] + '-' + today.getDate();
apik = "663dbc9ffe2e08f3f82073649c5a6373";

const tempe = (a) => {
    return (a-273).toFixed(2);
};

form.addEventListener('submit', function(event) {
    event.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=+'+text.value+'&appid='+apik)
        .then((response) => {
            return response.json();
        }).then((jdata) => {
            const ihtml = `
        <div class="card-body" style="font-family: sans-serif; position: relative; left:75%;">
            <h5 class="card-title">${date}</h5>
            <h2 class="card-subtitle">${jdata.name}, ${jdata.sys.country}</h2>
            <h1 style="color: #eb6e4b">${tempe(jdata.main.temp)}°C</h1>
            <p class="card-text"style="font-weight: bold;font-size: 13px;">Feels like ${tempe(jdata.main.feels_like)}°C. ${jdata.weather[0].description}</p>
            <a class="card-link-1" style="font-weight: bold;">Wind:${jdata.wind.speed}m/s</a>
            <a class="card-link-2" style="font-weight: bold;">Humidity:${jdata.main.humidity}%</a>
            <br><br>
            <a class="card-link-3" style="font-weight: bold;">Pressure:${jdata.main.pressure}hPa</a>
            <a class="card-link-4" style="font-weight: bold;">Visibility:${(jdata.visibility/1000).toFixed(1)}Km</a>
        </div>
            `;

            card.innerHTML = ihtml;
        })
        .catch((error) => {
            console.log(new Error("You entered a city out of range"));
            const ohtml = '<p style="color: red; font-weight: bolder;position: relative; left: 90%">You entered a city out of range/You enterd wrong city</p>';
            card.innerHTML = ohtml;
        });
});
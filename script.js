let weather = {
    apiKey: "8ef6b07d8654c244fa2ee4a45a5c11be",
    fetchWeather: function(city) {
        document.querySelector(".weather").classList.add("loading");
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/hr';
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";

    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    clearData: function() {
        document.querySelector('.city').innerText = "Enter a city";
        document.querySelector('.icon').src = "";
        document.querySelector('.temp').innerText = "";
        document.querySelector('.description').innerText = "";
        document.querySelector('.humidity').innerText = "";
        document.querySelector('.wind').innerText = "";
    }
};
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
});
document.querySelector(".weather").classList.remove("loading");
weather.clearData();

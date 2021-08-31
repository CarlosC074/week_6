
var cityName = document.getElementById("cityName");
var submitBtn = document.getElementById("submitBtn");
//all previous results will generate with a prevSearch class
var prevSearches = document.getElementById("prevSearchWindow");
var todayWindow = document.getElementById("todayCast");
var forecastCards = document.getElementsByClassName("forecastCard"); 
var d = new Date;
//current date in MM/DD/YYYY format
var date = d.toLocaleDateString("en-US");

// allows the addition of days to native date objects
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

function fetchAllInfo() {
    var key = `3b6a9b93ec05be94df96f081c52c8ee3`;
    var city = cityName.value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(url) 
    .then(function(response){
        return response.json();
    })
    .then(function(newData){
        console.log(newData);
        const cityLon = `${newData.coord.lon}`;
        const cityLat = `${newData.coord.lat}`;
        fetchOneCall(cityLon, cityLat);
        
    })
}

function fetchOneCall(x,y) {
    const lon = x;
    const lat = y;
    var key = `3b6a9b93ec05be94df96f081c52c8ee3`;
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${key}`
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(oneCall) {
            console.log(oneCall);
            console.log(oneCall.daily[2].temp.day)
            //Current report window
                //city name, date
            const namedCity =  cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
            const namedCityTitle = document.getElementsByTagName("h1");
            namedCityTitle[0].innerHTML = `${namedCity}  ${date}`;
                //temperature
            const currentTemp = Math.floor(oneCall.current.temp);
            const currentTempTab = document.getElementById("currentTemp");
            currentTempTab.innerHTML = `Temp: ${currentTemp}°F`;
                //wind speed
            const currentWind = oneCall.current.wind_speed;
            const currentWindTab = document.getElementById("currentWind");
            currentWindTab.innerHTML = `Wind(mp/h): ${currentWind} mp/h`;
                //humidity
            const currentHumidity = oneCall.current.humidity;
            const currentHumidityTab = document.getElementById("currentHumidity");
            currentHumidityTab.innerHTML = `Humidity: ${currentHumidity}%`;
                //uvi index
            const currentUVI = Math.floor(oneCall.current.uvi);
            const currentUVITab = document.getElementById("currentUVI");
            currentUVITab.innerHTML = `UV index: ${currentUVI}`
            currentUVITab.classList.remove("uviSafe");
            currentUVITab.classList.remove("uviWarning");
            currentUVITab.classList.remove("uviDanger");
                if(currentUVI < 6){
                    currentUVITab.classList.add("uviSafe");
                }
                else if(currentUVI >= 6){
                    currentUVITab.classList.add("uviWarning");
                }
                else {
                    currentUVITab.classList.add("uviDanger");
                }
            //previous searches generator
            const prevSearchTab = document.createElement("div");
            prevSearchTab.innerHTML = namedCity;
            prevSearchTab.classList.add("prevSearch");
            prevSearchTab.addEventListener("click", function() {
                cityName.value = namedCity;
                fetchAllInfo();
                this.remove();
            });
            prevSearches.appendChild(prevSearchTab);
            //5 day forecast
            for (i = 0; i < forecastCards.length; i++){
                const cardDate = d.addDays(i + 1).toLocaleDateString("en-US");
                cons


            }

        })
}

submitBtn.addEventListener("click", fetchAllInfo);

var cityName = document.getElementById("cityName");
var submitBtn = document.getElementById("submitBtn");
//all previous results will generate with a prevSearch class
var prevSearches = document.getElementsByClassName("prevSearch");
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
            //Current report window
            const namedCity =  cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1);
            namedCityTitle = document.getElementsByTagName("h1");
            namedCityTitle[0].innerHTML = `${namedCity}  ${date}`;
            //


            
            


        })
}

submitBtn.addEventListener("click", fetchAllInfo);
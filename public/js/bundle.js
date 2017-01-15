(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let kbd = document.getElementsByTagName("KBD");
for(let i=0; i<kbd.length; i++){
    kbd[i].addEventListener("click", getKey);
}

function getKey(e){
    let key = e.target.innerText;
    switch(key){
    case 84:
        train();
        break;
    case "Weather":
        getCurrentWeather();		
        break;
    case "News":
        createButtons();
        break;
    default:
        console.log("no api called");
    }
}


function createButtons(){
    let news = document.getElementById("buttons");
    if(news.childNodes.length > 5) return;
    let titles = ["technology", "upshot", "politics", "national"];
    for(let i =0; i < titles.length; i++){
        let btn = document.createElement("BUTTON");
        let title = document.createTextNode(titles[i]);
        btn.appendChild(title);
        btn.setAttribute("id", titles[i]);
        btn.setAttribute("class", "newsBtn");
        news.appendChild(btn);
    }
    addClickToButton();
}


function news(btn){
    let type = btn.target.id;
    fetch("/news?type="+type).then((info)=>{
        info.json().then((body)=>{
            parseNews(body);
        });
    });
}


function addClickToButton(){
    let buttons = document.getElementsByClassName("newsBtn");
    for(let i =0; i <buttons.length; i++){
        buttons[i].addEventListener("click", news, false);
    }	
}


function parseNews(data){
    let newsDiv = document.getElementById("news-results");
    newsDiv.innerHTML = "";
    let newsArray = data.news;
    for(let i=0; i < newsArray.length; i++){
        let h2 = document.createElement("H2");
        let title = document.createTextNode(newsArray[i].title);
        h2.appendChild(title);
        let aTag = document.createElement("a");
        aTag.setAttribute("href", newsArray[i].url);
        aTag.appendChild(h2);
        let h4 = document.createElement("H4");
        let author = document.createTextNode(newsArray[i].byline);
        h4.appendChild(author);
        let p = document.createElement("P");
        let summary = document.createTextNode(newsArray[i].abstract);
        p.appendChild(summary);
        newsDiv.appendChild(aTag);
        newsDiv.appendChild(h4);
        newsDiv.appendChild(p);
    }
}


// weather functions
function getCurrentWeather(){
    let zip = document.getElementById("weather-zip").value;
    fetch("/weather/current?zip="+zip).then((info)=>{
        info.json().then((body)=>{	
            let locationInfo = body.locationInfo;
            getDailyWeather(locationInfo.lat, locationInfo.lng);
            addCurrentWeather(body.weather);
            getIcon(body.weather.weather[0].icon);
        });
    });
}

function addCurrentWeather(currentWeather){
    let weatherDiv       = document.getElementById("current");
    if(weatherDiv)weatherDiv.innerHTML = "";
    let h2               = document.createElement("H2");
    let title            = document.createTextNode("Current Weather in "+currentWeather.name);
    h2.appendChild(title);
    let h4               = document.createElement("H4");
    let forecast         = document.createTextNode("Current conditions "+currentWeather.weather[0].description+" with temperatures around "+currentWeather.main.temp);
    h4.appendChild(forecast);
    weatherDiv.appendChild(h2);
    weatherDiv.appendChild(h4);
}

function getIcon(weatherIcon){
    let weatherDiv = document.getElementById("current");
    if(weatherIcon ==="01d"){
        var icon = "/icons/day.svg";
    }else if(weatherIcon ==="01n"){
        icon = "/icons/night.svg";
    }else if(weatherIcon === "02d"){
        icon = "/icons/cloudy-day-3.svg";
    }else if(weatherIcon === "02n"){
        icon = "/icons/cloudy-night-3.svg";
    }else if(weatherIcon === "03d" || weatherIcon === "03n" || weatherIcon ==="04d" || weatherIcon ==="04n"){
        icon = "/icons/cloudy.svg";
    }else if(weatherIcon === "09d" || weatherIcon === "09n"){
        icon = "/icons/rainy-6.svg";
    }else if(weatherIcon === "10d"){
        icon = "/icons/rainy-3.svg";
    }else if(weatherIcon === "10n"){
        icon = "/icons/rainy-5.svg";
    }else if(weatherIcon === "11d" || weatherIcon ==="11n"){
        icon = "/icons/thunder.svg";
    }else if(weatherIcon === "13d" || weatherIcon ==="13n"){
        icon = "/icons/snowy-6.svg";
    }else if(weatherIcon === "50d" || weatherIcon ==="50n"){
        icon = "/icons/haze.svg";
    }
    let xhr = new XMLHttpRequest(),
        method= "GET",
        url = icon;
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "image/svg+xml");
    xhr.onreadystatechange = function(){
        if(xhr.readyState !=4)return;
        let svg = xhr.responseXML.documentElement;
        svg =document.importNode(svg,true);
        weatherDiv.appendChild(svg);
    };
    xhr.send();
}

function getDailyWeather(lat, lng){
    fetch("/weather/getDailyWeather?lat="+lat+"&long="+lng).then((info)=>{
        info.json().then((body)=>{	
            parseWeather(body);
        });
    });
}

function parseWeather(weather){
    let daily_div = document.getElementById("daily-weather");
    if(daily_div)daily_div.innerHTML ="";    
    console.log(daily_div)
    let title          = document.createTextNode(`Daily Weather in ${weather.dailyWeather.city.name} for the next ${weather.dailyWeather.cnt} days`);
    let h3             = document.createElement("H3");
    h3.appendChild(title);
    daily_div.appendChild(h3)
    let daily_weather = weather.dailyWeather.list;
    for(let i=0; i < daily_weather.length;i++){
        let div = document.createElement('DIV')
        div.setAttribute('class', 'daily-weather-div')
        let icon = `http://openweathermap.org/img/w/${daily_weather[i].weather[0].icon}.png`;
        let img = document.createElement('img');
        img.src = icon
        div.appendChild(img)
        let h5 = document.createElement("H5")
        let high = daily_weather[i].temp.max;
        let low = daily_weather[i].temp.min;
        let temp = document.createTextNode(`H: ${high} L:${low}`);
        h5.appendChild(temp);
        let h6 = document.createElement('H6');
        let forecast = document.createTextNode(`${daily_weather[i].weather[0].main}`);
        h6.appendChild(forecast);
        div.appendChild(h5);
        div.appendChild(h6);
        daily_div.appendChild(div)
    }
}


function train(){
    console.log("in train, hit 84");		
}

},{}]},{},[1]);

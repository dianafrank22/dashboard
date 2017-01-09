(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.addEventListener('keyup', getKey)


function getKey(e){
	var key = e.keyCode
	switch(key){
		case 84:
			train();
			break;
		case 87:
			getCurrentWeather();		
			break;
		case 78:
			createButtons()
			break;
		default:
			console.log('no api called')
	}
}


function createButtons(){
	var news = document.getElementById('news')
	if(news.childNodes.length > 5){
		//buttons already created
	}else{
		 var titles = ["technology", "upshot", "politics", "national"]
		 for(let i =0; i < titles.length; i++){
 			var btn = document.createElement("BUTTON");
		 	var title = document.createTextNode(titles[i]);
		 	btn.appendChild(title)
		 	btn.setAttribute("id", titles[i])
		 	btn.setAttribute("class", "newsBtn")
		 	news.appendChild(btn)
 		}
 		addClickToButton()
	}

}


function news(btn){
	var type = btn.target.id
	fetch('/news?type='+type).then((info)=>{
		info.json().then((body)=>{
			parseNews(body)
		})
	})
}


function addClickToButton(){
	var buttons = document.getElementsByClassName("newsBtn");
	for(let i =0; i <buttons.length; i++){
		buttons[i].addEventListener('click', news, false)
	}	
}


function parseNews(data){
		var newsDiv = document.getElementById("news-results")
		newsDiv.innerHTML = ""
		var newsArray = data.news
		for(var i=0; i < newsArray.length; i++){
			var h2 = document.createElement('H2');
			var title = document.createTextNode(newsArray[i].title)
			h2.appendChild(title)
			var aTag = document.createElement('a');
			aTag.setAttribute('href', newsArray[i].url)
			aTag.appendChild(h2)
			var h4 = document.createElement('H4')
			var author = document.createTextNode(newsArray[i].byline)
			h4.appendChild(author)
			var p = document.createElement("P")
			var summary = document.createTextNode(newsArray[i].abstract)
			p.appendChild(summary)
			newsDiv.appendChild(aTag)
			newsDiv.appendChild(h4)
			newsDiv.appendChild(p)
		}
}


// weather functions
function getCurrentWeather(){
	var zip = document.getElementById('weather-zip').value
	fetch('/weather/current?zip='+zip).then((info)=>{
		info.json().then((body)=>{	
			var locationInfo = body.locationInfo
			getDailyWeather(locationInfo.lat, locationInfo.lng)
			addCurrentWeather(body.weather)
		})
	})
}

function addCurrentWeather(currentWeather){
	// need to add icon
	var weatherDiv       = document.getElementById("weather")
	weatherDiv.innerHTML = ""
	var h2               = document.createElement('H2')
	var title            = document.createTextNode('Current Weather in '+currentWeather.name)
	h2.appendChild(title)
	var h4               = document.createElement('H4')
	var forecast         = document.createTextNode("Current conditions "+currentWeather.weather[0].description+" with temperatures around "+currentWeather.main.temp)
	h4.appendChild(forecast)
	var icon = "http://openweathermap.org/img/w/"+currentWeather.weather[0].icon+ ".png";
	var img = document.createElement('img')
	img.src = icon
	weatherDiv.appendChild(h2)
	weatherDiv.appendChild(img)
	weatherDiv.appendChild(h4) 
}

function getDailyWeather(lat, lng, currentWeather){
	fetch('/weather/getDailyWeather?lat='+lat+'&long='+lng).then((info)=>{
		info.json().then((body)=>{	
			parseWeather(body)
		})
	})
}

function parseWeather(dailyWeather){
	// console.log(dailyWeather)
}


function train(){
	console.log('in train, hit 84')			
}



function addText(divName, info){
	var content = document.createTextNode(info);
	divName.appendChild(content);
}



},{}]},{},[1]);

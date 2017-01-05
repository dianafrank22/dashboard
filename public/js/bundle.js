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



// news functions
function createButtons(){
	var news = document.getElementById('news')
		console.log(news.childNodes.length)

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
	var key = keys.newyorktimes
	console.log(key)
	var type = btn.target.id
	return new Promise(function(resolve, reject){
		fetch("https://api.nytimes.com/svc/topstories/v2/"+type+".json?api-key="+key,{
			method:"GET"
		}).then((response) => {
			if(response.status >= 400){
				response.json().then((body) => {
					reject(new Error(body.error))
				})
			}
			response.json().then((body) =>{
				resolve(body)
				callNews(body)
			})
		})
	})
}

function addClickToButton(){
	var buttons = document.getElementsByClassName("newsBtn");
	for(let i =0; i <buttons.length; i++){
		buttons[i].addEventListener('click', news, false)
	}	
}


function callNews(data){
		var newsDiv = document.getElementById("news-results")
		newsDiv.innerHTML = ""
		var newsArray = data.results
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
		console.log(info)
		getDailyWeather()
	})
}

function getDailyWeather(){
	console.log('in daily weather')
	fetch('/weather/getDailyWeather').then((info)=>{
		console.log(info)
	})
}


function train(){
	console.log('in train, hit 84')			
}



function addText(divName, info){
	var content = document.createTextNode(info);
	divName.appendChild(content);
}



},{}]},{},[1]);

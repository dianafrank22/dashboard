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
	var type = btn.target.id
	fetch('/news?type='+type).then((info)=>{
		info.json((body)=>{
			console.log(body)
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
		info.json().then((body)=>{	
			var locationInfo = body.locationInfo
			getDailyWeather(locationInfo.lat, locationInfo.lng)
		})
	})
}

function getDailyWeather(lat, lng){
	fetch('/weather/getDailyWeather?lat='+lat+'&long='+lng).then((info)=>{
		info.json().then((body)=>{	
			console.log(body)
		})
	})
}


function train(){
	console.log('in train, hit 84')			
}



function addText(divName, info){
	var content = document.createTextNode(info);
	divName.appendChild(content);
}



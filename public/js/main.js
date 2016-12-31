// import keys from "../secret/keys.js"
// need to make sure there is a delay on api calls,
// if key was hit a few minutes ago, don't let them do it again ?

var keys = require('./secret/keys')


function getKey(e){
	var key = e.keyCode
	switch(key){
		// change train to lirr? 
		case 84:
			news(technology)
			break;
		case 87:
			getLatLong().then((data)=>{
				getWeather(data.lat,data.lng).then((data)=>{
					console.log(data)
					var text= "Current weather " + data.current.summary
					addText(weather, text)
				})
			})			
			break;
		case 78:
			news(national)
			break;
		case 85:
			news(upshot)
			break;
		case 80:
			news(politics)
			break;
		case 76:
			train();
			break;
		default:
			console.log('no api called')
	}
}

function train(){
	console.log('in train, hit 84')			
}

function getWeather(lat, long){
	var key = keys.forecast
	return new Promise(function(resolve, reject){
		fetch("https://api.darksky.net/forecast/"+key+"/"+lat+","+long,{
			method: "GET"
		}).then((response)=>{
				if(response.status >= 400){
				response.json().then((body)=>{
					reject(new Error(body.error))
				})
			}
			response.json().then((body)=>{
				var weatherInfo = {current: body.currently, daily: body.daily}
				resolve(weatherInfo)
			})
		})
	})
}

function addText(divName, info){
	var content = document.createTextNode(info);
	divName.appendChild(content);
}

function news(type){
	var key = keys.newyorktimes
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
				console.log(body)
			})
		})
	})
}


function getLatLong(){
	var zip = document.getElementById('weather-zip').value
	var key = keys.google
	return new Promise(function(resolve, reject){
		fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+zip+"&key="+key,{
			method: "GET"
		}).then((response) =>{
			if(response.status >= 400){
				response.json().then((body)=>{
					reject(new Error(body.error))
				})
			}
			response.json().then((body)=>{
				var locationInfo = body.results[0].geometry.location
				resolve(locationInfo)
			})
		})
	})
}


window.addEventListener('keyup', getKey)
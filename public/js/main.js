// import keys from "../secret/keys.js"
// need to make sure there is a delay on api calls,
// if key was hit a few minutes ago, don't let them do it again ?

var keys = require('./secret/keys')


function getKey(e){
	var key = e.keyCode
	switch(key){
		case 84:
			train();
			break;
		case 87:
			getLatLong().then((data)=>{
				console.log('in the then')
				weather(data.lat,data.lng)
			})			
			break;
		case 78:
			console.log('in news, hit 78')
			break;
		default:
			console.log('no api called')
	}
}

function train(){
	console.log('in train, hit 84')			
}

function weather(lat, long){
	var key = keys.forecast
	console.log("https://api.darksky.net/forecast/"+key+"/"+lat+","+long)
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
				// apparent temperature, summary, precipProbability
				console.log(body.currently)
				console.log(body.daily)
			})
		})
	})
}

function news(){
	console.log('news')
}

window.addEventListener('keyup', getKey)


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
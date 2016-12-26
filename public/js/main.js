// import keys from "../secret/keys.js"
// need to make sure there is a delay on api calls,
// if key was hit a few minutes ago, don't let them do it again ?

var keys = require('./secret/keys')


function getKey(e){
	var key = e.keyCode
	console.log(key)
	switch(key){
		case 84:
			train();
			break;
		case 87:
			getLatLong();			
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

function weather(){
	console.log('weather')
}

function news(){
	console.log('news')
}

window.addEventListener('keyup', getKey)


function getLatLong(){
	var zip = document.getElementById('weather-zip').value
	console.log(zip)
	var key = keys.google
	console.log(key)
	console.log("https://maps.googleapis.com/maps/api/geocode/json?address="+zip+"&key="+key)
	return new Promise(function(resolve, reject){
		fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+zip+"&key="+key,{
			method: "GET"
		}).then((response) =>{
			console.log(response)
		})
	})
}
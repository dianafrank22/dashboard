(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
				getWeather(data.lat,data.lng).then((data)=>{
					console.log(data)
					var text= "Current weather " + data.current.summary
					addText(weather, text)
				})
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
	// get tech, upshot, politics, national
	var key = keys.newyorktimes
	return new Promise(function(resolve, reject){
		fetch("",{
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
},{"./secret/keys":2}],2:[function(require,module,exports){
var keys = {
	forecast: "49a6e10c13411ac75c7c0ace5f506ea1",
	newyorktimes: "a772dc3238a3480591085ec85e9986b1",
	google: "AIzaSyAdzbJmIaEY7zzxDMc1PAC31Paq6AEqQSE",
	mta: "0d05ae482bda033ad7c31c8ded81a7f8"
}

module.exports = keys
},{}]},{},[1]);

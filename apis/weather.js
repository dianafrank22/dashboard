const API_KEY    = process.env.FORECAST
const GOOGLEKEY  = process.env.GOOGLE
const fetch      = require('node-fetch');

function getLatLong(req, res, next){
		let zip = req.query.zip
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLEKEY}`)
		.then((response) =>{
			response.json().then((body)=>{
				 res.locationInfo = body.results[0].geometry.location
				 next();
			}).catch(err =>{
				console.log(err)
				res.err = err
				next();
			})
		})
}

    

function getCurrentWeather(req, res, next){
	let lat = res.locationInfo.lat
	let long = res.locationInfo.lng
	fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&mode=json&units=imperial`)
	.then((response)=>{
		response.json().then((body)=>{
			res.currentWeather = body
			next();
		}).catch(err =>{
			console.log(err)
			res.err = err
		})
	})
}	



function getDailyWeather(req, res, next){
		let lat = req.query.lat
		let long = req.query.long
		fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&APPID=${API_KEY}&mode=json&units=imperial&cnt=7`)
		.then((response)=>{
			response.json().then((body)=>{
			res.dailyWeather = body
			next();
		}).catch(err =>{
		    console.log(err)
			res.err = err
		})
	})
}

module.exports = {getLatLong, getCurrentWeather, getDailyWeather}
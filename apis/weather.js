const KEY        = process.env.FORECAST
const GOOGLEKEY  = process.env.GOOGLE
const fetch      = require('node-fetch');



function getLatLong(req,res, next){
	let zip = req.query.zip
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLEKEY}`)
		.then((response) =>{
			response.json().then((body)=>{
				 req.params.locationInfo = body.results[0].geometry.location
				 next();
			}).catch(err =>{
				console.log(err)
				res.err = err
				next();
			})
		})
}

    

function getCurrentWeather(req, res, next){
	var lat = req.params.locationInfo.lat
	var long = req.params.locationInfo.lng
	fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${KEY}&mode=json&units=imperial`)
	.then((response)=>{
		response.json().then((body)=>{
			console.log(body)
			res.currentWeather = body
			next();
		}).catch(err =>{
			res.err = err
		})
	})
}	



function getDailyWeather(req, res){
		var lat = req.params.locationInfo.lat
		var long = req.params.locationInfo.lng
		fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&APPID=${KEY}&mode=json&units=imperial&cnt=7`)
		.then((response)=>{
			response.json().then((body)=>{
			res.dailyWeather = body
			next();
		}).catch(err =>{
			res.err = err
		})
		})
}

module.exports = {getLatLong, getCurrentWeather, getDailyWeather}
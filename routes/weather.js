const router = require('express').Router();
const { getLatLong,
		getCurrentWeather, 
	    getDailyWeather} = require('../apis/weather');


router.get('/current', getLatLong, getCurrentWeather, (req, res)=>{
	console.log(res.currentWeather)
	res.json({weather: res.currentWeather})
});

router.get('/getDailyWeather', getLatLong, getDailyWeather, (req, res)=>{
	console.log(res.dailyWeather)
	res.json({dailyWeather: res.dailyWeather})
});

module.exports = router;
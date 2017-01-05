const router = require('express').Router();
const { getLatLong,
		getCurrentWeather, 
	    getDailyWeather} = require('../apis/weather');


router.get('/current', getLatLong, getCurrentWeather, (req, res)=>{
	res.json({weather: res.currentWeather})
});

router.get('/getDailyWeather', getLatLong, getDailyWeather, (req, res)=>{
	res.json({dailyWeather: res.dailyWeather})
});

module.exports = router;
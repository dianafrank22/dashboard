const router = require('express').Router();
const { getLatLong,
		getCurrentWeather, 
	    getDailyWeather} = require('../apis/weather');


router.get('/current', getLatLong, getCurrentWeather, (req, res)=>{
	res.json({locationInfo: res.locationInfo, weather: res.currentWeather})
});

router.get('/getDailyWeather', getDailyWeather, (req, res)=>{
	res.json({dailyWeather: res.dailyWeather})
});

module.exports = router;
const API_KEY    = process.env.MTA
const fetch      = require('node-fetch');

function getTrainSchedule(req, res,next){
	var type = req.query.type
	fetch(`http://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${API_KEY}`)
	.then((response)=>{
		response.json().then((body)=>{
			res.schedule = body
			next();
		}).catch(err =>{
			console.log(err)
			res.err = err
			next();
		})
	})
}


module.exports = {getTrainSchedule}
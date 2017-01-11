const API_KEY    = process.env.NEWYORKTIMES
const fetch      = require('node-fetch');

function getNews(req, res,next){
	let type = req.query.type
	fetch(`http://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${API_KEY}`)
	.then((response)=>{
		response.json().then((body)=>{
			res.news = body.results
			next();
		}).catch(err =>{
			console.log(err)
			res.err = err
			next();
		})
	})
}


module.exports = {getNews}
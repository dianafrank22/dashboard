const router = require('express').Router();
const {getNews} = require('../apis/news')

router.get('/', getNews,(req, res)=>{
	res.json({news: res.news})
})



module.exports = router;
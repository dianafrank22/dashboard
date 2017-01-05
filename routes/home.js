const router = require('express').Router();

router.get('/', (req, res)=>{
	res.send('index.html');
});

module.exports = router;
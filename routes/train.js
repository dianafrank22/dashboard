const router = require('express').Router();
const {getTrainSchedule} = require('../apis/train')

router.get('/', getTrainSchedule,(req, res)=>{
	res.json({schedule: res.schedule})
})



module.exports = router;
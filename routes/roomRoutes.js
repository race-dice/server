const router = require('express').Router()
const RoomController = require('../controllers/RoomController')
const {authentication, authorization} = require('../middlewares/auth')

// router.use(authentication)

router.post('/', RoomController.create)
router.get('/', RoomController.read)

module.exports = router
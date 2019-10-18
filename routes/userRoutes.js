const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require("../middlewares/auth")

router.post('/register', UserController.register)
router.get('/:roomid', UserController.showall)
router.use(authentication)
router.patch("/:roomid", UserController.updateRoomId)

module.exports = router
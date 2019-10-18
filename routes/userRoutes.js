const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.get('/:roomid', UserController.showall)
router.patch('/:id', UserController.update)


module.exports = router
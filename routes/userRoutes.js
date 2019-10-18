const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.get('/', UserController.showall)
router.patch('/:id', UserController.update)

module.exports = router
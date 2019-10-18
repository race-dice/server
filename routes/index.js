const router = require('express').Router()
const userRoutes = require('./userRoutes')
const roomRoutes = require('./roomRoutes')

router.use('/user',userRoutes)
router.use('/room',roomRoutes)

module.exports = router

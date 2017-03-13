var express = require('express')
var router = express.Router()
var controllers = require('../controllers/user')
/* GET users listing. */
router.post('/login', controllers.login)
router.post('/register', controllers.register)
router.get('/verify/:token', controllers.verify)
module.exports = router

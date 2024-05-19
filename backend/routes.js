const router = require('express').Router()
const authController = require('./controllers/auth-controller')
const activateController = require('./controllers/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/sendOtp',authController.sendOtp)
router.post('/api/verifyOtp',authController.verifyOtp)
router.post('/api/activate',authMiddleware, activateController.activate)
router.get('/api/refresh',authController.refresh)

module.exports = router ;
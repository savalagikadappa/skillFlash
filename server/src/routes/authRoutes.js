const { Router } = require('express');
const c = require('../controllers/authController');
const router = Router();

router.post('/signup', c.signup);
router.post('/verify-otp', c.verifyOtp);
router.post('/resend-otp', c.resendOtp);
router.post('/login', c.login);

module.exports = router;

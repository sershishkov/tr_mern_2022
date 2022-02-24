const express = require('express');
const router = express.Router();

const {
  register__User,
  login__User,
  get__Me,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', register__User);
router.post('/login', login__User);
router.get('/me', protect, get__Me);

module.exports = router;

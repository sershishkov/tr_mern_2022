const express = require('express');
const router = express.Router();
const {
  getAll__Goals,
  create__Goal,
  update__Goal,
  delete__Goal,
} = require('../controllers/goalController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getAll__Goals).post(protect, create__Goal);
router.route('/:id').put(protect, update__Goal).delete(protect, delete__Goal);

module.exports = router;

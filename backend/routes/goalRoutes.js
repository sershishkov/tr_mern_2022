const express = require('express');
const router = express.Router();
const {
  getAll__Goals,
  create__Goal,
  update__Goal,
  delete__Goal,
} = require('../controllers/goalController');

router.route('/').get(getAll__Goals).post(create__Goal);
router.route('/:id').put(update__Goal).delete(delete__Goal);

module.exports = router;

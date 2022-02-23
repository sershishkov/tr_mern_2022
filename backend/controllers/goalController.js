const asyncHandler = require('express-async-handler');

//@desc   getAll__Goals
//@route  GET /api/goals
//@acces  Private
const getAll__Goals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get goals' });
});

//@desc   create__Goal
//@route  POST /api/goals
//@acces  Private
const create__Goal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  res.status(200).json({ message: 'Create goal' });
});

//@desc   update__Goal
//@route  PUT /api/goals/:id
//@acces  Private
const update__Goal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal with id: ${req.params.id}` });
});

//@desc   delete__Goal
//@route  DELETE /api/goals/:id
//@acces  Private
const delete__Goal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal with id: ${req.params.id}` });
});

module.exports = {
  getAll__Goals,
  create__Goal,
  update__Goal,
  delete__Goal,
};

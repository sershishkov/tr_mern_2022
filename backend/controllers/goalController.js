const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

//@desc   getAll__Goals
//@route  GET /api/goals
//@acces  Private
const getAll__Goals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc   create__Goal
//@route  POST /api/goals
//@acces  Private
const create__Goal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

//@desc   update__Goal
//@route  PUT /api/goals/:id
//@acces  Private
const update__Goal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const updated__Goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updated__Goal);
});

//@desc   delete__Goal
//@route  DELETE /api/goals/:id
//@acces  Private
const delete__Goal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAll__Goals,
  create__Goal,
  update__Goal,
  delete__Goal,
};

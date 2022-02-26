const asyncHandler = require('express-async-handler');
const Model__goal = require('../models/goalModel');
const Model__user = require('../models/userModel');

//@desc   getAll__Goals
//@route  GET /api/goals
//@acces  Private
const getAll__Goals = asyncHandler(async (req, res) => {
  const goals = await Model__goal.find({ user: req.user.id });
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

  const goal = await Model__goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc   update__Goal
//@route  PUT /api/goals/:id
//@acces  Private
const update__Goal = asyncHandler(async (req, res) => {
  const goal = await Model__goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updated__Goal = await Model__goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updated__Goal);
});

//@desc   delete__Goal
//@route  DELETE /api/goals/:id
//@acces  Private
const delete__Goal = asyncHandler(async (req, res) => {
  const goal = await Model__goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
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

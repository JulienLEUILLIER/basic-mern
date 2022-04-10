const res = require("express/lib/response");
const Goal = require("../models/goalModel");

const runAsyncWrapper = (callback) => {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
};

const getGoals = runAsyncWrapper(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).send(goals);
});

const setGoal = runAsyncWrapper(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please input a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

const fetchGoalById = async (id) => {
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("No goal with this id found");
  }

  return goal;
};

const updateGoal = runAsyncWrapper(async (req, res) => {
  const goal = await fetchGoalById(req.params.id);

  const updatedGoal = await Goal.findByIdAndUpdate(goal.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedGoal);
});

const deleteGoal = runAsyncWrapper(async (req, res) => {
  const goal = await fetchGoalById(req.params.id);

  const deletedGoal = await Goal.findByIdAndDelete(goal.id);

  res.status(200).send(deletedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

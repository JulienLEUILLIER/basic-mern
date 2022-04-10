const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const runAsyncWrapper = (callback) => {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
};

const getGoals = runAsyncWrapper(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).send(goals);
});

const setGoal = runAsyncWrapper(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please input a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

const updateGoal = runAsyncWrapper(async (req, res) => {
  const goal = await getGoalVerifyingRelationWithUser(req, res);

  const updatedGoal = await Goal.findByIdAndUpdate(goal.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedGoal);
});

const deleteGoal = runAsyncWrapper(async (req, res) => {

  const goal = await getGoalVerifyingRelationWithUser(req, res);

  const deletedGoal = await Goal.findByIdAndDelete(goal.id);

  res.status(200).send(deletedGoal);
});

const getGoalVerifyingRelationWithUser = async (req, res) => {
  const goal = await fetchGoalById(req.params.id, res);
  const user = await fetchUserById(req.user.id, res);

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to perform actions on this goal");
  }

  return goal;
};

const fetchGoalById = async (id, res) => {
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("No goal with this id found");
  }

  return goal;
};

const fetchUserById = async (id, res) => {
  const user = User.findById(id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

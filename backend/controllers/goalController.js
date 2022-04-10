const getGoals = (req, res) => {
  res.status(200).send({ message: "Get goals" });
};

const setGoal = (req, res, next) => {
  try {
    if (!req.body.text) {
      throw new Error("Please input a text field");
    }
    res.send({ message: "Set goal" });
  } catch (err) {
    return next(err);
  }
};

const updateGoal = (req, res) => {
  res.status(200).send({ message: "Update goal" });
};

const deleteGoal = (req, res) => {
  res.status(200).send({ message: "Delete goal" });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

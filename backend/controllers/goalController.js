const getGoals = (req, res) => {
  res.status(200).send({ message: "Get goals" });
};

const setGoal = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please input a text field");
  }

  res.status(200).send({ message: "Set goals" });
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

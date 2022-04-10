const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorHandler");

app.use([express.json(), express.urlencoded({ extended: false })]);

app.use("/api/goals/", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening in on port ${port}`));

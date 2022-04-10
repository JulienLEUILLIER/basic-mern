const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

connectDB();

app.use([express.json(), express.urlencoded({ extended: false })]);

app.use("/api/goals/", require("./routes/goalRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening in on port ${port}`));

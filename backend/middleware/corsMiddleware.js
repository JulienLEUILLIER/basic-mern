const allowCORS = (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { allowCORS };

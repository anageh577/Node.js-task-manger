const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw Error();
    }
    const { email, name, password, age, _id } = user;
    req.user = { email, name, age, token, _id };
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authenticated" });
  }
};

module.exports = auth;

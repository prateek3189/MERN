const HttpError = require("../models/http-error");

const User = require("../models/user-model.js");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "email name");
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create user.", 500);
    return next(error);
  }
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hasUser = await User.findOne({ email: email });
    if (hasUser) {
      throw new HttpError("User already exists", 422);
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/JohnRambo1982.jpg/220px-JohnRambo1982.jpg",
  });

  try {
    await newUser.save();
    res.status(200).json({ user: newUser });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create user.", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      throw new HttpError("User not found as invalid credentials", 404);
    }

    res.json({ user });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find a user for provided place id.",
      500
    );
    return next(error);
  }
};

module.exports = {
  getUsers,
  login,
  signup,
};

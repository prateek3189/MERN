const HttpError = require("../models/http-error");

const uuid = require("uuid").v4;

DUMMY_USERS = [
  {
    id: "u1",
    name: "John Rambo",
    email: "john@gmail.com",
    password: "123456",
  },
  {
    id: "u2",
    name: "Rocky Balboa",
    email: "rocky@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);
  res.status(200).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const userData = DUMMY_USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (!userData) {
    throw new HttpError("User not found as invalid credentials", 404);
  }

  res.status(200).json({ user: userData });
};

module.exports = {
  getUsers,
  login,
  signup,
};

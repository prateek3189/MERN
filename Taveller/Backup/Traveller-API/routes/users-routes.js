const express = require("express");

const router = express.Router();

const UsersController = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload-middleware");

router.get("/", UsersController.getUsers);

router.post("/signup", fileUpload.single("image"), UsersController.signup);

router.post("/login", UsersController.login);

module.exports = router;

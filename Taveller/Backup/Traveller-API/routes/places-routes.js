const express = require("express");

const router = express.Router();

const PlacesController = require("../controllers/places-controller");

router.get("/:pid", PlacesController.getPlaceById);

router.get("/user/:uid", PlacesController.getPlaceByUserId);

router.post("/", PlacesController.createPlace);

router.patch("/:pid", PlacesController.updatePlace);

router.delete("/:pid", PlacesController.deletePlace);

module.exports = router;

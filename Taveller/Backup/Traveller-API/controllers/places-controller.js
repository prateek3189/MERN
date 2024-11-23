const { ObjectId } = require("mongodb");
const HttpError = require("../models/http-error");

const Place = require("../models/place-model");
const User = require("../models/user-model");
const mongoose = require("mongoose");

const GetPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await Place.findById(placeId);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find a place for provided place id.",
      500
    );
    return next(error);
  }
};

const GetPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const place = await Place.find({ userId: userId });

    res.json({ places: place.map((p) => p.toObject({ getters: true })) });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find a place for provided user id.",
      500
    );
    return next(error);
  }
};

const CreatePlace = async (req, res, next) => {
  const { title, description, image, location, address, userId } = req.body;

  const createdPlace = new Place({
    title,
    description,
    image,
    location,
    image,
    address,
    userId,
  });

  let user;
  try {
    user = await User.findOne({ _id: new ObjectId(userId) });
  } catch (e) {
    const error = new HttpError("Creating place failed. Please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User does not exists.", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    session.commitTransaction();

    res.status(200).json({ place: createdPlace });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create place.", 500);
    return next(error);
  }
};

const UpdatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  try {
    // Get the place
    const place = await Place.findById(placeId);
    place.title = title;
    place.description = description;

    // Update Place
    await place.save();

    res.status(200).json({ place: place.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something Went Wrong: Could not update a place for provided place id.",
      500
    );
    return next(error);
  }
};

const DeletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    // Get the place
    await Place.deleteOne({ _id: new ObjectId(placeId) });
    res.status(200).json({ message: "Place deleted successfully." });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something Went Wrong: Could not update a place for provided place id.",
      500
    );
    return next(error);
  }
};

module.exports = {
  getPlaceById: GetPlaceById,
  getPlaceByUserId: GetPlaceByUserId,
  createPlace: CreatePlace,
  updatePlace: UpdatePlace,
  deletePlace: DeletePlace,
};

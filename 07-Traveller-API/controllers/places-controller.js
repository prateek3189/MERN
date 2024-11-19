const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "The state building is one of the most highet skuper",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKc-fuLIfy4VMszXgcRpSVLA6sz00ZPYabcA&s",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 29.6893014,
      lng: -0.0941512,
    },
    userId: "u1",
  },
  {
    id: "p2",
    title: "Burj Khalifa",
    description:
      "Spired 828-metre skyscraper with a viewing deck, a restaurant, a hotel and offices.",
    image:
      "https://www.pelago.com/img/products/AE-United%20Arab%20Emirates/dubai-burj-khalifa-tickets-at-the-top-level-124th-125th/15f1df94-02ab-4020-b6d3-9bac82dd7b2c_dubai-burj-khalifa-tickets-at-the-top-level-124th-125th-medium.jpg",
    address:
      "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    location: {
      lat: 29.6893014,
      lng: -0.0941512,
    },
    userId: "u2",
  },
];

const GetPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError("Could not find a place for provided place id.", 404)
    );
  }
  res.json({ place });
};

const GetPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = [...DUMMY_PLACES.filter((p) => p.userId === userId)];

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for provided user id.", 404)
    );
  }
  res.json({ places });
};

const CreatePlace = (req, res, next) => {
  const { title, description, image, coordinates, address, userId } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    image,
    location: coordinates,
    address,
    userId,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(200).json({ place: createdPlace });
};

const UpdatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  if (!updatedPlace) {
    return next(
      new HttpError("Could not find a place for provided place id.", 404)
    );
  }
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const DeletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const updatedPlaces = DUMMY_PLACES.filter((p) => p.id !== placeId);

  DUMMY_PLACES = updatedPlaces;

  res.status(200).json({ places: DUMMY_PLACES });
};

module.exports = {
  getPlaceById: GetPlaceById,
  getPlaceByUserId: GetPlaceByUserId,
  createPlace: CreatePlace,
  updatePlace: UpdatePlace,
  deletePlace: DeletePlace,
};

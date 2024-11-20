import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const DUMMY_PLACES = [
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

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.userId === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

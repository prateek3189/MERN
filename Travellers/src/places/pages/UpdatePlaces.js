import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/Hooks/FormHook";

import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card/Card";

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

const UpdatePlace = () => {
  const placeId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <Card>
        <div className="center">
          <h2>No Place Found</h2>
        </div>
      </Card>
    );
  }

  const updatePlaceHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    !isLoading && (
      <form className="place-form" onSubmit={updatePlaceHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
          errorText="Please enter a valid description"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>
    )
  );
};

export default UpdatePlace;

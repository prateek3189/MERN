import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/Hooks/FormHook";
import { useHttp } from "../../shared/Hooks/HttpHook";
import LoadingSpinner from "../../shared/components/UIElements/Loader/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import { AuthContext } from "../../shared/Context/auth-context";

import "./PlaceForm.css";

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().id;
  const history = useHistory();
  const authContext = useContext(AuthContext);

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

  useEffect(() => {
    (async () => {
      (async () => {
        const responseData = await sendRequest(
          "http://localhost:5000/api/places/" + placeId
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      })();
    })();
  }, [sendRequest, placeId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!loadedPlace && !error) {
    return (
      <Card>
        <div className="center">
          <h2>No Place Found</h2>
        </div>
      </Card>
    );
  }

  const updatePlaceHandler = async (event) => {
    event.preventDefault();
    await sendRequest(
      `http://localhost:5000/api/places/${placeId}`,
      "PATCH",
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    debugger;
    history.push(`/${authContext.userId}/places`);
  };

  return (
    !isLoading && (
      <>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedPlace && (
          <form className="place-form" onSubmit={updatePlaceHandler}>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title"
              onInput={inputHandler}
              initialValue={loadedPlace.title}
              initialValid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description"
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Update Place
            </Button>
          </form>
        )}
      </>
    )
  );
};

export default UpdatePlace;

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./PlaceForm.css";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/Hooks/FormHook";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { useHttp } from "../../shared/Hooks/HttpHook";
import { AuthContext } from "../../shared/Context/auth-context";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loader/LoadingSpinner";

const NewPlace = () => {
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          userId: authContext.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}

        <Input
          type="text"
          label="Title"
          id="title"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          label="Description"
          id="description"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a description atleast 5 characters."
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          label="Address"
          id="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default NewPlace;

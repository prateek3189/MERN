import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttp } from "../../shared/Hooks/HttpHook";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loader/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const userId = useParams().userId;

  useEffect(() => {
    (async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlace(responseData.places);
      } catch (error) {}
    })();
  }, [sendRequest, userId]);
  // const loadedPlaces = DUMMY_PLACES.filter((place) => place.userId === userId);

  const placeDeletedHandler = (deletePlaceId) => {
    setLoadedPlace((prevPlaces) =>
      prevPlaces.filter((place) => place.id != deletePlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onOverlay onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;

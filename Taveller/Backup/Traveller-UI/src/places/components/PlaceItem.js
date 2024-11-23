import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Map from "../../shared/components/UIElements/Map/Map";
import { AuthContext } from "../../shared/Context/auth-context";
import { useHttp } from "../../shared/Hooks/HttpHook";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const place = props.place;
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const history = useHistory();

  const showDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const hideDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    await sendRequest(
      `http://localhost:5000/api/places/${props.place.id}`,
      "DELETE"
    );
    props.onDelete(props.place.id);
    setShowConfirmModal(false);
  };

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={place.address}
        contentClass="plce-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map />
        </div>
      </Modal>
      <Modal
        heare="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={hideDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Danger
            </Button>
          </>
        }
        show={showConfirmModal}
        onCancel={hideDeleteHandler}
      >
        <h3>Do you want to delete this place?</h3>
      </Modal>
      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img
              src={place.image || "https://picsum.photos/600/400"}
              alt={place.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isloggedIn && (
              <>
                <Button to={`/places/${place.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../shared/components/UIElements/Card/Card";

const NO_IMAGE_FOUND =
  "https://i.pinimg.com/736x/16/18/20/1618201e616f4a40928c403f222d7562.jpg";

const UserItem = (props) => {
  const user = props.item;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${user._id}/places`}>
          <div className="user-item__image">
            <Avatar image={user.image || NO_IMAGE_FOUND} alt={user.name} />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>Click to view places.</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

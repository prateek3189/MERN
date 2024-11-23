import React from "react";

import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card/Card";

const UsersList = (props) => {
  if (props.items && props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items &&
        props.items.map((user) => {
          return <UserItem key={user._id} item={user} />;
        })}
    </ul>
  );
};

export default UsersList;

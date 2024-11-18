import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "John Rambo",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/JohnRambo1982.jpg/220px-JohnRambo1982.jpg",
      placeCount: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;

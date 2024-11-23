import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loader/LoadingSpinner";
import { useHttp } from "../../shared/Hooks/HttpHook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    (async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
      } catch (e) {}
    })();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UsersList items={loadedUsers} />
    </>
  );
};

export default Users;

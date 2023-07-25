import React, { useEffect, useState } from "react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import { getEndpoint } from "services/apiFunctions";
import fetchStatus from "components/fetch-status/fetchStatus";
import getUserPoolId from "utils/getUserPoolId";

const Users = () => {
  const [users, setUsers] = useState();
  const getUsers = () => {
    const query = { userPoolId: getUserPoolId() };
    const queryStr = new URLSearchParams(query).toString();
    getEndpoint(`/users?${queryStr}`).then((res) => {
      console.log(res);
      let usersCleaned = res.map((user) => {
        let status = user.enabled ? "Active" : "Inactive";

        if (user.userStatus?.value === "FORCE_CHANGE_PASSWORD")
          status = "Pending";

        let userModified = {
          status,
          userCreateDate: user.userCreateDate,
          userLastModifiedDate: user.userLastModifiedDate,
        };
        user.attributes.forEach((element) => {
          userModified[element.name] = element.value;
        });
        return userModified;
      });
      setUsers(usersCleaned);
    });
  };

  useEffect(getUsers, []);
  return (
    <div>
      <UsersHeader getUsers={getUsers} />
      {fetchStatus(
        users,
        () => (
          <UsersTable usersList={users} getUsers={getUsers} />
        ),
        "No Users"
      )}
    </div>
  );
};

export default Users;

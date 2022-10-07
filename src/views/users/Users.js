import React from "react";
import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";

const Users = () => {
  const users = [
    {
      email: "Shakra.am@gmail.com",
      name: "Abdishakur Tiif",
      type: "Admin",
      dateCreated: "2022-07-10",
    },
    {
      email: "aqaldevelopersltd@gmail.com",
      name: "__",
      type: "Staff",
      dateCreated: "2022-10-06",
    },
  ];
  return (
    <div>
      <UsersHeader />
      <UsersTable usersList={users} />
    </div>
  );
};

export default Users;

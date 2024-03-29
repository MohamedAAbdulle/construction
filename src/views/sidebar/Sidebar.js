import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "assests/logo.svg";
import "./sidebar.sass";
import Ellipsis from "components/ellipsis/Ellipsis";
import sidebarRoutes from "./sidebarRoutes";
import { logoutRedirect } from "services/auth";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-head">
        <img src={logo} alt="logo" className="logo" />
        <Ellipsis
          cover={<AccountCircle style={{ color: "white" }} />}
          menus={[
            { onClick: () => {}, label: "My Profile" },
            {
              onClick: () => {
                logoutRedirect();
              },
              label: "Sign Out",
            },
          ]}
        />
      </div>
      <div className="sidebar-navs">
        {sidebarRoutes.map((n) => (
          <NavLink to={n.route} className="sidebar-nav">
            <i>{n.icon}</i>
            <span>{n.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

import { Menu, MenuItem, IconButton, ListItemIcon } from "@material-ui/core";
import { Menu as Menuv } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import sidebarRoutes from "views/sidebar/sidebarRoutes";

const PageNavs = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <div>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.target);
        }}
      >
        <Menuv />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        className="page-navs"
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        {sidebarRoutes
          .filter((menu) => menu)
          .map((menu, index) => (
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
              }}
              key={index}
            >
              <NavLink to={menu.route} className="page-nav">
                <ListItemIcon>{menu.icon}</ListItemIcon>

                {menu.title}
              </NavLink>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default PageNavs;

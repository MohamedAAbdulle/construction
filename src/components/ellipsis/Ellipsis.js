import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

import React from "react";

const Ellipsis = ({ menus, cover }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.target);
        }}
      >
        {cover ? cover : <MoreVert />}
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {menus
          .filter((menu) => menu)
          .map((menu, index) => (
            <MenuItem
              onClick={() => {
                menu.onClick();
                setAnchorEl(null);
              }}
              key={index}
              className={`purple ${menu.classes}`}
            >
              {menu.icon}
              <span className="mx-1"></span>
              {menu.label}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default Ellipsis;

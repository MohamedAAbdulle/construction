import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";

const Ellipsis = ({ menus }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.target);
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {menus.map((menu, index) => (
          <MenuItem
            onClick={() => {
              menu.onClick();
              setAnchorEl(null);
            }}
            key={index}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Ellipsis;

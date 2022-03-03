import React from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./topbar.sass";
import logo from "assests/logo.svg";

const Topbar = () => {
  const [active, setActive] = React.useState("inv");
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <AppBar position="static">
      <Toolbar className="top-bar">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={logo} className="logo" />
          </Grid>
          <Grid item>
            <NavLink to="/inventory" className="route-nav">
              <Button
                color="inherit"
                id={active === "inv" ? "active-nav" : ""}
                onClick={() => setActive("inv")}
              >
                Inventory
              </Button>
            </NavLink>

            <NavLink to="/workers" className="route-nav">
              <Button
                color="inherit"
                id={active === "work" ? "active-nav" : ""}
                onClick={() => setActive("work")}
              >
                Workers
              </Button>
            </NavLink>

            <NavLink to="/sub-contracts" className="route-nav">
              <Button
                color="inherit"
                id={active === "sub-cont" ? "active-nav" : ""}
                onClick={() => setActive("sub-cont")}
              >
                Sub-Contracts
              </Button>
            </NavLink>

            <NavLink to="/accounting" className="route-nav">
              <Button
                color="inherit"
                id={active === "acc" ? "active-nav" : ""}
                onClick={() => setActive("acc")}
              >
                Accounting
              </Button>
            </NavLink>

            <NavLink to="/dashboard" className="route-nav">
              <Button
                color="inherit"
                id={active === "dash" ? "active-nav" : ""}
                onClick={() => setActive("dash")}
              >
                Dashboard
              </Button>
            </NavLink>
          </Grid>
          <Grid item>
            <IconButton
              color="inherit"
              onClick={(e) => {
                setAnchorEl(e.target);
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem>My profile</MenuItem>
              <MenuItem>Sign Out</MenuItem>
              <MenuItem>Setting</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

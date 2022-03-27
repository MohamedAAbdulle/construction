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
import StickySlider from "components/sliderModal/StickySlider";
import Settings from "./Settings";

const Topbar = () => {
  const [active, setActive] = React.useState(window.location.pathname);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  return (
    <AppBar position="static">
      <Toolbar className="top-bar">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={logo} alt="logo" className="logo" />
          </Grid>
          <Grid item>
            <NavLink to="/inventory" className="route-nav">
              <Button
                color="inherit"
                id={
                  active === "/inventory" || active === "/" ? "active-nav" : ""
                }
                onClick={() => setActive("/inventory")}
              >
                Inventory
              </Button>
            </NavLink>

            <NavLink to="/orders" className="route-nav">
              <Button
                color="inherit"
                id={active === "/orders" ? "active-nav" : ""}
                onClick={() => setActive("/orders")}
              >
                Orders
              </Button>
            </NavLink>

            <NavLink to="/workers" className="route-nav">
              <Button
                color="inherit"
                id={active === "/workers" ? "active-nav" : ""}
                onClick={() => setActive("/workers")}
              >
                Workers
              </Button>
            </NavLink>

            <NavLink to="/suppliers" className="route-nav">
              <Button
                color="inherit"
                id={active === "/suppliers" ? "active-nav" : ""}
                onClick={() => setActive("/suppliers")}
              >
                Suppliers
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

            <NavLink to="/dashboard" className="route-nav">
              <Button
                color="inherit"
                id={active === "/dashboard" ? "active-nav" : ""}
                onClick={() => setActive("/dashboard")}
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
              <MenuItem
                onClick={() => {
                  setOpen(true);
                  setAnchorEl(null);
                }}
              >
                Setting
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
      <StickySlider clickState={open} setClickState={setOpen}>
        <Settings closeSlider={() => setOpen(false)} order={{}} />
      </StickySlider>
    </AppBar>
  );
};

export default Topbar;

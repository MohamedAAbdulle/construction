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
import Ellipsis from "components/ellipsis/Ellipsis";

const Topbar = () => {
  const [active, setActive] = React.useState(window.location.pathname);
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

            <NavLink to="/tools" className="route-nav">
              <Button
                color="inherit"
                id={active === "/tools" ? "active-nav" : ""}
                onClick={() => setActive("/tools")}
              >
                Tools
              </Button>
            </NavLink>
            <NavLink to="/tools-inuse" className="route-nav">
              <Button
                color="inherit"
                id={active === "/tools-inuse" ? "active-nav" : ""}
                onClick={() => setActive("/tools-inuse")}
              >
                Inuse-Tools
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
            <Ellipsis
              cover={<AccountCircle style={{ color: "white" }} />}
              menus={[
                { onClick: () => {}, label: "My Profile" },
                { onClick: () => {}, label: "Sign Out" },
                {
                  onClick: () => setOpen(true),
                  label: "Settings",
                },
              ]}
            />
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

import React from "react";
import {
  Grid,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import "./topbar.sass";
import logo from "assests/logo.svg";
import StickySlider from "components/sliderModal/StickySlider";
import Settings from "./Settings";
import Ellipsis from "components/ellipsis/Ellipsis";
import PageNavs from "./PageNavs";

const Topbar = () => {
  const [active, setActive] = React.useState(window.location.pathname);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="top-bar">
      <Grid container justifyContent="space-between" alignItems="center">

        <PageNavs />
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
    </div>
  );
};

export default Topbar;

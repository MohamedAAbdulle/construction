import React from "react";
import { Grid } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import "./topbar.sass";
import Ellipsis from "components/ellipsis/Ellipsis";
import PageNavs from "./PageNavs";
import { logoutRedirect } from "services/auth";

const Topbar = () => {
  return (
    <div className="top-bar">
      <Grid container justifyContent="space-between" alignItems="center">
        <PageNavs />
        LOGO
        <Grid item>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Topbar;

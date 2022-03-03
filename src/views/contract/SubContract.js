import { Button, Grid, IconButton } from "@material-ui/core";
import React from "react";
import AddPricePoint from "./modals/AddPricePoint";
import { Add, MoreVert } from "@material-ui/icons";
import { digitsToCurrency } from "utils/currencyFormatter";
import BtnComp from "components/btn-comp/BtnComp";

const SubContract = ({ sub, onPricePointAdd }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sub-contract">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h3>{sub.name}</h3>
        </Grid>
        <Grid item>
          <BtnComp label="ADD" icon={<Add />} onClick={() => setOpen(true)} />
        </Grid>
      </Grid>

      {sub.pricePoints.map((pricePoint, key) => (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          key={key}
          style={{
            maxWidth: "700px",
            background: "#c0c2c9",
            margin: "10px auto",
            padding: "0px 20px",
            borderRadius: "5px",
          }}
        >
          <Grid item>{pricePoint.priceType}</Grid>
          <Grid item> {digitsToCurrency(pricePoint.priceAmount)}</Grid>
          <Grid item>
            <IconButton onClick={() => {}}>
              <MoreVert />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      {open && (
        <AddPricePoint
          onClose={() => setOpen(false)}
          subName={sub.name}
          onAction={onPricePointAdd}
        />
      )}
    </div>
  );
};

export default SubContract;

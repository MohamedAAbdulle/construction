import React from "react";
import { TextField, Grid, MenuItem, Button } from "@material-ui/core";
import { accountType } from "utils/enums";
import { accountingContx } from "views/accounting/AccountingContx";

const AccountingHead = () => {
  const { filterAccounts } = React.useContext(accountingContx);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <h2 className="page-title">Accounting</h2>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          size="small"
          select
          label="Filter Accounts"
          //style={{ width: 150 }}
          onChange={filterAccounts}
          id="filter-select"
        >
          {["All", ...accountType].map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" size="small">
          Create Accounting
        </Button>
      </Grid>
    </Grid>
  );
};

export default AccountingHead;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import { dateReadable } from "utils/dateFormatter";
import { accountingContx } from "views/accounting/AccountingContx";


const AccountingTable = () => {
  const { accounts } = React.useContext(accountingContx);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            <TableCell align="center">Supplier</TableCell>
            <TableCell align="center">Material</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Date Created</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.supplierName}</TableCell>
              <TableCell align="center">{item.invName}</TableCell>
              <TableCell align="center">
                {item.quantity + " " + item.unit}
              </TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell align="center">
                {dateReadable(item.dateDone)}
              </TableCell>
              <TableCell align="center" id={item.status}>
                {item.status}
              </TableCell>
              <TableCell align="center">
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
                  <MenuItem>See Docs</MenuItem>
                  <MenuItem>Update Status & Docs</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountingTable;

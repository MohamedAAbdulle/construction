import React from "react";
import NewContract from "./NewContract";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { contractContext } from "./ContractContext";
import { MoreVert } from "@material-ui/icons";
import { dateReadable } from "utils/dateFormatter";

const ContractTable = () => {
  const { contractList } = React.useContext(contractContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  /* const [modal, setModal] = React.useState("");
  const [selectedInv, setSelectedInv] = React.useState({});

  const tableAction = (type) => {
    setAnchorEl(null);
    setModal(type);
  };

  const closeModal = () => {
    setModal("");
  }; */

  return (
    <>
      {contractList ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="table-head">
                <TableCell>Contract</TableCell>
                <TableCell align="center">Contractor</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Date Modified</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contractList.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.contract}
                    </TableCell>
                    <TableCell align="center">{row.contractor}</TableCell>
                    <TableCell align="center">{row.totalPrice}</TableCell>
                    <TableCell align="center">
                      {dateReadable(row.modifiedDate)}
                    </TableCell>
                    <TableCell align="center">
                      {row.status || "Inprogress"}
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
                        <MenuItem onClick={() => {}}>Add More</MenuItem>
                        <MenuItem onClick={() => {}}>Take Out</MenuItem>
                        <MenuItem onClick={() => {}}>History</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4 className="centered">Loading...</h4>
      )}
    </>
  );
};

export default ContractTable;

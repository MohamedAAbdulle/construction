import React from "react";
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
import "./table-cont.sass";

const TableCont = ({ tableTitles, dataList }) => {
  return (
    <TableContainer component={Paper} className="table-cont">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            {tableTitles.map((title) => (
              <TableCell align="center">{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((data) => (
            <TableRow>
              {data.map((cell) => (
                <TableCell align="center">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCont;

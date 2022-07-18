import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "./table-cont.sass";

const TableCont = ({ tableTitles, dataList, classes }) => {
  classes = classes || [];
  return (
    <TableContainer component={Paper} className="table-cont">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            {tableTitles.map((title, key) => (
              <TableCell align="center" key={key}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((data, key) => (
            <TableRow key={key} className={classes[key]}>
              {data.map((cell, key) => (
                <TableCell align="center" key={key}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCont;

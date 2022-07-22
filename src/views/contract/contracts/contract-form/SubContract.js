import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import AddContractItem from "./AddContractItem";
import { Add } from "@material-ui/icons";
import { digitsToCurrency } from "utils/currencyFormatter";
import BtnComp from "components/btn-comp/BtnComp";
import TableCont from "components/table-comp/TableCont";
import Ellipsis from "components/ellipsis/Ellipsis";
import fetchStatus from "components/fetch-status/fetchStatus";
import dateFormatter from "utils/dateFormatter";

const SubContract = ({ conts, onContractItemChanged }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="contract-items card-comp">
      <div className="card-title">
        Contract Items
        <BtnComp
          label="ADD"
          icon={<Add />}
          onClick={() => setOpen([])}
          size="sm"
        />
      </div>

      {fetchStatus(
        conts,
        () => (
          <TableCont
            tableTitles={[
              "Contract item",
              "Price",
              "Start & End",
              "Status",
              "",
            ]}
            classes={conts.map((x) => x._action)}
            dataList={conts.map((cont, index) => [
              cont.title,
              digitsToCurrency(cont.price),
              `${dateFormatter(cont.startDate, "DD,MMM")} -- ${dateFormatter(
                cont.endDate,
                "DD,MMM"
              )}`,
              cont.status,
              <Ellipsis
                menus={[
                  {
                    onClick: () => {
                      setOpen([cont, index]);
                    },
                    label: "Edit",
                  },
                  {
                    onClick: () => {},
                    label: "Documents",
                  },

                  cont._action !== "Deleted" &&
                    cont._action !== "Created" && {
                      onClick: () => {
                        onContractItemChanged(index, {
                          ...cont,
                          _action: "Deleted",
                        });
                      },
                      label: "Delete",
                    },

                  cont._action && {
                    onClick: () => {
                      onContractItemChanged(index, {
                        ...cont,
                        _action: "Canceled",
                      });
                    },
                    label: "Cancel",
                  },
                ]}
              />,
            ])}
          />
        ),
        "No Contract Items"
      )}

      {open && (
        <AddContractItem
          onClose={() => setOpen(false)}
          open={open}
          onContractItemChanged={onContractItemChanged}
          //subName={sub.name}
          //onAction={onPricePointAdd}
        />
      )}
    </div>
  );
};

export default SubContract;

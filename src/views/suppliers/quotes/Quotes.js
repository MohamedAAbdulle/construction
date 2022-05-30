import { Grid, IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import InputComp from "components/input/InputComp";
import React from "react";
import NewQuote from "./NewQuote";
import findError from "utils/findError";
import BtnComp from "components/btn-comp/BtnComp";
import "./quotes.sass";
import fetchStatus from "components/fetch-status/fetchStatus";

const Quotes = ({ quotes, setQuotes, invList, errors }) => {
  const [openNewQuote, setOpenNewQuote] = React.useState(false);

  const findInventory = (id) => {
    let inv = (invList || []).find((i) => i.id === id);
    console.log(invList);
    if (inv) {
      return { name: inv.name, unit: inv.unit };
    } else {
      return {};
    }
  };
  const addQuote = (quote) => {
    setQuotes([...quotes, { ...quote, status: "Created" }]);
    setOpenNewQuote(false);
  };

  const editQuote = (e, index) => {
    const { value, name } = e.target;
    setQuotes((prev) => {
      let newQuotes = JSON.parse(JSON.stringify(prev));
      let modifiedQuote = newQuotes[index];
      modifiedQuote[name] = value === "" ? value : parseInt(value);
      if (modifiedQuote.id) {
        modifiedQuote.status = "Modified";
      }
      return newQuotes;
    });
  };

  const restoreDoc = (id) => {
    setQuotes((prev) => {
      let cc = [...prev];
      let a = cc.find((d) => d.id === id);
      delete a.status;
      return cc;
    });
  };
  const cancelAddDoc = (index) => {
    setQuotes((prev) => {
      let cc = [...prev];
      cc.splice(index, 1);
      return cc;
    });
  };

  const deleteQuote = (index) => {
    setQuotes((prev) => {
      let newQuotes = JSON.parse(JSON.stringify(prev));
      let modifiedQuote = newQuotes[index];
      if (modifiedQuote.id) {
        modifiedQuote.status = "Deleted";
      }
      return newQuotes;
    });
  };
  return (
    <div className="card-comp quotes">
      <div className="card-title">
        Quotes
        <IconButton onClick={() => setOpenNewQuote(true)}>
          <Add />
        </IconButton>
      </div>
      {fetchStatus(
        quotes,
        () =>
          quotes.map((quote, index) => {
            let invInfo = findInventory(quote.inventoryId);

            return (
              <Grid
                container
                spacing={2}
                key={index}
                alignItems="center"
                className={quote.status}
              >
                <Grid item xs={4}>
                  <p>{invInfo.name}</p>
                </Grid>
                <Grid item xs={3}>
                  <InputComp
                    onChange={(e) => editQuote(e, index)}
                    value={quote.amount}
                    postfix={invInfo.unit}
                    label="Amount"
                    name="amount"
                    error={findError(`Quotes[${index}].Amount`, errors)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputComp
                    onChange={(e) => editQuote(e, index)}
                    value={quote.price}
                    label="Price"
                    name="price"
                    error={findError(`Quotes[${index}].Price`, errors)}
                    required
                  />
                </Grid>

                <Grid item xs={2}>
                  {quote.status === "Deleted" ? (
                    <BtnComp
                      label="Restore"
                      onClick={() => restoreDoc(quote.id)}
                      size="sm"
                    />
                  ) : quote.status === "Created" ? (
                    <BtnComp
                      label="Cancel"
                      onClick={() => cancelAddDoc(index)}
                      size="sm"
                    />
                  ) : (
                    <IconButton onClick={() => deleteQuote(index)}>
                      <Delete />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            );
          }),
        "No Quotes"
      )}
      {openNewQuote && (
        <NewQuote onClose={() => setOpenNewQuote(false)} addQuote={addQuote} />
      )}
    </div>
  );
};

export default Quotes;

import InputComp from "components/input/InputComp";
import ModalCont from "components/modalCont/ModalCont";
import { useContext, useEffect, useState } from "react";
import findError from "utils/findError";
import BtnComp from "components/btn-comp/BtnComp";
import { Grid, IconButton } from "@material-ui/core";
import { getEndpoint, postEndpoint, putEndpoint } from "services/apiFunctions";
import { Add, Delete } from "@material-ui/icons";

import onChangeSimple from "utils/onChangeSimple";
import { appContext } from "AppContext";
import fetchStatus from "components/fetch-status/fetchStatus";

const QuotesList = ({ onClose, id }) => {
  const [quotes, setQuotes] = useState();
  const { invList, getInvList } = useContext(appContext);
  const [errors, setErrors] = useState({});

  const getQuotes = () => {
    getEndpoint(`/suppliers/${id}/quotes`).then((res) => {
      let data = res.failed ? res : res.reverse();
      setQuotes(data);
    });
  };

  const onSave = () => {
    putEndpoint(`/suppliers/${id}/quotes`, quotes).then((res) => {
      if (res && res.status === 200) {
        onClose();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };

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

  useEffect(() => {
    getQuotes();
    getInvList();
  }, []);

  return (
    <ModalCont open={true} onClose={onClose} title="Quotes" onSave={onSave}>
      <div className="supplier-quotes">
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
                  <Grid item xs={3}>
                    <p>{invInfo.name}</p>
                  </Grid>
                  <Grid item xs={4}>
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
      </div>
    </ModalCont>
  );
};

export default QuotesList;

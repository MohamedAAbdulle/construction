import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import { Grid, IconButton } from "@material-ui/core";
import { getEndpoint, postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import findError from "utils/findError";
import { Add, Close, Delete } from "@material-ui/icons";
import NewQuote from "./NewQuote";
import { appContext } from "AppContext";

const SupplierForm = ({ supplier, closeSlider }) => {
  const { invList, getSuppliers } = React.useContext(appContext);
  const [errors, setErrors] = React.useState({});

  const [state, setState] = React.useState(supplier || {});
  const [quotes, setQuotes] = React.useState([]);
  const [deletedQuotes, setDeletedQuotes] = React.useState([]);
  const [openNewQuote, setOpenNewQuote] = React.useState(false);

  const onChanged = (e) => {
    onChangeSimple(e, state, setState);
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

  const deleteQuote = (index) => {
    setQuotes((prev) => {
      let newQuotes = JSON.parse(JSON.stringify(prev));
      let modifiedQuote = newQuotes[index];
      if (modifiedQuote.id) {
        modifiedQuote.status = "Deleted";
        setDeletedQuotes([...deletedQuotes, modifiedQuote]);
      }
      newQuotes.splice(index, 1);
      return newQuotes;
    });
  };

  const onSave = () => {
    let saveAction;
    if (state.id) {
      saveAction = putEndpoint(`/suppliers/${state.id}`, {
        supplier: state,
        quotes: [...quotes, ...deletedQuotes],
      });
    } else {
      saveAction = postEndpoint(`/suppliers`, state);
    }
    saveAction.then((res) => {
      if (res && res.status === 200) {
        getSuppliers();
        closeSlider();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };

  const findInventory = (id) => {
    let inv = invList.find((i) => i.id === id);
    console.log(invList);
    if (inv) {
      return { name: inv.name, unit: inv.unit };
    } else {
      return {};
    }
  };

  const getQuotes = () => {
    if (state.id) {
      getEndpoint(`/suppliers/${state.id}/quotes`).then((res) => {
        setQuotes(res);
      });
    }
  };
  React.useEffect(getQuotes, []);

  return (
    <div>
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="end">
          <Grid item>Supplier Form</Grid>
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BtnComp label="Save" onClick={onSave} />
              <IconButton onClick={closeSlider}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="slider-body">
        <div className="card-comp">
          <div className="card-title">Supplier Info</div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputComp
                onChange={onChanged}
                value={state.name}
                label="Name"
                name="name"
                error={findError("Supplier.Name", errors)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputComp
                onChange={onChanged}
                value={state.phone}
                label="Phone"
                name="phone"
                error={findError("Supplier.Phone", errors)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputComp
                onChange={onChanged}
                value={state.email}
                label="Email"
                name="email"
                error={findError("Supplier.Email", errors)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputComp
                onChange={onChanged}
                value={state.address}
                label="Address"
                name="address"
                error={findError("Supplier.Address", errors)}
                required
              />
            </Grid>
          </Grid>
        </div>

        {state.id && (
          <div className="card-comp">
            <div className="card-title">
              Quotes
              <IconButton onClick={() => setOpenNewQuote(true)}>
                <Add />
              </IconButton>
            </div>
            {quotes.map((quote, index) => {
              let invInfo = findInventory(quote.inventoryId);

              return (
                <Grid container spacing={2} key={index} alignItems="center">
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
                    <IconButton onClick={() => deleteQuote(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </div>
        )}
      </div>
      {openNewQuote && (
        <NewQuote onClose={() => setOpenNewQuote(false)} addQuote={addQuote} />
      )}
    </div>
  );
};

export default SupplierForm;

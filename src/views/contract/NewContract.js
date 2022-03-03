import React from "react";
import { Button, Grid, IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import SubContract from "./SubContract";
import AddSubContract from "./modals/AddSubContract";
import { Add, Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import { appContext } from "AppContext";
import { contractContext } from "./ContractContext";

const NewContract = ({ closeSlider }) => {
  const { postEndpoint } = React.useContext(appContext);
  const { getContracts } = React.useContext(contractContext);

  const [state, setState] = React.useState({
    totalPrice: 0,
    subContracts: [],
  });
  const [open, setOpen] = React.useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubContAdd = (name) => {
    const newSub = { name, pricePoints: [] };
    setState({ ...state, subContracts: [...state.subContracts, newSub] });
  };
  const onPricePointAdd = (name, newPricepoint) => {
    setState((prev) => {
      const p = prev.subContracts.find((p) => p.name === name);
      console.log(p);
      if (p) {
        p.pricePoints.push(newPricepoint);
        prev.totalPrice += parseFloat(newPricepoint.priceAmount);
      }
      return { ...prev };
    });
  };

  const onSave = () => {
    postEndpoint("/contracts", state).then(() => getContracts());
  };

  return (
    <div className="gg">
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="end">
          <Grid item>New Contract</Grid>
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
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ padding: "25px 10px", background: "white" }}
        >
          <Grid item>
            <InputComp label="Contractor" name="contract" onChange={onChange} />
          </Grid>
          <Grid item>
            <InputComp label="Contract" name="contractor" onChange={onChange} />
          </Grid>
          <Grid item>
            <InputComp
              label="totalPrice"
              value={state.totalPrice}
              disabled
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ margin: "20px 0" }}
        >
          <p></p>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setOpen(true)}
            >
              <Add />
              Sub-contract
            </Button>
          </Grid>
        </Grid>

        {state.subContracts.map((sub, key) => (
          <SubContract sub={sub} onPricePointAdd={onPricePointAdd} key={key} />
        ))}

        {open && (
          <AddSubContract
            onClose={() => setOpen(false)}
            onAction={onSubContAdd}
          />
        )}
      </div>
    </div>
  );
};

export default NewContract;

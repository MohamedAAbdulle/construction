import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";
import { pricePointType } from "utils/enums";

const AddPricePoint = ({ onClose, onAction, subName }) => {
  const [state, setState] = React.useState({});
  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };
  const on_action = () => {
    if (state.priceType && state.priceAmount) {
      onAction(subName, state);
      onClose();
    }
  };
  return (
    <div>
      <ModalCont open={true} onClose={onClose} onAction={on_action}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <InputComp
              type="select"
              label="Price Type"
              name="priceType"
              required
              onChange={onChange}
              options={pricePointType}
            />
          </Grid>
          <Grid item xs={6}>
            <InputComp
              type="number"
              label="Price Amount"
              name="priceAmount"
              required
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </ModalCont>
    </div>
  );
};

export default AddPricePoint;

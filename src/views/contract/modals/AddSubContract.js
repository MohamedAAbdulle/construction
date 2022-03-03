import React from "react";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import { Grid } from "@material-ui/core";

const AddSubContract = ({ onClose, onAction }) => {
  const [state, setState] = React.useState();
  const onSave = () => {
    if (state) {
      onAction(state);
      onClose();
    }
  };
  return (
    <div>
      <ModalCont
        open={true}
        onClose={onClose}
        onAction={onSave}
        title="New Sub-contract"
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <InputComp
              label="sub-contract Name"
              name="subContractName"
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
        </Grid>
      </ModalCont>
    </div>
  );
};

export default AddSubContract;

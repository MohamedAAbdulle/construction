import React from "react";
import { Grid } from "@material-ui/core";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { toolsContx } from "../ToolsContx";

const ToolForm = ({ closeModal, state }) => {
  const { getTools } = React.useContext(toolsContx);

  const [tool, setTool] = React.useState(state);
  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, tool, setTool);
  };

  const addInventory = () => {
    let endpoint;
    tool.id
      ? (endpoint = putEndpoint(`/tools`, tool))
      : (endpoint = postEndpoint(`/tools`, tool));

    endpoint.then((res) => {
      if (res && res.status === 200) {
        closeModal();
        getTools();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };
  const findError = (type) => {
    if (errors[type]) {
      return errors[type][0];
    }
  };

  return (
    <>
      <ModalCont open={true} onClose={closeModal} title="New Tool">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={tool.name || ""}
              name="name"
              label="Item Name"
              required
              error={findError("Name")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={tool.quantity || ""}
              name="quantity"
              error={findError("Quantity")}
              label="Quantity"
              type="number"
            />
          </Grid>
        </Grid>

        <div className="modal-btns">
          <BtnComp label="Save" onClick={addInventory} />
        </div>
      </ModalCont>
    </>
  );
};

export default ToolForm;

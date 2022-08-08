import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import InputComp from "components/input/InputComp";
import SubContract from "./SubContract";
import { Close } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import DocumentsComp from "components/documents/DocumentsComp";
import ContractorSearcher from "components/searchers/ContractorSearcher";
import { contractContext } from "views/contract/ContractContext";
import { putEndpoint } from "services/apiFunctions";

const ContractForm = ({ closeSlider, initialContract, formLabel }) => {
  const { contractors, getContracts } = React.useContext(contractContext);
  const [state, setState] = React.useState(initialContract);
  React.useEffect(() => setState(initialContract), [initialContract]);
  React.useEffect(() => {
    let totalPrice =
      state.contractItems && state.contractItems.length
        ? state.contractItems
            .filter((cont) => cont.editedAction !== "Deleted")
            .reduce((total, cont) => {
              if (cont) {
                return total + parseInt(cont.price);
              }
            }, 0)
        : 0;
    setState({ ...state, totalPrice });
  }, [state.contractItems]);

  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const onContractItemChanged = (index, modifiedContractItem) => {
    const _state = JSON.parse(JSON.stringify(state));
    if (index === undefined) {
      index = _state.contractItems.length;
    }

    if (modifiedContractItem.editedAction === "Canceled") {
      modifiedContractItem = initialContract.contractItems[index];
      console.log(modifiedContractItem);
    }

    if (modifiedContractItem)
      _state.contractItems[index] = modifiedContractItem;
    else {
      _state.contractItems.splice(index, 1);
    }
    setState(_state);
  };

  const onSave = () => {
    console.log(state);
    let modState = JSON.parse(JSON.stringify(state));
    let contractItems = modState.contractItems || [];
    delete modState.contractItems;
    let newState = {
      subContract: modState,
      contractItems,
    };

    putEndpoint(`/subcontracts/${state.id}`, newState).then((res) => {
      if (res && res.status === 200) {
        getContracts();
        closeSlider();
      }
    });
  };

  return (
    <div>
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="end">
          <Grid item>{formLabel}</Grid>
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
        <div className="card-comp ">
          <div className="card-title">Contract Summary</div>
          <div className="row g-4 ">
            <div className="col-12 col-xxl-5">
              <ContractorSearcher
                value={state.contractorName || ""}
                list={contractors}
                onAction={(contrator) =>
                  setState({
                    ...state,
                    contractorName: contrator.name,
                    contractorId: contrator.id,
                  })
                }
              />
            </div>
            <div className="col col-12 col-lg-7 col-xxl-4">
              <InputComp
                label="Contract"
                name="name"
                onChange={onChange}
                value={state.name}
              />
            </div>
            <div className="col-12 col-lg-5 col-xxl-3">
              <InputComp label="totalPrice" value={state.totalPrice} disabled />
            </div>
          </div>
        </div>

        <DocumentsComp docs={[]} />

        <SubContract
          contractItems={state.contractItems}
          onContractItemChanged={onContractItemChanged}
        />
      </div>
    </div>
  );
};

export default ContractForm;

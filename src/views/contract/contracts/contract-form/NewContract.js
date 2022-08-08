import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import ModalCont from "components/modalCont/ModalCont";
import ContractorSearcher from "components/searchers/ContractorSearcher";
import React from "react";
import { postEndpoint } from "services/apiFunctions";
import findError from "utils/findError";
import { contractContext } from "views/contract/ContractContext";

const NewContract = ({ open, setOpen }) => {
  const { contractors, getContracts } = React.useContext(contractContext);
  const [state, setState] = React.useState({
    name: "",
    contractorId: 0,
    contractorName: "",
    totalPrice: 0,
    status: "Ready",
  });
  const [errors, setErrors] = React.useState({});
  const onChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };
  const closeAction = () => setOpen(false);
  const onSave = () => {
    console.log(state);
    postEndpoint("/subcontracts", state).then((res) => {
      if (res && res.status === 200) {
        getContracts();
        closeAction();
      } else if (res && res.errors) {
        console.log(res.errors);
        setErrors(res.errors);
      }
    });
  };
  const _findError = (error) => {
    return findError(error, errors);
  };
  return (
    <ModalCont open={open} onClose={closeAction} title="New SubContract">
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
            error={_findError("ContractorId")}
          />
        </div>
        <div className="col col-12 col-lg-7 col-xxl-4">
          <InputComp
            label="Contract"
            name="name"
            onChange={onChange}
            value={state.name}
            error={_findError("Name")}
          />
        </div>
        <div className="col-12 col-lg-5 col-xxl-3">
          <InputComp label="totalPrice" value={state.totalPrice} disabled />
        </div>
        <div className="col-12">
          <BtnComp label="Save" onClick={onSave} />
        </div>
      </div>
    </ModalCont>
  );
};

export default NewContract;

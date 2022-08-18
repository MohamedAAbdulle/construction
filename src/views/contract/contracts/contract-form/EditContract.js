import React from "react";
import { getEndpoint } from "services/apiFunctions";
import ContractForm from "./ContractForm";

const EditContract = ({ closeSlider, open }) => {
  const [initialContract, setInitialContract] = React.useState({
    ...open,
    contractItems: null,
  });
  const getContractItems = () =>
    getEndpoint(`/subcontracts/${initialContract.id}/contractItems`).then(
      (res) => {
        setInitialContract({ ...initialContract, contractItems: res });
      }
    );
  React.useEffect(() => {
    getContractItems();
  }, []);

  return (
    <>
      <ContractForm
        closeSlider={closeSlider}
        formLabel="Edit Contract"
        initialContract={initialContract}
      />
    </>
  );
};

export default EditContract;

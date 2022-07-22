import React from "react";
import ContractForm from "./ContractForm";

const NewContrator = ({ closeSlider }) => {
  let initialContract = {};
  return (
    <ContractForm
      closeSlider={closeSlider}
      formLabel="New Contractor"
      initialContract={initialContract}
    />
  );
};

export default NewContrator;
